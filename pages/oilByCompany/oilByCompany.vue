<template>
	<view>
		<view class="search flex">
			<input type="text" value="" placeholder="搜索" @input="searchCompany" v-model="inputValue" />{{inputValue}}
		</view>
		<view class="content " style="margin-bottom: 49px;">
			<view class="companys" @tap="chooseCompany(index)" v-for="(item,index) in datas" :key="item.id">
				<view>{{item.id}}</view>
				<view>{{item.name}}</view>
				<view>{{item.addr}}</view>
			</view>


		</view>
		<view class="loading" @tap="more">
			<view>
				<image src="/../static/img/loading.png" mode="aspectFit" style="width: 8px ;height: 8px;"></image>&nbsp; 点击加载更多...
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas: [],
				inputValue: "", //搜索输入框内容
				page: 1, //默认请求第一页
				pageSize: 10, //默认请求十条数据
				url: ''
			}
		},

		methods: {
			// 选中公司
			chooseCompany(e) {
				const newAddress = this.datas[e].addr
				uni.setStorage({
					key: 'company',
					data: newAddress
				})
				uni.navigateTo({
					url: this.url //+'?newaddress='+newAddress
				})
			},
			//输入框搜索
			searchCompany() {
				if (this.inputValue !== '' && this.inputValue !== null) {
					this.test.post('base/listCustCompany', {
						search: this.inputValue,
						page: this.page,
						pageSize: this.pageSize,
					}).then(res => {
						console.log(res)
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							// console.log(res.data.value.length)
							this.datas = res.data.value;
							if (res.data.value.length === 0) {
								uni.showToast({
									title: '没有更多了',
									icon: 'none',
									position:'bottom',
								})
							}
						} else {

						}
					}).catch(err => {
						console.log(err)
					})
				} else if (this.inputValue == '' && this.inputValue == null) {

					this.getCompanyInf()
				}
			},
			getCompanyInfo() {
				console.log(this.page,this.pageSize)
				this.test.post('base/listCustCompany', {
					search: '',
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.datas = res.data.value
					}
				}).catch(err => {
					console.log(err)
				})
			},
			more(){
				this.page += 1;
				this.getCompanyInfo()
			}
		},
		onShow() {
			this.getCompanyInfo()
		},
		onLoad(option) {
			this.url = option.address
		}
	}
</script>

<style>
	.search {
		width: 100%;
		justify-content: center;
		background-color: #fff;
		padding: 12px 15px;
		box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.16);
	}

	.search input {
		background-color: #e5e5e5;
		border-radius: 14px;
		width: 100%;
		padding: 4px 15px;

	}

	.companys {
		background-color: #fff;
		padding: 10px 0 20px 15px;
		border-bottom: 1px solid #d6d6d6;
		font-size: 14px;
		color: #616161;
		line-height: 28px;
	}
</style>
