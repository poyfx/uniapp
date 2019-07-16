<template>
	<view>
		<view class="mContent">
			<view class="userIntegral borderRadius8 bgcf">
				<view class="company userIntegraltitle">
					<view>
						<img src="../../static/img/company.png" alt>公司
					</view>
					<text>合肥建成合肥建成合肥建成合肥建成</text>
				</view>
				<view class="integral">
					<view>{{integral}}</view>
					<text>积分</text>
				</view>
			</view>
			<view class="fget-num userinfo bgcf userIntegraltitle borderRadius8">
				<view class="userinfos">
					<img src="../../static/img/user.png" alt>个人信息
				</view>
				<infoText :type="type" :disabled="disabled" :textValue="text1" :value="username"></infoText>
				<infoText :type="type" :disabled="disabled" :textValue="userphone" :value="phoneNum"></infoText>
				<infoText :type="type" :disabled="disabled" :textValue="usercity" :value="usercity"></infoText>
				<infoText :type="type" :disabled="disabled" :textValue="customer" :value="customer"></infoText>

			</view>
			<view class="fget-num  bgcf borderRadius8">
				<view class="out">
					<infoImg :type="type" :disabled="disabled" :textContent="apply" @toApply="toApply"></infoImg>
					<infoImg :type="type" :disabled="disabled" :textContent="oilNum"></infoImg>
					<infoImg :type="type" :disabled="disabled" :textContent="address" @editAddress="editAddress"></infoImg>
					<infoImg :type="type" :disabled="disabled" :textContent="editPsd" @toEditPsd="toEditPsd"></infoImg>
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
				username: "",
				userphone: '手机号',
				phoneNum: "15877771111",
				compeny: "合肥城建",
				usercity: '所在城市',
				city: "合肥",
				customer: '客户经理',
				customerName: "李勇",
				text1: '姓名',
				disabled: true,
				type: 'text',
				apply: '申请权限',
				oilNum: '订单油量',
				address: '收货地址',
				editPsd: '修改密码',
				integral: '0'
			}
		},
		created() {
			this.getserinfo();
			var res =global.isLogin();
			if(!res){
				uni.showModal({
					title:'请重新登录',
					content:'身份已过期，请重新登录',
					success:function(res){
						uni.navigateTo({
							url:'../login/login'
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
						// JSON.parse(res)
						that.username = res.data.realname;
						that.phoneNum = res.data.username
					}
				})

				// console.log(this.$store.state.userInfo)
			},
			// editInfo() {
			// 	uni.navigateTo({
			// 		url: 'userPhoneNumber/userPhoneNumber?phone=' + this.phoneNum
			// 	})
			// },
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
									header:{"Content-Type": "application/x-www-form-urlencoded",  },
									success: function(res) {
										console.log(res.data)
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
</style>
