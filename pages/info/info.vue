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
					<infoImg :type="info.type" :disabled="info.disabled" :textContent="info.apply" @toApply="toApply"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :textContent="info.oilNum" @toStayOil="toStayOil"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :textContent="info.address" @editAddress="editAddress"></infoImg>
					<infoImg :type="info.type" :disabled="info.disabled" :textContent="info.editPsd" @toEditPsd="toEditPsd"></infoImg>
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
					compeny: "合肥城建",
					usercity: '所在城市',
					city: "合肥",
					customer: '客户经理',
					customerName: "李勇",
					apply: '申请权限',
					oilNum: '订单油量',
					address: '收货地址',
					editPsd: '修改密码',
					disabled: true,
					type: 'text',
					username: "",
					phoneNum: "15877771111",
				},
				integral: '0'
			}
		},
		created() {
			this.getserinfo();
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
			...mapActions(['handelOut']),
			getserinfo() {
				const that = this;
				uni.getStorage({
					key: "userInfo",
					success: function(res) {
						const data = JSON.parse(res.data)
						console.log(data)
						that.info.username = data.realname;
						that.info.phoneNum = data.username
					}
				})

				// console.log(this.$store.state.userInfo)
			},
			toStayOil(){
				uni.navigateTo({
					url:'./stayOil/stayOil'
				})
			},
			toApply() {
				uni.navigateTo({
					url: 'apply/apply'
				})

			},
			editAddress() {
				uni.navigateTo({
					url: 'harvestaddress/harvestaddress'
				})
			},
			toEditPsd() {
				uni.navigateTo({
					url: 'modify/modify'
				})
			},
			outsafe() {
				const that = this
				console.log(this.hasLogin)
				if (this.hasLogin) {
					uni.showModal({
						"title": '提示',
						"content": "退出当前账号",
						"success": function(res) {
							if (res.confirm) {
								that.handelOut();
								uni.request({
									url: that.$https + 'user/logout?',
									method: "GET",
									header: {
										"Content-Type": "application/x-www-form-urlencoded",
									},
									success: function(res) {
										console.log(res.data)
										uni.navigateTo({
											url: '../login/login'
										})
									}
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
	image{
		width: 25px;
		height: 25px;
	}
</style>
