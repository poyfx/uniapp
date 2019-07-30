<template>
	<view class="mContent">
		<banner :img="img"></banner>
		<navs></navs>
		<view class="main">
			<view class="myManager">
				<text class="line"></text>
				<text class="title-p">我的客户经理</text>
				<view class="managerNum">
					<text class="manager">{{myManager}}</text>
					<view class="call">
						{{managerTel}}
						<text class="numberBtn" @click="callPhone(managerTel)">通话</text>
					</view>
				</view>
			</view>
		</view>
		<view class="oilPrices">
			<text class="line"></text>
			<p class="title-p">当前油品批发价</p>
			<view class="priceLi">
				<view class="nowPrice">
					<text>0#柴油</text>
					<text class="price">￥{{datas.diesel_0}}/吨</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>-10#柴油</text>
					<text class="price">￥{{datas.diesel_10}}/吨</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>92#国六</text>
					<text class="price">￥{{datas.gas_92}}/吨</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>95#国六</text>
					<text class="price">￥{{datas.gas_95}}/吨</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>98#国六</text>
					<text class="price">￥{{datas.gas_98}}/吨</text>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import banner from '../../components/banner/banner'
	import navs from '../../components/nav/nav'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				title: '',
				managerTel: "",
				myManager: '',
				datas: [],
				img: []
			}
		},
		onShow() {

			const token = uni.getStorageSync('Token');
			if (token == null || token == '' || token == undefined) {
				uni.showModal({
					title: '提示',
					content: '用户信息已失效，请重新登录',
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '../login/login'
							})
						} else {
							uni.reLaunch({
								url: '../login/login'
							})
						}
					}
				})
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				const that =this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						console.log(res)
						let price = res.data.oilPrize; //获取当前油价油价
						that.datas = price;

						let managerInfo = res.data.user;
						that.myManager = managerInfo.manager_name; //客户经理信息
						that.managerTel = managerInfo.manager_phone;

						let images = res.data.banners; //banner图
						that.img = images;
						console.log(that.img)
					}
				})

			},
			callPhone(phoneNumber) {
				console.log(phoneNumber)
				uni.showModal({
					title: "呼叫客户经理-" + this.myManager,
					confirmText: '呼叫',
					content: phoneNumber,
					success: function(res) {
						if (res.confirm) {
							// window.location.href = "tel:" +phoneNumber;
							uni.makePhoneCall({
								phoneNumber: phoneNumber
							})
						} else if (res.cancel) {
							return
						}
					}
				})
			}
		},
		computed: {
			...mapState(["hasLogin", "userInfo"])
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
