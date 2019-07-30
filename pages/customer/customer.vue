<template>
	<view>
		<view class="search flex">
			<input type="text" value="" placeholder="搜索" v-model="value" @input="searchCustomer" />
		</view>
		<view class="content" style="margin-bottom: 49px;">
			<view class="customer" @tap="chooseCustomer(index)" v-for="(item,index) in datas" :key="item.id">
				<view>{{item.realname}}</view>
				<view>{{item.phone}}</view>
			</view>
		</view>
		<view class="loading" @tap="more">
			<view>
				<img src="../../static/img/loading.png" alt /> &nbsp; 点击加载更多...
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				datas: [],
				url: '',
				page:1,
				pageSize:10
			}
		},
		methods: {
			chooseCustomer(e) {
				const customer = this.datas[e].realname
				uni.setStorage({
					key: 'customer',
					data: customer
				})
				uni.navigateTo({
					url: this.url + '?customer=' + customer
				})
			},
				searchCustomer() {
				if (this.value !== '' && this.value !== null) {
					this.test.post('base/listCustManager', {
						search: this.value,
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
									icon: 'none'
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
			getCustomerInfo(){
				console.log(this.page,this.pageSize)
				this.test.post('base/listCustManager', {
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
				this.page +=1;
				this.getCustomerInfo()
			}
		},
		onShow(){
			this.getCustomerInfo()
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
			box-shadow: 0px 3px 6px 0 rgba(0,0,0,0.16);
		}
	.search input{
		background-color: #e5e5e5;
		border-radius: 14px;
		width: 100%;
		padding: 4px 15px;
		
	}
	.customer {
		background-color: #fff;
		padding: 10px 0 20px 15px;
		border-bottom: 1px solid #d6d6d6;
		font-size: 14px;
		color: #666;
		line-height: 28px;
	}
</style>
