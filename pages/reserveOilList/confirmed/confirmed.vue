<template>
	<view class="">
		<view class="chooseAddress">
			<view class="status_bar">

			</view>
			<view class="flex title">
				<view class="left" @tap="back">
					<uni-icon type="arrowleft" size="27"></uni-icon>
				</view>

				<!-- <image src="../../../static/img/back.png" mode="aspectFit" ></image> -->
				<view>预约详情</view>
				<view v-show="status == 2 || status == 3 || status == 4 || status == 5" @tap="getCode">提油码</view>
			</view>
			<view>
				<view class="step-box" v-if="status == 1 || status == 2 || status == 3 || status == 4 || status == 5">
					<step :value="step.value1" :actives="step.waitSure"></step>
					<step :value="step.value2" :actives="step.waitSend"></step>
					<step :value="step.value3" :actives="step.waitGet"></step>
				</view>

				<view class="step-box" v-if="status == -1">
					<step :value="step.value4" :actives="step.refuse"></step>
				</view>
				<view class="step-box" v-if="status == 9">
					<step :value="step.value5" :actives="step.complete"></step>
				</view>
				<view class="content">
					<view class="fget-num paddingLeft15">
						<infoText :textValue="confirmed.order" :disabled="disabled" v-model="order"></infoText>
						<infoText :textValue="confirmed.time" :disabled="disabled" v-model="time"></infoText>
						<infoText :textValue="confirmed.company" :disabled="disabled" v-model="company"></infoText>
						<infoText :textValue="confirmed.oil" :disabled="disabled" v-model="oil"></infoText>
						<infoText :textValue="confirmed.much" :disabled="disabled" v-model="much"></infoText>
						<infoText :textValue="confirmed.main" :disabled="disabled" v-model="main"></infoText>

						<view class="fget-eara addressimg" v-show="showAddress">
							<view class="first-li">送油地址：</view>

							<view>{{address}}</view>
						</view>
					</view>
					<view class="nextBox">
						<mButton :type='btn.type' :value="btn.value" @close="close"></mButton>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import step from '../../../components/step/step.vue'
	import infoText from '../../../components/m-info-text/m-info-text'
	import mButton from '../../../components/m-button.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		data() {
			return {
				step: {
					value1: '待确认',
					value2: '待发油',
					value3: '待收油',
					value4: '已拒绝',
					value5: '已完成',
					waitSure: '',
					waitSend: '',
					waitGet: '',
					refuse: 'step-wait',
					complete: 'step-ago',
				},
				confirmed: {
					order: '预约单号',
					time: '预约时间',
					company: '提油单位',
					oil: '油品类型',
					much: '提油数量(吨)',
					main: '提油方式',
				},
				btn: {
					type: 'primary',
					value: '关闭'
				},
				disabled: true,
				address: '', //提油地址
				order: '', //预约单号
				company: '', //提油单位
				oil: '', //油的类型
				much: '', //油量
				main: '', //提油方式
				status: '', //预约状态
				right: true,
				rId: '', //reserveId
				oId: '', //orderId
				reserveInfo: '',
				showAddress: false,
				time: '',
			}
		},
		onLoad(option) {
			this.rId = option.reserve_id;
			this.oId = option.no;
			this.getReserveOilList();
		},
		methods: {
			getReserveOilList() {
				this.test.post('order/query_reserve_info', {
					reserve_id: this.rId,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.reserveInfo = res.data.value;
						this.status = this.reserveInfo.status;
						this.time = new Date(this.reserveInfo.reserve_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
							/-/g, '-');
						this.order = this.reserveInfo.no
						this.much = String(this.reserveInfo.extract_num);
						this.address = this.reserveInfo.ship_addr;
						this.company = this.reserveInfo.org_name;
						this.oil = this.reserveInfo.oil_type;
						this.main = this.reserveInfo.get_type;
						// if (this.reserveInfo.get_type == 0) {
						// 	this.main = '配送'
						// } else {
						// 	this.main = '自提'
						// };
						if (this.main == '配送') {
							this.showAddress = true
						} else {
							this.showAddress = false
						};
						if (this.status == 1) {
							this.step.waitSure = "step-active"
							this.step.waitSend = ""
							this.step.waitGet = ""
						} else if (this.status == 2 || this.status == 4) {
							this.step.waitSure = "step-ago"
							this.step.waitSend = "step-active"
							this.step.waitGet = ""
						} else if (this.status == 3 || this.status == 5) {
							this.step.waitSure = "step-ago"
							this.step.waitSend = "step-ago"
							this.step.waitGet = "step-active"
						};
						// if (el.status == 1 || el.status == -1 || el.status == 9) {
						// }



					}
				}).catch(err => {
					console.log(err)
				})
			},
			close() {
				uni.navigateBack({
					delta: 1
				})
			},
			back() {
				uni.navigateBack({
					url: '../reserveOilList'
				})

			},
			getCode() {
				uni.navigateTo({
					url: "oliCode/oliCode?id=" + this.rId + '&no=' + this.oId
				})
			},
		},
		components: {
			step,
			infoText,
			mButton,
			uniIcon
		},
	}
</script>

<style scoped>
	/* .chooseAddress {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: 100%;
		background-color: #EFEFF4;
	} */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #e5e5e5;

	}

	.title {
		width: 100%;
		height: 44px;
		padding: 7px 3px;
		box-sizing: border-box;
		/* background-color: black; */
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
		align-content: center;
		align-items: center;
		align-self: center;
		background-color: rgba(255,255,255,0.8);
		justify-content: center;
	}

	.title .left {
		width: 25px;
		height: 25px;
		margin-left: 5px;
		position: absolute;
		left: 10px;

	}

	.title view {
		font-size: 16px;
	}

	.title view:last-child {
		font-size: 14px;
		position: absolute;
		right: 8px;
	}
</style>
