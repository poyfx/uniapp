<template>
	<view>
		<view class="step-box">
			<step :value="step.value1" :actives="step.waitSure"></step>
			<step :value="step.value2" :actives="step.waitSend"></step>
			<step :value="step.value3" :actives="step.waitGet"></step>
		</view>

		<view class="content">
			<view class="fget-num paddingLeft15">
				<infoText :textValue="confirmed.order" :disabled="disabled" v-model="order"></infoText>
				<infoText :textValue="confirmed.time" :disabled="disabled" v-model="time"></infoText>
				<infoText :textValue="confirmed.company" :disabled="disabled" v-model="company"></infoText>
				<infoText :textValue="confirmed.oil" :disabled="disabled" v-model="oil"></infoText>
				<infoText :textValue="confirmed.much" :disabled="disabled" v-model="much"></infoText>
				<infoText :textValue="confirmed.main" :disabled="disabled" v-model="main"></infoText>

				<view class="fget-eara addressimg">
					<view class="first-li">送油地址：</view>

					<view>{{address}}</view>
				</view>
			</view>
			<view class="nextBox">
				<mButton :type='btn.type' :value="btn.value"></mButton>
			</view>
		</view>
	</view>
</template>

<script>
	import step from '../../../components/step/step.vue'
	import infoText from '../../../components/m-info-text/m-info-text'
	import mButton from '../../../components/m-button.vue'
	export default {
		data() {
			return {
				step: {
					value1: '待确认',
					value2: '待发油',
					value3: '待收油',
					waitSure: 'step-wait',
					waitSend: '',
					waitGet: ''
				},
				confirmed: {
					order: '预约单号',
					time: '预约时间',
					company: '提油单位',
					oil: '油品类型',
					much: '提油数量(吨)',
					main: '提油方式'
				},
				btn: {
					type: 'primary',
					value: '关闭'
				},
				disabled: true,
				address: 'aaaaaaaaaaaaaaa',
				order: '2817273654213',
				time: '2019-12-12 20:20',
				company: '凶獒',
				oil: '92#',
				much: '90',
				main: '自提',
				right: true,

			}
		},
		methods: {

		},
		components: {
			step,
			infoText,
			mButton
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "oliCode/oliCode"
			})
		}
	}
</script>

<style>

</style>
