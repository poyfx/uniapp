<template>
	<view class="">
		<view class="self_header_bar">
			<view class="top_view"></view>
		</view>
		<view class="title_content">
			<view class="flex self_header_title">
				<view class="leftBtn" @tap="back">
					<uni-icons type="arrowleft" size="27"></uni-icons>
				</view>
				<view>预约详情</view>
				<view class="takecode" @tap="getCode" v-show="showAddress == false && status == 2">
					提油码
				</view>
			</view>
		</view>

		<view class="chooseAddress">

			<!-- 配送司机信息 -->
			<view class="driver_content bgcf" v-if="showAddress == true" v-show="status == 2 || status == 3 || status == 4 || status == 8 || status == 9">
				<view class="driverinfos flex ">
					<image src="../../../static/img/customer.png" style="width: 24px;height: 25px;" mode="aspectFit"></image>
					<text style="font-weight: bold;">配送司机</text>
				</view>
				<view class="driver_info">
					<text>秦明月</text>
					<text>15815563248</text>
				</view>
				<view class="driver_info">
					<text>车牌号</text>
					<text>粤B58569</text>
				</view>
				<view class="driver_btn">
					<view class="state" v-if="status == 2">已准备</view>
					<view class="state" v-else-if="status == 3">待提油</view>
					<view class="state" v-else-if="status == 4">已提油</view>
					<view class="driver_btnP" v-else-if="status == 9">已完成</view>
					<view class="driver_btnC" v-else-if="status == 8">已取消</view>
				</view>
			</view>
			
			<!-- 自提信息 -->
			<view class="driver_content bgcf"  v-else v-show="status == 2 || status == 3 || status == 4 || status == 8 || status == 9">
				<view class="driverinfos flex ">
					<image src="../../../static/img/customer.png" style="width: 24px;height: 25px;" mode="aspectFit"></image>
					<text style="font-weight: bold;">提油人</text>
				</view>
				<view class="driver_info">
					<text>秦明月</text>
					<text>15815563248</text>
				</view>
				<view class="driver_info">
					<text>车牌号</text>
					<text>粤B58569</text>
				</view>
				<view class="driver_btn">
					<view class="state" v-if="status == 2">待提油</view>
					<view class="driver_btnP" v-else-if="status == 9">已完成</view>
					<view class="driver_btnC" v-else-if="status == 8">已取消</view>
				</view>
			</view>
			

			<view class="content">
				<view class="fget-num paddingLeft15 confirmed_content" :class="{refuse:isrefuse}">
					<view class="flex  m-info">
						<view class="flex center m-info-content ">
							<text>预约状态</text>
							<view class="confirmed_status">
								<text class="state" v-if="status == 2">预约已确认</text>
								<text class="state" v-else-if="status == 3">待提油</text>
								<text class="state" v-else-if="status == 4">已提油</text>
								<text class="oP" v-else-if="status == 9">已完成</text>
								<text class="s" v-else-if="status == 8">已取消</text>
								<text class="oc" v-else-if="status == -1">已拒绝</text>
							</view>

						</view>
					</view>
					<view class="flex  m-info" v-show="status == -1">
						<view class="flex center m-info-content">
							<text>拒绝原因</text>
							<view></view>
						</view>
					</view>
					<infoText :textValue="confirmed.order" :disabled="disabled" v-model="order"></infoText>
					<infoText :textValue="confirmed.time" :disabled="disabled" v-model="time"></infoText>
					<infoText :textValue="confirmed.company" :disabled="disabled" v-model="company"></infoText>
					<infoText :textValue="confirmed.oil" :disabled="disabled" v-model="oil"></infoText>

					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>提油数量</text>
							<view>{{much}}吨</view>
						</view>
					</view>
					<infoText :textValue="confirmed.main" :disabled="disabled" v-model="main"></infoText>

					<view class="fget-eara addressimg" v-show="showAddress">
						<view class="first-li">送油地址：</view>

						<view>{{address}}</view>
					</view>

				</view>
				<view class="confirmed_btn flex" v-if="main == '配送'">
					<view class="confirmed_btn_2 flex" v-if="status == 2">
						<button type="primary">更换司机</button>
						<button type="primary">同意配送</button>
					</view>

					<view class="confirmed_btn_3" v-else-if="status == 3">
						<button type="primary">取消预约</button>
					</view>
					
					<view class="confirmed_btn_2 flex" v-else-if="status == 4">
						<button type="primary" @tap="close">关闭</button>
						<button type="primary" @tap="finish">确认收油</button>
					</view>
					<view class="confirmed_btn_4" v-else>
						<button type="primary" @tap="close">关闭</button>
					</view>
				</view>
				<view class="confirmed_btn" v-else>
					<view class="confirmed_btn_2 flex" v-if="status == 2">
						<button type="primary">取消预约</button>
						<button type="primary" @tap="finish">确认已提油</button>
					</view>
					<view class="confirmed_btn_4" v-else>
						<button type="primary" @tap="close">关闭</button>
					</view>
				</view>
				<!-- <view class="nextBox" v-show="status == 1 ||  status == 2 || status == -1 || status == 9">
					<mButton :type='btn.type' :value="btn.value" @close="close"></mButton>
				</view>
				<view class="m-two-btn mTop30 mB" v-show="status == 3">
					<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepLast="close" :content="btn.value"></tButton>
					<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepNext="finish" :content="main == '配送' ? btn.commit : btn.commit1"></tButton>
				</view> -->
			</view>

		</view>

	</view>

</template>

<script>
	import step from '../../../components/step/step.vue'
	import infoText from '../../../components/m-info-text/m-info-text'
	import mButton from '../../../components/m-button.vue'
	// import uniIcon from "@/components/uni-icons/uni-icons.vue"
	import tButton from '../../../components/twoButton/twoButton'
	export default {
		data() {
			return {
				confirmed: {
					order: '预约单号',
					time: '提油时间',
					company: '提油单位',
					oil: '油品类型',
					much: '提油数量',
					main: '提油方式',
				},
				btn: {
					type: 'primary',
					value: '关闭',
					commit: '确认收油',
					commit1: '确认提油'
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
				isrefuse: false,
				get_type:'',
			}
		},
		onLoad(option) {
			this.rId = option.reserve_id;
			this.oId = option.no;
			this.getReserveOilList();
		},
		methods: {
			getReserveOilList() {
				this.test.post('reserve/query_reserve_info', {
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
						if (this.main == '配送') {
							this.showAddress = true
						} else {
							this.showAddress = false
						};
						console.log(this.status)
						if (this.status == -1) {
							this.isrefuse = true;
						} else {
							this.isrefuse = false;
						}
						// if (el.status == 1 || el.status == -1 || el.status == 9) {
						// }



					}
				}).catch(err => {
					console.log(err)
				})
			},
			close() {
				uni.redirectTo({
					url: '../reserveOilList'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1,
					"animationType": "pop-out",
					"animationDuration": 200,
				})
			},
			finish() {
				this.test.post('reserve/confirm_reserve', {
					id: this.rId
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.getReserveOilList()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getCode() {
				uni.navigateTo({
					url: "oliCode/oliCode?id=" + this.rId + '&no=' + this.order+ '&number='+this.much+ '&type=' +this.oil
				})
			},
		},
		components: {
			step,
			infoText,
			mButton,
			// uniIcon,
			tButton
		},
	}
</script>

<style scoped>
	.chooseAddress {
		/* position: absolute;
		top: 0;
		left: 0;
		z-index: 9999; */
		width: 100%;
		height: 100%;
		background-color: #EFEFF4;
	}

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
		background-color: rgba(255, 255, 255, 0.8);
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

	.m-info {
		padding: 12px 0;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}

	.m-info-content {
		justify-content: flex-start;
	}

	.m-info-content view {
		color: #616161;
	}

	.m-info text {
		width: 4rem;
	}

	.m-info image {
		width: 12px;
		height: 12px;
		padding-right: 15px;
	}

	.m-info .confirmed_status text {
		width: 10rem;
	}

	.confirmed_content {
		margin-top: -65px;
		padding: 87px 0 46px 15px;
	}

	.driver_content {
		position: relative;
		top: 15px;
		margin: 0 10px;
		padding: 10px 0 1px 15px;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
		border-radius: 0.25em;
	}

	.driverinfos {
		padding-bottom: 17px;
		align-content: center;
		align-self: center;
		align-items: center;
	}

	.driverinfos image {
		margin-right: 10px;

	}

	.driver_info {
		width: 100%;
		margin: 10px 0;
	}

	.driver_info text {
		display: inline-block;

	}

	.driver_info text:first-child {
		width: 3rem;
		margin-right: 15px;
	}

	.driver_btn {
		position: absolute;
		bottom: 0;
		right: 0;
	}


	.driver_btn view {
		padding: 12px 14px;
		border-radius: 0.25em 0 0 0.25em;
		background-color: #00A8FF;
		color: #fff;
	}

	.driver_btn .driver_btnP {
		background-color: #32BF75;
	}

	.driver_btn .driver_btnC {
		background-color: #CBC5C5;
	}

	.confirmed_btn {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.confirmed_btn_2,
	.confirmed_btn_3,
	.confirmed_btn_4{
		width: 100%;
	}

	.confirmed_btn .confirmed_btn_2 button {
		width: 50%;
		border-radius: 0;
		background-color: #00A8FF;
	}

	.confirmed_btn .confirmed_btn_3 button {
		width: 100%;
		border-radius: 0;
		background-color: #fff;
		color: #616161;
	}
	.confirmed_btn .confirmed_btn_4 button {
		width: 100%;
		border-radius: 0;
		background-color: #00a8ff;
		color: #fff;
	}

	.confirmed_btn .confirmed_btn_2 button:first-child {
		background-color: #fff;
		color: #616161;
	}

	.refuse {
		margin: 0;
		padding: 0 0 0 15px;
	}

	.takecode {
		position: absolute;
		right: 15px;
		font-size: 16px;
	}
</style>
