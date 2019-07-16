<template>
	<view class="content">
		<view class="forget-content">
			<view class="fget-nums">
				<text class="phontNum">手机号</text>
				<input type="tel" class="getCodeInput" placeholder="请输入手机号码" v-model="phoneNum" />
				<button class="getCode" @tap="getCodes" v-show="show" href="javascript:;">获取验证码</button>
				<button class="getCode1" @tap="getCodes" v-show="!show" :disabled="disabled">重新获取({{count}}s)</button>
			</view>
			<view class="f-get-code-num">
				<text class="f-get-code-numtitle">验证码</text>
				<input type="text" placeholder="请输入验证码" class="getCodeInput" v-model="codeNums" />
			</view>
		</view>
		<mButton :value="value" class="goNext" :type="btnType" @goNext="goNext"></mButton>
	</view>

</template>

<script>
	import getCode from "../../../components/getCode/getCode.vue"
	import codeNum from "../../../components/codeNum/codeNum.vue"
	import mButton from '../../../components/m-button.vue'
	export default {
		data() {
			return {
				placeholder: '请输入手机号码',
				value: "下一步",
				btnType: 'primary',
				phoneNum: '',
				show: true,
				codeNums: '',
				mess: '',
				disabled: true,
				count: "60",

			}
		},
		methods: {
			goNext() {
				const that = this;

				if (this.phoneNum != "" && this.phoneNum != null) {
					if (this.codeNums != "" && this.codeNums != null) {
						if (this.codeNums == this.mess) {
							uni.request({
								url: that.$https + 'user/forgetPwd/confSms',
								header: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								data: {
									username: this.phoneNum,
									pswCode: this.codeNums
								},
								method: "GET",
								success: function(res) {
									console.log(res)
									if (res.data.errorCode == 0) {
										uni.showToast({
											"title": "验证成功",
											"icon": 'none'
										});
										setTimeout(function() {
											uni.redirectTo({
												url: "../setPws/setPws?user="+that.phoneNum+'&message='+that.codeNums
											})
										}, 1200)
									}
								}
							})
						} else {
							uni.showToast({
								"title": "验证码错误",
								"icon": 'none'
							});
						}
					} else if (this.number == "" || this.number == null) {
						return uni.showToast({
							"title": "验证码不能为空",
							'icon': 'none'
						});
					}
				} else if (this.phoneNum == "" || this.phoneNum == null) {
					return uni.showToast({
						"title": "手机号码不能为空",
						"icon": 'none'
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
			getCodes() {
				const that = this;
				console.log(this.phoneNum, this.codeNums);
				if (this.phoneNum != "" && this.phoneNum != null) {
					if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
						return uni.showToast({
							"title": '请填写正确的手机号码',
							"icon": "none"
						})
					} else {
						uni.request({
							url: that.$https + 'user/forgetPwd/getSms',
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							data: {
								username: that.phoneNum
							},
							method: "POST",
							success: function(res) {
								console.log(res)
								if (res.data.errorCode == 0) {
									that.mess = res.data.value
									console.log(that.mess)
									that.timeDown(60);
									that.show = false;
								}else{
									uni.showToast({
										"title":res.data.message,
										"icon":"none"
									})
								}
							}
						})


					}
				} else if (this.phoneNum == "" || this.phoneNum == null) {
					return uni.showToast({
						"title": "手机号码不能为空",
						"icon": "none"
					})
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
	}

	.getCode,
	.getCode1 {
		width: 98px;
		margin: 0;
		background-color: #fff;
		color: #009DFF;
		font-size: 12px;
		border: none;
		padding: 10px;
		border-left: 1px solid #e5e5e5;
	}

	.getCodeInput {
		flex: 1;
		margin-left: 18upx;
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
	}

	.getCodeInput {
		flex: 1;
		margin-left: 18upx;
	}
</style>
