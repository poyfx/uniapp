<template>
	<view class="mContent">
		<banner></banner>
		<navs></navs>
		<view class="main">
			<view class="myManager">
				<text class="line"></text>
				<text class="title-p">我的客户经理</text>
				<view class="managerNum">
					<text class="manager">李勇</text>
					<view class="call">
						1587777777
						<text class="numberBtn" @click="callPhone(tel)">通话</text>
					</view>
				</view>
			</view>
		</view>
		<view class="oilPrices">
			<text class="line"></text>
			<p class="title-p">当前油品批发价</p>
			<view class="priceLi" v-for="item in datas" :key="item.id">
				<view class="nowPrice">
					<text>{{item.name}}</text>
					<text class="price">{{item.price}}</text>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import banner from '../../components/banner/banner'
	import navs from '../../components/nav/nav'
	export default {
		data() {
			return {
				title: '',
				tel: "15873222222",
				myManager: '李勇',
				datas: [{
						id: 1,
						name: "#92",
						price: "$6000/吨"
					},
					{
						id: 2,
						name: "#92",
						price: "$6000/吨"
					},
					{
						id: 3,
						name: "#92",
						price: "$6000/吨"
					},
					{
						id: 4,
						name: "#92",
						price: "$6000/吨"
					},
					{
						id: 5,
						name: "#92",
						price: "$6000/吨"
					},
					{
						id: 6,
						name: "#92",
						price: "$6000/吨"
					},
					{
						id: 7,
						name: "#92",
						price: "$6000/吨"
					}
				],
			}
		},
		onLoad() {
			var res = global.isLogin();
			if (!res) {
				uni.showModal({
					title: '请重新登录',
					content: '身份已过期，请重新登录',
					success: function(res) {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			}
		},
		methods: {
			callPhone(phoneNumber) {
				uni.showModal({
					title: "",
					confirmText: '呼叫',
					content: "呼叫客户经理-" + this.myManager,
					success: function(res) {
						if (res.confirm) {
							window.location.href = "tel:" + this.tel;
						} else if (res.cancel) {
							return
						}
					}
				})
			}
		},
		components: {
			banner,
			navs
		}
	}
</script>

<style>
	.nowPrice {
		display: flex;
		justify-content: space-between
	}

	.price {
		font-size: 35upx;
		font-weight: bold;
	}
</style>
