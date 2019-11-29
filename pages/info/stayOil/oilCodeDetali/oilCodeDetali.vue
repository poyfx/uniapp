<template>
	<view style="position: absolute;width: 100%;height: 100%;">
		<view class="oilCode">
			<view class="oilCodeBox">
				<tki-qrcode v-if="ifShow" cid="qrcode2" ref="qrcode2" :val="val" :size="size" :onval="onval" :loadMake="loadMake"
				 :usingComponents="true" @result="qrR" />
			</view>
			<view style="text-align: center;padding-bottom: 16px; font-size: 12px;">{{val}}</view>
		</view>

		<view class="bgcf otherOilCode ">
			<view class="surplus">剩余油量 <text>{{surplusOli}}</text>吨</view>
			<view>提油时出示该提油码进行验证</view>
			<view>请勿随意将此码交给他人</view>
			<view>以此保证石油的安全</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				ifShow: true,
				val: '111111', // 要生成的二维码值
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
				surplusOli: '0'
			}
		},
		methods: {
			qrR(res) {
				this.src = res
			},
		},
		components: {
			tkiQrcode
		},
	}
</script>

<style>
	.oilCode {
		/* width: 100%; */
		display: flex;
		/* padding: 20px; */
		justify-content: center;
		border-radius: 4px;
		flex-direction: column;
		margin:16px;
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
		margin: 16px 0;
	}

	.otherOilCode {
		position: absolute;
		border-radius: 8px 8px 0 0;
		width: 100%;
		top: 349px;
		bottom: 0;
	}

	.otherOilCode view {
		font-size: 22px;
		margin: 15px;
	}

	.otherOilCode .surplus {
		font-size: 22px;
		color: #fff;
		text-align: center;
		background-color: #009DFF;
		display: flex;
		justify-content: center;
	 	align-content: center;
		align-items: center;
		margin: 0;
	/*	align-self: center; */
		padding: 10px 0;
		border-radius: 8px 8px 0 0;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	}

	.surplus text {
		font-size: 54px;
		color: #fff;
		margin: 0 49px
	}
</style>
