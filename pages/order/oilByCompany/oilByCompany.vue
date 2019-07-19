<template>
	<view>
<!-- 		<mt-search v-model="value"></mt-search>
 -->		<view class="home">
			<view class="companys" @tap="chooseCompany(index)" v-for="(item,index) in datas" :key="item.id">
				<view>{{item.id}}</view>
				<view>{{item.name}}</view>
				<view>{{item.address}}</view>
			</view>


		</view>
		<view class="loading">
			<view>
				<img src="../../../static/img/loading.png" alt /> &nbsp; 点击加载更多...
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				datas: [{
						id: "0000000",
						name: "小菊",
						address: "广东省深圳市龙华区某某大厦150"
					},
					{
						id: "0000001",
						name: "小花",
						address: "广东省深圳市龙华区某某大厦149"
					},
					{
						id: "0000002",
						name: "小红",
						address: "广东省深圳市龙华区某某大厦148"
					},
					{
						id: "0000003",
						name: "小黑",
						address: "广东省深圳市龙华区某某大厦147"
					},
					{
						id: "0000004",
						name: "小黑",
						address: "广东省深圳市龙华区某某大厦146"
					},
					{
						id: "0000005",
						name: "小黑",
						address: "广东省深圳市龙华区某某大厦145"
					}
				],
				url:''
			}
		},
		methods: {
			chooseCompany(e) {
				const newAddress = this.datas[e].address
				uni.navigateTo({
					url:'../'+this.url +'?newaddress='+newAddress
				})
			}
		},
		onLoad(option) {
			this.url = option.address
		}
	}
</script>

<style>
	.mint-search {
		height: 100%;
	}

	.companys {
		background-color: #fff;
		padding: 10px 0 20px 15px;
		border-bottom: 1px solid #d6d6d6;
		font-size: 14px;
		color: #666;
		line-height: 28px;
	}
</style>
