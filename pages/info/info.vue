<template>
	<view>
		<view class="mContent">

			<swiper class="swipers" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
			 :circular="circular" indicator-active-color="#65C6F8">
				<swiper-item v-for="(item,index) in cac" :key="index">
					<view class="">
						<view class="userIntegral borderRadius8 bgcf">
							<view class="company userIntegraltitle">
								<view>
									<!-- <img src="../../static/img/company.png" alt> -->
									<image src="../../static/img/company.png" mode="aspectFit"></image>
									<text>公司</text>
								</view>
								<view style="color: #616161;margin-top: 5px;">{{item.customer_name}}</view>
							</view>
							<view class="integrals">
								<view>0</view>
								<!--{{item.integral}} -->
								<text>积分</text>
							</view>
						</view>
						<view class="fget-num userinfo bgcf userIntegraltitle borderRadius8 " style="margin-top: 15px;">
							<view class="userinfos flex ">
								<image src="../../static/img/customer.png" mode="aspectFit"></image>
								<text style="font-weight: bold;">客户经理</text>
							</view>
							<view class="flex m-info underLine">
								<text>姓名</text>
								<input v-model="item.manager_name" disabled="disabled" />
							</view>
							<view class="flex m-info underLine">
								<text>手机号</text>
								<input v-model="item.phone" disabled="disabled" />
							</view>
							<view class="flex m-info">
								<text>所在城市</text>
								<input v-model="item.city" disabled="disabled" />
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="fget-num userinfo bgcf userIntegraltitle borderRadius8">
				<view class="userinfos flex">

					<image src="../../static/img/user.png" mode="aspectFit"></image>
					<text style="font-weight: bold;">个人信息</text>
				</view>
				<infoText :type="info.type" :disabled="info.disabled" :textValue="info.text1" :value="info.username"></infoText>
				<view class="flex m-info">
					<text>手机号</text>
					<input v-model="info.phoneNum" disabled="disabled" />
				</view>
			</view>

			<view class="fget-num  bgcf borderRadius8 infoThree">
				<view class="out">
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.apply" @toApply="toApply"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.oilNum" @toStayOil="toStayOil"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.address" @editAddress="editAddress"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.editPsd" @toEditPsd="toEditPsd"></infoImg>

					<view class="flex  m-infos" @tap="toFeedback" style="border-bottom: 1px solid #e5e5e5;">
						<view class="flex center m-info-contents">
							<text>用户反馈</text>

						</view>
						<image src="../../static/img/right.png" mode="aspectFit"></image>
					</view>
					<view class="flex  m-infos" @tap="testing">
						<view class="flex center m-info-contents">
							<text>版本更新</text>

						</view>
						<image src="../../static/img/right.png" mode="aspectFit"></image>
					</view>
				</view>

			</view>
			<view class="mTop20">
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
					company: '',
					usercity: '所在城市',
					city: '合肥',
					customer: '客户经理',
					customerName: "李勇",
					apply: '申请权限',
					oilNum: '待提油量',
					address: '收货地址',
					editPsd: '修改密码',
					disabled: true,
					type: 'text',
					username: '',
					phoneNum: '',
				},
				integral: '0',
				autoplay: false,
				indicatorDots: true,
				interval: 2000,
				duration: 500,
				circular: true,
				cac: {},
				customer_id: '',
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
			};
			this.getuserinfo();
			// this.getclient();
		},
		onLoad(option) {
			console.log(option)

		},
		methods: {
			...mapActions(['handelOut']),
			// getclient(){
			// 	const that = this;
			// 	uni.getStorage({
			// 		key:'clientid',
			// 		success:function(res){
			// 			that.info.company = res.data;
			// 			console.log(res)
			// 		}
			// 	})
			// },
			// stopTouchMove() {
			// 	catchtouchmove="stopTouchMove"
			// 	return false
			// },
			getuserinfo() {
				const that = this;
				uni.getStorage({
					key: "userInfo",
					success: function(res) {
						console.log(res)
						that.cac = res.data.managers;
						that.customer_id = res.data.user.roles[0].customer_id
						console.log(that.cac.length)
						if (that.cac.length < 2) {
							that.indicatorDots = false
						} else {
							that.indicatorDots = true
						}
						that.info.username = res.data.user.realname;
						that.info.phoneNum = res.data.user.username
						that.info.city = res.data.user.city;
						that.info.company = res.data.user.customer_name;
						that.info.customerName = res.data.user.manager_name;
					}
				})
			},
			toStayOil() {
				uni.navigateTo({
					url: './stayOil/stayOil'
				})
			},
			toApply() {
				uni.navigateTo({
					url: 'apply/apply?customer_id=' + this.customer_id
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
			//检测版本
			testing() {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						console.log('运行Android上');
						// var server = "http://dev.pjy.name:8170/api/bizcust/base/get_version"; //检查更新地址
						var appid = plus.runtime.appid
						var version = plus.runtime.version

						// var req = { //升级检测数据  
						// 	"appid": plus.runtime.appid,
						// 	"version": plus.runtime.version
						// };
						console.log(plus.runtime.appid, plus.runtime.version)
						this.test.post('base/getVersion', {
							appid: appid,
							version: version,
							type: 'android'
						}).then(res => {
							console.log(res)
							var url = res.data.value.url
							if (res.statusCode == 200 && res.data.errorCode === 0) {
								if (res.data.value.status == 1) {
									uni.showModal({ //提醒用户更新  
										title: "更新提示",
										content: res.data.value.note,
										success: (res) => {
											if (res.confirm) {
												plus.runtime.openURL(url);
											}
										}
									})
								} else {
									uni.showToast({
										title: '当前版本已经是最新版本',
										icon: 'none',
									})
								}

							}
						}).catch(err => {
							console.log(err)
						})
						break;
					case 'ios':
						console.log('运行iOS上');
						// var server = "http://dev.pjy.name:8170/api/bizcust/base/get_version"; //检查更新地址
						var appid = plus.runtime.appid
						var version = plus.runtime.version

						// var req = { //升级检测数据  
						// 	"appid": plus.runtime.appid,
						// 	"version": plus.runtime.version
						// };
						console.log(plus.runtime.appid, plus.runtime.version)
						this.test.post('base/getVersion', {
							appid: appid,
							version: version,
							type: 'ios'
						}).then(res => {
							var url = res.data.value.url
							if (res.statusCode == 200 && res.data.errorCode === 0) {
								if (res.data.value.status == 1) {
									uni.showModal({ //提醒用户更新  
										title: "更新提示",
										content: res.data.value.note,
										success: (res) => {
											if (res.confirm) {
												plus.runtime.openURL(url);
											}
										}
									})
								}

							}
						}).catch(err => {
							console.log(err)
						})
						break;
					default:
						console.log('运行在开发者工具上')
						break;
				}
			},
			//安全退出
			outsafe() {
				const that = this
				console.log(this.hasLogin)
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
									} else if (res.data.errorCode == -10001 || res.data.errorCode == -10002 || res.data.errorCode == -10003) {
										uni.showModal({
											title: '提示',
											content: res.data.message,
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
									} else if (res.data.errorCode == -10000) {
										console.log(1)
									} else {
										uni.showToast({
											title: res.data.message,
											icon: "none",
											position: 'bottom'
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
			},
			//用户反馈
			toFeedback() {
				uni.navigateTo({
					url: 'feedback/feedback'
				})
			},
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
	.swipers {
		min-height: 300px;
	}



	image {
		width: 25px;
		height: 25px;
	}

	.m-info {
		padding: 10px 15px 10px 0;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.m-info-content {
		justify-content: flex-start;
	}

	.m-info text {
		width: 4rem;
	}

	.m-info input {
		flex: 1;
		color: #666;
	}

	.m-infos {
		padding: 12px 0;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}

	.m-info-contents view {
		color: #616161;
	}

	.m-infos image {
		width: 12px;
		height: 12px;
		padding-right: 15px;
	}
</style>
