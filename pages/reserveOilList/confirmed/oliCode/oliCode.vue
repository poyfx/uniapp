<template>
	<view class="home" style="position: absolute;width: 100%; height: 100%;">
		<view class="oilCode">
			<view class="oilCodeBox">
				<tki-qrcode v-if="ifShow" cid="qrcode2" ref="qrcode2" :val="val" :size="size" :onval="onval" :loadMake="loadMake"
				 :usingComponents="true" @result="qrR" />
			</view>
		</view>
		<view style="text-align: center;">{{val}}</view>
		<view class="mContent bgcf otherOilCode ">
			<view>提油码发送他人代提</view>
			<input type="text" class="oilCodeInput" disabled="disabled" v-model="otherNumber" />
			<view class="read ;">
				<label class="radio">
					<radio value="已阅读" :checked='checked' @tap="cancel" />
				</label>
				<!-- <input type="checkbox" class="check" value="已阅读" @click="check" :checked="checked" /> -->
				<text>已阅读</text>

				<text style="color: #009DFF; ;">免责条款</text>
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
				size: 550, // 二维码大小
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
				reserve_sn: '',
				otherNumber: '' //他人号码
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.reserve_sn = option.reserve_sn;
			this.getCode();
		},
		methods: {
			getCode() {
				this.test.post('order/reserve_encrypt', {
					id: this.id,
					reserve_sn: this.reserve_sn,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.val = res.data.value
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
			send() {
				if (this.otherNumber !== '') {
					if (this.checkes == true) {
						// Toast("请阅读免责条款,勾选后方可发送");
						return uni.showToast({
							title: "请阅读免责条款,勾选后方可发送",
							"icon": "none"
						})
					} else {
						// Toast("发送成功");
						uni.showToast({
							title: '发送成功'
						})
					}
				} else {
					return uni.showToast({
						title: "请填写手机号码",
						"icon": "none"
					})
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
		width: 100%;
		display: flex;
		padding: 20px;
		justify-content: center;
		border-radius: 4px;
	}

	.oilCodeBox {
		width: 275px;
		height: 275px;
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
		border-radius: 8px 8px 0 0;
		height: 49.5%;
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
