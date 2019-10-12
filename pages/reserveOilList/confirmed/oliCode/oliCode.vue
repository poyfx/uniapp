<template>
	<view style="position: absolute;width: 100%; height: 100%; background: #00a8ff;">
		<view class="self_header_bar_code">
			<view class="top_view_code"></view>
		</view>
		<view class="title_content">
			<view class="flex self_header_title_code">
				<view class="leftBtn" @tap="back">
					<uni-icons type="arrowleft" size="27" style="color: #fff;"></uni-icons>
				</view>
				<view>提油码</view>
			</view>
		</view>
		<view class="oilCodeBox">
			<view class="oilCodeBox_title">
				<image src="../../../../static/img/code_top_bg.png" mode="" style=""></image>
			</view>
			<view class="">

			</view>
			<image src="../../../../static/img/code_bg.png" mode="" style=""></image>
			<view class="oilcode">
				<view class="oilcode_title">
					该二维码可用于提油扫码验证
				</view>
				<view class="oilcode_codebox">
					<tki-qrcode v-if="ifShow" cid="qrcode2" ref="qrcode2" :val="val" :size="size" :onval="onval" :loadMake="loadMake"
					 :usingComponents="true" @result="qrR" />
				</view>
				<view style="padding-top: 16px; font-size:0.7rem; text-align: center;">{{val}}</view>
				<view class="" style="padding-top: 16px; font-size:0.6rem; text-align: center;color: #9e9e9e;">
					提油码每5分钟自动刷新，请勿轻易泄露给他人
				</view>

			</view>
			<view class="oilcode_foot">
				提油码仅用于提油时向检票员展示，请勿随意发生给陌生人，以防诈骗
			</view>

		</view>
		<view class="oilcode_btn" v-show="instead == 0">
			<button type="default" @tap="gotReplaceMan">申请代提人</button>
		</view>
	</view>
</template>

<script>
	import mButton from '../../../../components/m-button.vue'
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				titles:'提油码',
				value: false,
				options: [{
					value: 1,
					label: "我同意"
				}],
				checkes: true,
				checked: false,
				ifShow: true,
				val: '', // 要生成的二维码值
				size: 400, // 二维码大小
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
				id: '', //订单id
				no: '', //订单编号
				number: '', //提油数量
				oiltype: '', //油品类型
				instead:'',//是否已经申请了待提人
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.no = option.no;
			this.number = option.number;
			this.oiltype = option.type;
			this.instead = option.instead;
			this.getCode();
		},
		methods: {
			getCode() {
				this.test.post('reserve/reserve_encrypt', {
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
			gotReplaceMan() {
				uni.navigateTo({
					url: '../replaceMan/replaceMan?no=' + this.no + '&number=' + this.number + '&type=' + this.oiltype
				})
			},
			cancel() {
				this.checked = !this.checked;
				this.checkes = !this.checkes
			},
			qrR(res) {
				this.src = res
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			send() {

				if (this.checkes == true) {
					// Toast("请阅读免责条款,勾选后方可发送");
					return uni.showToast({
						title: "请阅读免责条款,勾选后方可发送",
						"icon": "none",
						position: 'bottom',
					})
				} else {
					if (this.otherNumber !== '') {
						if (!/^1[3456789]\d{9}$/.test(this.otherNumber)) {
							return uni.showToast({
								"title": '请填写正确的手机号码',
								"icon": "none",
								position: 'bottom',
							})
						} else {
							this.test.post('reserve/send_get_encrypt', {
								phone: this.otherNumber,
								encrypt_sn: this.val
							}).then(res => {
								console.log(res)
								if (res.statusCode == 200 && res.data.errorCode == 0) {
									uni.showToast({
										title: '发送成功'
									})
								} else {
									uni.showToast({
										title: res.data.message,
										icon: 'none'
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
	.oilcode {
		width: 15rem;
		height: 17.3rem;
		margin: 0 auto;
		border-top: 1px dashed #cbcbcb;
		border-bottom: 1px dashed #cbcbcb;
		position: absolute;
		top: 5.7rem;
		z-index: 2;
		text-align: center;
		left: 50%;
		margin-left: -7.5rem;
	}

	.oilcode_title {
		margin: 10px 0;
		font-size: 0.8rem;
	}

	.oilcode_codebox {
		width: 200px;
		height: 200px;
		margin: 0 auto;
	}

	.oilcode_foot {
		width: 15rem;
		height: 4.2rem;
		margin: 0 auto;
		text-align: center;
		position: absolute;
		top: 23rem;
		z-index: 2;
		font-size: 0.6rem;
		color: #757575;
		left: 50%;
		margin-left: -7.5rem;
	}

	.oilCodeBox {
		width: 100%;
		margin-top: 15px;
		box-sizing: border-box;
	}

	.oilCodeBox>image {
		width: 16rem;
		height: 21.5rem;
		position: relative;
		left: 50%;
		margin-left: -8rem;
		top: -5px;
	}

	.oilCodeBox_title {
		width: 100%;
	}

	.oilCodeBox_title>image {
		width: 17.4rem;
		height: 1rem;
		position: relative;
		left: 50%;
		margin-left: -8.7rem;
		z-index: 1;
	}

	.mint-cell-wrapper {
		border: 1px solid #e5e5e5;
	}

	.oilcode_btn {
		width: 100%;
		margin-top: 60px;
	}

	.oilcode_btn button {
		width: 17.4rem;
		margin: 0 auto;
		color: #616161;
	}
</style>
