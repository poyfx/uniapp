<template>
	<view style="position: absolute;width: 100%; height: 100%;">
		<view class="oilCode">
			<view class="oilCodeBox">
				<tki-qrcode v-if="ifShow" cid="qrcode2" ref="qrcode2" :val="val" :size="size" :onval="onval" :loadMake="loadMake"
				 :usingComponents="true" @result="qrR" />

			</view>
			<view style="padding-top: 16px; font-size: 28upx; text-align: center;">{{val}}</view>
		</view>

		<view class="mContent bgcf otherOilCode ">
			<view>提油码发送他人代提</view>
			<input type="text" class="oilCodeInput" v-model="otherNumber" />
			<view class="read ;">
				<label class="radio">
					<radio value="已阅读" :checked='checked' @tap="cancel" />
				</label>
				<!-- <input type="checkbox" class="check" value="已阅读" @click="check" :checked="checked" /> -->
				<text>已阅读</text>

				<text style="color: #009DFF; ;" @tap="exemption">《免责条款》</text>
			</view>

			<view class="nextBox">
				<button class="oilCodeBtn oilCodeBtnAll" v-show="checkes" @tap="send">发送</button>
				<button type="primary" class="oilCodeBtnAll" v-show="!checkes" @tap="send">发送</button>

			</view>
		</view>
	</view>
</template>

<script>
	import mButton from '../../../../components/m-button.vue'
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				value: false,
				options: [{
					value: 1,
					label: "我同意"
				}],
				checkes: true,
				checked: false,
				ifShow: true,
				val: '', // 要生成的二维码值
				size: 490, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				id: '',
				no: '',
				otherNumber: '' //他人号码
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.no = option.no;
			this.getCode();
		},
		methods: {
			getCode() {
				this.test.post('order/reserve_encrypt', {
					id: this.id,
					no: this.no,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.val = res.data.value
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.message,
							success: function(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '../../../login/login'
									})
								} else {
									uni.reLaunch({
										url: '../../../login/login'
									})
								}
							}
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			cancel() {
				this.checked = !this.checked;
				this.checkes = !this.checkes
			},
			qrR(res) {
				this.src = res
			},
			exemption(){
				uni.navigateTo({
					url:'../exemption/exemption'
				})
			},
			send() {

				if (this.checkes == true) {
					// Toast("请阅读免责条款,勾选后方可发送");
					return uni.showToast({
						title: "请阅读免责条款,勾选后方可发送",
						"icon": "none"
					})
				} else {
					if (this.otherNumber !== '') {
						if (!/^1[3456789]\d{9}$/.test(this.otherNumber)) {
							return uni.showToast({
								"title": '请填写正确的手机号码',
								"icon": "none"
							})
						} else {
							this.test.post('order/send_get_encrypt', {
								phone: this.otherNumber,
								encrypt_sn: this.val
							}).then(res => {
								console.log(res)
								if (res.statusCode == 200 && res.data.errorCode == 0) {
									uni.showToast({
										title: '发送成功'
									})
								}else{
									uni.showToast({
										title:res.data.message,
										icon:'none'
									})
								}
							}).catch(err => {
								console.log(err)
							})

						}
					} else {
						return uni.showToast({
							title: "请填写手机号码",
							"icon": "none"
						})
					}

				}


			}
		},
		components: {
			mButton,
			tkiQrcode
		},
	}
</script>

<style>
	.oilCode {
		/* width: 100%; */
		display: flex;
		padding: 20px;
		justify-content: center;
		border-radius: 4px;
		flex-direction: column;
		margin: 16px;
		background: #fff;
		border-radius: 4px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
		box-sizing: border-box;
	}

	.oilCodeBox {
		width: 245px;
		height: 245px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.oilCodeBox>img {
		width: 245px;
		height: 245px;
	}

	.mint-cell-wrapper {
		border: 1px solid #e5e5e5;
	}

	.otherOilCode {
		width: 100%;
		border-radius: 8px 8px 0 0;
		position: absolute;
		top: 349px;
		bottom: 0;
	}

	.otherOilCode .mint-cell {
		margin: 15px 0 10px 0;
	}

	.otherOilCode .check {
		width: 15px;
		height: 15px;
		margin: 0 10px;
		-webkit-appearance: radio;
		appearance: radio;
		vertical-align: middle;
		background: #26a2ff;
	}

	.otherOilCode span,
		{
		font-size: 12px;
	}

	.otherOilCode span {
		color: #666;
	}

	.oilCodeInput {
		border: 1px solid #e5e5e5;
		width: 90%;
		margin: 15px auto;
		padding: 11px 15px 12px;
		border-radius: 4px;
	}

	.oilCodeBtn {
		background: rgba(0, 0, 0, 0.2);
		color: #fff;
	}

	.oilCodeBtnAll {
		width: 95%;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
	}

	.read {
		padding-left: 18px;
	}

	.read text {
		font-size: 12px;
	}
</style>
