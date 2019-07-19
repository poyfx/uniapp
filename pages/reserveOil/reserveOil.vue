<template>
	<view>
		<view class="content">
			<view class="fget-num paddingLeft15">
				<infoImg :textContent="text.orderNumberText" :disabled="text.disabled" :value="values.orderNumber" :placeholder="text.orderNumberP"
				 @goOrderNumber="goOrderNumber"></infoImg>

				<view class="flex  m-info">
					<view class="flex center m-info-content">
						<text>{{text.dayTimeText}}</text>
						<ruiDatePicker class="minute" fields="minute" start="2010-00-00 00:00" end="2030-12-31 23:59" :value="day"
						 @change="bindChange"></ruiDatePicker>
					</view>
					<view class="flex m-info-text">
						<image src="../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
					</view>

				</view>

				<view class="flex  m-info" :model="text">
					<view class="flex center m-info-contents">
						<text>提油数量(吨)</text>
						<input type="number" v-model="values.muchOil" :placeholder="text.muchOilText" />
					</view>
					<text class="allOil">全体</text>

				</view>

				<infoText :textValue="text.productOilText" :disabled="text.disabled" :value="values.productOil" :placeholder="text.productOilP"></infoText>
				<infoText :textValue="text.modeOilText" :disabled="text.disabled" :value="values.modeOil" :placeholder="text.modeOilP"></infoText>
				<view class="fget-eara " @tap="chooseAddress">
					<view class="first-li">配送地址：</view>
					<view class="addressimg">
						<view style="width: 90%;">{{address}}</view>
						<!-- <img src="../../static/img/right.png" alt> -->
						<image src="../../static/img/right.png" mode="aspectFit"></image>
					</view>

				</view>
				<view class="fget-eara">
					<view class="first-li">备注：</view>
					<view class="secend-in ml">
						<textarea auto-height="" placeholder="如：XXXXXXXXXXXXXXXXXX"></textarea>
						<b></b>
					</view>
				</view>
			</view>
			<view class="mTop20">
				<mButton :type="primary" :value="btnValue" @tap="commit"></mButton>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		formatDate,
		formatDateMin
	} from "../../static/js/date.js";
	import ruiDatePicker from '../../rattenking-dtpicker/rattenking-dtpicker.vue'
	import infoText from '../../components/m-info-text/m-info-text'
	import infoImg from '../../components/m-info-img/m-info-img'
	import mButton from '../../components/m-button.vue'
	export default {
		data() {
			return {
				text: {
					orderNumberText: "订单编号",
					dayTimeText: '提油时间',
					productOilText: '提油油品',
					modeOilText: '提油方式',
					muchOilText: '提油数量',
					disabled: true,
					orderNumberP: '选择订单编号',
					dayP: '请选择时间',
					productOilP: '选择提油油品',
					modeOilP: '选择提油方式'
				},
				values: {
					orderNumber: '', //订单编号
					productOil: "", //提油油品
					modeOil: "", //提油方式
					muchOil: "", //提油数量

				},
				address: "请选择提油方式选择提油方式请选择提油方式",
				startDate: new Date(),
				url: 'reserveOil',
				primary: 'primary',
				btnValue: '提交',
				day: '2019-01-01 00:00', //formatDateMin(new Date())
			}
		},
		methods: {
			GoOilByCompany() {
				this.$router.push("/oilByCompany");
			},
			bindChange(val) {
				this.day = val
			},

			commit() {
				// this.$router.push('/reserveOilList')
			},
			goOrderNumber() {
				uni.navigateTo({
					url: "orederNumber/orederNumber?url=" + this.url
				})
			}
		},
		onLoad(option) {
			this.values.orderNumber = option.ordernumber
		},
		components: {
			infoImg,
			infoText,
			mButton,
			ruiDatePicker
		},
	}
</script>

<style>
	.m-info {
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}

	.m-info-contents {
		justify-content: flex-start;
		flex: 1;
	}

	.m-info .m-info-contents text {
		width: 80px;
	}

	.m-info-contents input {
		flex: 1;
		padding-left: 10px;
	}

	.m-info-content {
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		align-self: center;
		flex: 1;
	}

	.m-info-content text {
		width: 80px;
	}

	.m-info-content .infoText {
		flex: 1;
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
		padding-right: 15px;
		margin-left: 10px;
	}

	.allOil {
		height: 100%;
		padding: 10px 15px;
		color: #009DFF;
		border-left: 1px solid #e5e5e5;
	}

	.myanimate-enter-active {
		animation: show1 0.3s;
	}

	.myanimate-leave-active {
		animation: leave 0.3s;
	}

	.addressimg {
		position: relative;
	}

	.addressimg image {
		width: 12px;
		height: 12px;
		position: absolute;
		right: 5px;
		top: 50%;
		margin: -6px;
	}

	.footmodel {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		bottom: 0px;
		left: 0;
	}

	.footmodel .modelmain view {
		background-color: #fff;
		padding: 13px;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		font-size: 18px;
		color: #666;
	}

	.footmodel .modelmain view {
		display: block;
		background-color: #fff;
		padding: 13px;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		font-size: 18px;
		color: #666;
	}

	.footermain {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		animation: show1 0.3s;
		border-radius: 8px 8px 0 0;
	}

	.modelfooter {
		width: 100%;
		display: flex;
		margin-top: 6px;
		background-color: #fff;

		line-height: 50px;
	}

	.modelfooter view {
		width: 100%;
		text-align: center;
	}

	.footmodel .modelmain view:hover {
		background-color: #e5e5e5;
		;
	}

	@keyframes show1 {
		0% {
			bottom: -241px;
		}

		100% {
			bottom: 0px;
		}
	}

	@keyframes leave {
		100% {
			bottom: 0px;
		}

		0% {
			bottom: -362px;
		}
	}
</style>
