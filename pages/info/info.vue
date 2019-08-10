<template>
	<view>
		<view class="mContent">
			<view class="userIntegral borderRadius8 bgcf">
				<view class="company userIntegraltitle">
					<view>
						<!-- <img src="../../static/img/company.png" alt> -->
						<image src="../../static/img/company.png" mode="aspectFit"></image>
						<text>公司</text>
					</view>
					<view style="color: #666;">合肥建成合肥建成合肥建成合肥建成</view>
				</view>
				<view class="integral">
					<view>{{integral}}</view>
					<text>积分</text>
				</view>
			</view>
			<view class="fget-num userinfo bgcf userIntegraltitle borderRadius8">
				<view class="userinfos flex">
					<!-- <img src="../../static/img/user.png" alt> -->
					<image src="../../static/img/user.png" mode="aspectFit"></image>
					<text style="font-weight: bold;">个人信息</text>
				</view>
				<infoText :type="info.type" :disabled="info.disabled" :textValue="info.text1" :value="info.username"></infoText>
				<infoText :type="info.type" :disabled="info.disabled" :textValue="info.userphone" :value="info.phoneNum"></infoText>
				<infoText :type="info.type" :disabled="info.disabled" :textValue="info.usercity" :value="info.usercity"></infoText>
				<infoText :type="info.type" :disabled="info.disabled" :textValue="info.customer" :value="info.customer"></infoText>

			</view>
			<view class="fget-num  bgcf borderRadius8 infoThree">
				<view class="out">
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.apply" @toApply="toApply"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.oilNum" @toStayOil="toStayOil"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.address" @editAddress="editAddress"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.editPsd" @toEditPsd="toEditPsd"></infoImg>
				</view>
				<button class="safeout" @tap="outsafe">安全退出</button>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import infoText from '../../components/m-info-text/m-info-text'
	import infoImg from '../../components/m-info-img/m-info-img'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				info: {
					text1: '姓名',
					userphone: '手机号',
					compeny: '合肥城建',
					usercity: '所在城市',
					city: '合肥',
					customer: '客户经理',
					customerName: "李勇",
					apply: '申请权限',
					oilNum: '订单油量',
					address: '收货地址',
					editPsd: '修改密码',
					disabled: true,
					type: 'text',
					username: '',
					phoneNum: '15877771111',
				},
				integral: '0'
			}
		},
		onShow() {
// 			if (this.hasLogin == false) {
// 				uni.showModal({
// 					title: '提示',
// 					content: '用户信息已失效，请重新登录',
// 					success: function(res) {
// 						if (res.confirm) {
// 							uni.navigateTo({
// 								url: '../login/login'
// 							})
// 						} else {
// 							uni.navigateTo({
// 								url: '../login/login'
// 							})
// 						}
// 					}
// 				})
// 
// 			};
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
		onLoad(option) {
			console.log(option)
			this.getserinfo();

		},

		methods: {
			...mapActions(['handelOut']),
			getserinfo() {
				const that = this;
				uni.getStorage({
					key: "userInfo",
					success: function(res) {
						console.log(res.data)

						that.info.username = res.data.user.realname;
						that.info.phoneNum = res.data.user.username
					}
				})

				// console.log(this.$store.state.userInfo)
			},
			toStayOil() {
				uni.navigateTo({
					url: './stayOil/stayOil'
				})
			},
			toApply() {
				uni.navigateTo({
					url: 'apply/apply'
				})

			},
			// 修改地址
			editAddress() {
				uni.navigateTo({
					url: 'harvestaddress/harvestaddress'
				})
			},
			//修改密码
			toEditPsd() {
				uni.navigateTo({
					url: 'modify/modify'
				})
			},
			//安全退出
			outsafe() {
				const that = this
				console.log(this.hasLogin)
				uni.clearStorage()
				if (this.hasLogin) {
					uni.showModal({
						"title": '提示',
						"content": "退出当前账号",
						"success": function(res) {
							if (res.confirm) {
								that.test.post('user/logout').then(res => {
									console.log(res)
									if (res.data.errorCode == 0 && res.statusCode) {
										that.handelOut();
										uni.navigateTo({
											url: '../login/login'
										})
									}
								}).catch(err => {
									console.log(err)
								})
							} else if (res.cancel) {
								return
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}

			}
		},
		computed: {
			...mapState(["hasLogin", "userInfo"])
		},
		components: {
			infoText,
			infoImg,
		}
	}
</script>

<style>
	.infoThree {
		padding: 10px 0;
	}

	image {
		width: 25px;
		height: 25px;
	}
</style>
