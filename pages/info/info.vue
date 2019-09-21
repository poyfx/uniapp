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
					<view style="color: #616161;margin-top: 5px;">{{info.company}}</view>
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
				<infoText :type="info.type" :disabled="info.disabled" :textValue="info.usercity" :value="info.city"></infoText>
				<view class="flex m-info">
					<text>{{info.customer}}</text>
					<input :type="info.type" :value="info.customerName"  :disabled="info.disabled" />
				</view>
			</view>
			<view class="fget-num  bgcf borderRadius8 infoThree" style="padding-bottom: 10px;">
				<view class="out">
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.apply" @toApply="toApply"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.oilNum" @toStayOil="toStayOil"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.address" @editAddress="editAddress"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.editPsd" @toEditPsd="toEditPsd"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :imgText="info.feedback" @toEditPsd="toFeedback"></infoImg>
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
					company: '',
					usercity: '所在城市',
					city: '合肥',
					customer: '客户经理',
					customerName: "李勇",
					apply: '申请权限',
					oilNum: '待提油量',
					address: '收货地址',
					editPsd: '修改密码',
					feedback:'用户反馈',
					disabled: true,
					type: 'text',
					username: '',
					phoneNum: '',
				},
				integral: '0'
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
			getuserinfo() {
				const that = this;
				uni.getStorage({
					key: "userInfo",
					success: function(res) {
						console.log(res)
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
									} else {
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
			toFeedback(){
				uni.navigateTo({
					url:'feedback/feedback'
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
			width: 5rem;
		}
	.m-info input{
		flex: 1;
		color: #666;
	}
</style>