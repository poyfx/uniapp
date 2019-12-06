<template>
	<view class="content">
		<view class="forget-content">
			<view class="fget-nums">
				<text class="phontNum">注册手机号</text>
				<input type="tel" class="getCodeInput" placeholder="请输入手机号码" v-model="phoneNum" />
				<view class="getCode" @tap="getCodes" v-show="show" href="javascript:;">获取验证码</view>
				<view class="getCode1" v-show="!show">重新获取({{count}}s)</view>
			</view>
			<view class="f-get-code-num">
				<text class="f-get-code-numtitle">验证码</text>
				<input type="text" placeholder="请输入验证码" class="getCodeInput" v-model="codeNums" />
			</view>
		</view>
		<view class="goNext">
			<mButton :value="value" :type="btnType" @goNext="goNext"></mButton>
		</view>

	</view>

</template>

<script>
	import getCode from "../../components/getCode/getCode.vue"
	import codeNum from "../../components/codeNum/codeNum.vue"
	import mButton from '../../components/m-button.vue'

	export default {
		data() {
			return {
				placeholder: '请输入手机号码',
				value: "下一步",
				btnType: 'primary',
				phoneNum: '',
				show: true,
				codeNums: '', //输入验证码
				mess: '', //获取的短信验证码
				disabled: true,
				count: "60",
				lock: true
			}
		},
		methods: {
			goNext() {
				
				// uni.navigateTo({
				// 	url:'./register?number='+ this.phoneNum
				// })
				const that = this;
				if (this.phoneNum != "" && this.phoneNum != null) {
					if (this.codeNums != "" && this.codeNums != null) {
						this.test.post('base/regist/confSms', {
							username: that.phoneNum,
							pswCode: that.codeNums
						}).then(res => {
							console.log(res)
							if (res.statusCode == 200 && res.data.errorCode == 0) {
								uni.showToast({
									"title": "验证成功",
									"icon": 'none',
										duration: 3000,
								});
								setTimeout(function() {
									// uni.reLaunch({
									// 		url:'register'
									// })
									uni.hideToast();
									uni.navigateTo({
											url: "register?number="+ that.phoneNum +'&message='+that.codeNums
									})
								}, 1000)
							} else {
								uni.showToast({
									title: res.data.message,
									icon: 'none',
									position:'bottom',
										duration: 3000,
								})
							}
						}).catch(err => {
							console.log(err)
						})
					} else if (this.number == "" || this.number == null) {
						return uni.showToast({
							"title": "验证码不能为空",
							'icon': 'none',
								duration: 3000,
						});
					}
				} else if (this.phoneNum == "" || this.phoneNum == null) {
					return uni.showToast({
						"title": "手机号码不能为空",
						"icon": 'none',
						position:'bottom',
							duration: 3000,
					});
				}

			},
			timeDown(time) {
				if (time == 0) {
					this.show = true;
					this.disabled = false;
					clearTimeout;
					return;
				} else {
					this.disabled = true;
					this.count = time--;
				}
				const that = this;
				setTimeout(() => {
					that.timeDown(time)
				}, 1000)
			},
			//获取短信验证码
			getCodes() {
				const that = this;
				console.log(this.lock)
				var a = 1;
				if (that.lock == true) {
					a++;
					console.log(a)
					this.lock = false
					console.log(this.phoneNum, this.codeNums);
					if (this.phoneNum != "" && this.phoneNum != null) {
						if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
							this.lock = !this.lock;
							return uni.showToast({
								"title": '请填写正确的手机号码',
								"icon": "none",
								position:'bottom',
									duration: 3000,
							})
						} else {

							this.test.post('base/regist/getSms', {
								username: that.phoneNum
							}).then(res => {
								console.log(res)
								console.log(res.data.value)


								if (res.data.errorCode == 0 && res.statusCode == 200) {
									this.show = !that.show;
									uni.showToast({
										title: '短信已发送',
											duration: 3000,
									})
									that.mess = res.data.value;
									that.timeDown(60);
									this.lock = !this.lock;
								} else {
									this.lock = !this.lock;
									uni.showToast({
										title: res.data.message,
										icon: 'none',
										position:'bottom',
											duration: 3000,
									})
								}
							}).catch(err => {
								console.log(err)
							})
						}


					} else if (this.phoneNum == "" || this.phoneNum == null) {
						this.lock = !this.lock;
						return uni.showToast({
							"title": "手机号码不能为空",
							"icon": "none",
							position:'bottom',
								duration: 3000,
						})
					}

				}
			}
		},
		components: {
			getCode,
			codeNum,
			mButton
		}
	}
</script>

<style>
	.forget-content {
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
	}

	.goNext {
		margin-top: 23px;
	}

	.fget-nums {
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		align-self: center;
		background-color: #fff;
		border-bottom: 1px solid #e5e5e5;
	}

	.phontNum {
		padding: 0 10px;
		width: 5.5rem;
	}

	.getCode,
	.getCode1 {
		width: 98px;
		margin: 0;
		background-color: #fff;
		color: #009DFF;
		font-size: 12px;
		border: none;
		padding: 17px 10px;
		text-align: center;
		border-left: 1px solid #e5e5e5;
	}

	.getCode1 {
		color: #e5e5e5;
	}

	.getCodeInput {
		flex: 1;
		margin-left: 9px;

	}

	uni-button:after {
		content: " ";
		width: 0;
		height: 0;

	}

	.f-get-code-num {
		display: flex;
		align-content: center;
		align-items: center;
		align-self: center;
		background-color: #fff;
		border-bottom: 1px solid #e5e5e5;
		padding: 15px 0;
	}

	.f-get-code-numtitle {
		padding: 0 10px;
		width: 5.5rem;
	}

	.getCodeInput {
		flex: 1;
		margin-left: 18upx;
	}
</style>
