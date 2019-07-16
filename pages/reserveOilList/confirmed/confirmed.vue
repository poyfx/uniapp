<template>
	<view>
		<view class="step-box">
			<step :value="value1" :actives="waitSure"></step>
			<step :value="value2" :actives="waitSend"></step>
			<step :value="value3" :actives="waitGet"></step>
		</view>
		
		<div class="content">
			<div class="fget-num">
				<mt-field label="预约单号" readonly disableClear v-model="number"></mt-field>
				<mt-field label="预约时间" readonly disableClear v-model="time"></mt-field>
				<mt-field label="提油单位" readonly disableClear v-model="company"></mt-field>
				<mt-field label="油品类型" readonly disableClear v-model="oil"></mt-field>
				<mt-field label="提油数量(吨)" readonly v-model="much"></mt-field>
				<mt-field label="提油方式" readonly v-model="main"></mt-field>

				<div class="fget-eara addressimg">
					<p class="first-li">送油地址：</p>

					<p>{{address}}</p>
				</div>
			</div>
			<div class="nextBox">
				<mt-button class="btn" type="primary" size="large">关闭</mt-button>
			</div>
		</div>
	</view>
</template>

<script>
	import step from '../../../components/step/step.vue'
	export default {
		data() {
			return {
				value1:'待确认',
				value2:'待发油',
				value3:'待收油',
				address: 'aaaaaaaaaaaaaaa',
				number: '2817273654213',
				time: '2019-12-12 20:20',
				company: '凶獒',
				oil: '92#',
				much: '90',
				main: '自提',
				right: true,
				waitSure:'step-wait',
				waitSend:'',
				waitGet:''
			}
		},
		methods: {

		},
		components:{
			step
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"oliCode/oliCode"
			})
		}
	}
</script>

<style>

</style>
