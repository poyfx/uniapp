<template>
	<view class="background">
		<view class="content">
			<view class="imgTop">
				<image class="loginImg" src="../../static/img/logo.png" mode=""></image>
				<view class="p-font">
					<text>欢迎来到安徽石油商户中心</text>
				</view>
			</view>
			<mInput :placeholder="placeholder" v-model="consumer.username"></mInput>
			<pwsInput :placeholder="placeholderPws" v-model="consumer.password"></pwsInput>
			<view class="loginInfo">
				<navigator url="forget/forget" class="forgetPwd color-dff">忘记密码</navigator>
				<navigator url="../register/registerNumber" class="toReginster"> 没有账号？<text class="color-dff">马上注册</text></navigator>
			</view>
			<view class="mTop30">
				<mButton :type="btnType" :disabled="btnDisabled" :value="btnValue" @handleLogin="handleLogin"></mButton>
			</view>
			
		</view>

	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue'
	import pwsInput from '../../components/input-password.vue'
	import mButton from '../../components/m-button.vue'
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	// import Login from '../../api.js'
	import crypto from 'crypto'
	import {
		getClentId
	} from '@/common/js/getCLentId.js'
	export default {
		data() {
			return {
				placeholder: "用户名/手机号",
				placeholderPws: "请输入密码",
				btnType: "primary",
				btnDisabled: false,
				btnValue: "登录",
				consumer: {
					username: '',
					password: '',
				},
				status: '',
				clientId: '',
			}
		},
		onLoad(option) {
			// console.log(getCurrentPages())
			this.status = option.val;
			this.showToasts();
			this.getclientId();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			...mapActions(['handeLogin']),

			getclientId() {
				// 扩展API加载完毕，现在可以正常调用扩展API
				// 获取客户端标识信息
				//#ifdef APP-PLUS  
				var info = plus.push.getClientInfo();
				console.log(JSON.stringify(info));
				// alert(info)
				this.clientId = info.clientid;
				// alert(this.clientId)
				uni.setStorage({
					key: 'clientid',
					data: this.clientId
				})
				// 添加监听从系统消息中心点击消息启动事件
				plus.push.addEventListener("click", function(msg) {
					// 分析msg.payload处理业务逻辑 
					alert("You clicked: " + msg.content);
				}, false);
				//#endif  
			},
			handleLogin() {
				this.getclientId();
				// getClentId();
				// var md5 = crypto.createHash("md5");
				// md5.update(password); //需要加密的密码
				// const passwd = md5.digest("hex"); //password 加密完的密码
				if (this.consumer.username != "" && this.consumer.username != null) {
					if (this.consumer.password != "" && this.consumer.password != null) {
						const that = this;
						this.test.post('base/login', {
							username: this.consumer.username,
							passwd: this.consumer.password,
							client_id: this.clientId,
						}).then(res => {
							console.log(res)
							const data = res.data;
							const datas = data.value
							if (data.errorCode == 0 && res.statusCode == 200) {
								console.log(res)
								uni.setStorage({
									key: 'Token',
									data: res.data.value.token
								})
								this.handeLogin(datas);
								uni.switchTab({
									url: '../index/index'
								})
							} else {
								uni.showToast({
									"title": data.message,
									"icon": "none",
									position:'bottom',
								})
							}
						}).catch(err => {
							console.log(err)
							uni.showToast({
								title: err.errMsg,
								icon: 'none',
								position:'bottom',
							})
						})

					} else {
						return uni.showToast({
							icon: "none",
							title: "密码不能为空",
							position:'bottom',
						})
					}
				} else {
					return uni.showToast({
						icon: "none",
						title: "账号不能为空",
						position:'bottom',
					})
				}
			},
			showToasts() {
				if (this.status == 1) {
					uni.showToast({
						title: '注册已提交，审核成功后即可登录使用',
						position: 'bottom',
						icon: 'none',
					
					});
				}

			}
		},
		...mapMutations(['login']),

		components: {
			mInput,
			pwsInput,
			mButton
		}
	}
</script>

<style scoped>
	.background {
		background-color: #fff;
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
	}

	.imgTop {
		margin: 40px auto 44px;
		text-align: center
	}

	.loginImg {
		width: 100px;
		height: 100px;
	}

	.p-font {
		margin-top: 15px;
	}

	.p-font text {
		font-size: 49upx;
		color: #424242;
	}

	.loginInfo {
		display: flex;
		justify-content: space-between;
		font-size: 28upx;
		padding: 12px 11% 10px;
	}

	.color-dff {
		color: #009DFF;
		font-size: 28upx;
	}

	.toReginster {
		display: inline-block;

	}
</style>
