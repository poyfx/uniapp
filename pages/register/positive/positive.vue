<template>
	<view class="">
		<view class="step-box">
			<step :value="value1" ref="one" :actives="active"></step>
			<step :value="value2" ref="two" :actives="kong"></step>
			<step :value="value3" ref="three" :actives="kong1"></step>
		</view>
		<view class="fget-num">
			<view class="fget-ul">
				<text>{{info[num]}}</text>
				<text class="color-dff">点击上传</text>
			</view>
			<view class="positive">
				<image :src="src" class="idCard" mode=""></image>
			</view>
			<view class="tellinfo">
				<text>{{tellinfo[num]}}</text>
			</view>
			<view class="flex  m-info" v-show="stepThree">
				<view class="flex center m-info-content">
					<text>授权书有效期</text>
					<input  placeholder="请选择,需与授权书的有效日期一致" disabled="true" style="width: 222px;"/>
				</view>
				<image src="../../../static/img/right.png" mode="aspectFit"></image>


			</view>
			
		</view>
		<mButton :type="type" :value="value" class="mTop30" @oneSide="oneSide" v-show="steoOne"></mButton>
		<view class="m-two-btn mTop30" v-show="stepTwo">
			<tButton :type="type" :disabled="disabled" class="tButton" @lastStep="lastStep" :content="content"></tButton>
			<tButton :type="type" :disabled="disabled" class="tButton" @nextStep="nextStep" :content="value"></tButton>
		</view>
		<view class="m-two-btn mTop30" v-show="stepThree">
			<tButton :type="type" :disabled="disabled" class="tButton" @threeStepLast="threeStepLast" :content="content"></tButton>
			<tButton :type="type" :disabled="disabled" class="tButton" @threeStepNext="threeStepNext" :content="commit"></tButton>
		</view>
	</view>

</template>

<script>
	import one from '../../../static/img/positive3x.png'
	import two from '../../../static/img/otherside3x.png'
	import three from '../../../static/img/information3x.png'
	import step from '../../../components/step/step'
	import mButton from '../../../components/m-button.vue'
	import tButton from '../../../components/twoButton/twoButton'
	import infoimg from '../../../components/m-info-img/m-info-img'
	export default {
		data() {
			return {
				value1: '第一步',
				value2: '第二步',
				value3: '第三步',
				active: 'step-active',
				ago: 'step-ago',
				kong: '',
				kong1: '',
				type: 'primary',
				value: '下一步',
				disabled: false,
				content: '上一步',
				commit: '提交',
				steoOne: true,
				stepTwo: false,
				stepThree: false,
				num: 0,
				info: [
					"上传身份证正面",
					"上传身份证反面",
					"上传购油凭证",
					"上传提油凭证"
				],
				tellinfo: ["正面示例", "反面示例", "授权书示例", "授权书示例"],
				src: one,
			}
		},
		methods: {
			oneSide() {
				this.steoOne = false;
				this.stepTwo = true;
				this.num = 1;
				this.src = two;
				this.active = "step-ago",
					this.kong = "step-active"
			},
			lastStep() {
				this.steoOne = true;
				this.stepTwo = false;
				this.num = 0;
				this.src = one;
				this.active = "step-active",
					this.kong = ""
			},
			nextStep() {
				this.stepTwo = false;
				this.stepThree = true;
				this.num = 2;
				this.src = three;
				this.active = "step-ago",
					this.kong = "step-ago"
				this.kong1 = "step-active"
			},
			threeStepLast() {
				this.stepThree = false;
				this.stepTwo = true;
				this.num = 1;
				this.src = two;
				this.active = "step-ago",
					this.kong = "step-active"
			},
			threeStepNext() {

			},
		},
		components: {
			step,
			mButton,
			tButton,
			infoimg
		}
	}
</script>

<style>
	.idCard {
		width: 100%;
	}
		.m-info {
		padding: 10px 10px;
		border-top: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}
	
	.m-info-content {
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		align-self: center;
	}
	
	.m-info-content text {
		width: 100px;
	}
	
	.m-info-text {
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		align-self: center;
	}
	
	.m-info image {
		width: 12px;
		height: 12px;
	
		margin-left: 10px;
	}
</style>
