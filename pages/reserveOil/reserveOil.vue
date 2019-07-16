<template>
	<view>
		<view class="content">
			<view class="fget-num paddingLeft15">
	<!-- 
				<mt-field label="提油时间" @click.native="selectData" placeholder="请选择提油时间" readonly disableClear v-model="day">
					<img src="../../static/img/right.png" alt>
				</mt-field> -->

				<infoImg :textContent="text.orderNumberText" :disabled="text.disabled" :value="values.orderNumber" :placeholder="text.orderNumberP"
				 @goOrderNumber="goOrderNumber"></infoImg>
				<infoImg :textContent="text.dayTimeText" :disabled="text.disabled" :value="values.day" :placeholder="text.dayP"></infoImg>
				
				<view class="flex  m-info" :model="text">
					<view class="flex center m-info-content">
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
						<img src="../../static/img/right.png" alt>
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
		<!-- <mt-datetime-picker ref="datePicker" v-model="pickerVisible" type="datetime" :startDate="startDate" year-format="{value} "
		 month-format="{value} " date-format="{value} " hour-format="{value}" minute-format="{value}" @confirm="handleConfirm"></mt-datetime-picker> -->
	</view>
</template>

<script>
	// import {
	// 	DatetimePicker
	// } from "mint-ui";
	import {
		formatDate,
		formatDateMin
	} from "../../static/js/date.js";
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
					orderNumberP:'选择订单编号',
					dayP: '请选择时间',
					productOilP: '选择提油油品',
					modeOilP: '选择提油方式'
				},
				values: {
					orderNumber: '', //订单编号
					productOil: "", //提油油品
					modeOil: "", //提油方式
					muchOil: "", //提油数量
					day: '',//formatDateMin(new Date())
				},
				address: "请选择提油方式选择提油方式请选择提油方式",
				show: false,
				mode: false,
				startDate: new Date(),
				pickerVisible: '',
				url: 'reserveOil',
				primary: 'primary',
				btnValue: '提交'
			}
		},
		methods: {
			GoOilByCompany() {
				this.$router.push("/oilByCompany");
			},
			chooseOilShow() {
				this.show = !this.show;
			},
			chooseOilLeave() {
				this.mode = !this.mode;
			},
			chooseOne(val) {
				this.show = !this.show;
				this.productOil = val.target.innerHTML;
				//  this.$refs.chooseOne.className="modelmainActive"
			},
			modeShow() {
				this.mode = !this.mode;
			},
			chooseTwo(val) {
				console.log(val);
				this.mode = !this.mode;
				this.modeOil = val.target.innerHTML;
			},
			chooseAddress() {
				// this.$router.push({
				// 	path: '/oilAddress',
				// 	query: {
				// 		name: "reserveOil"
				// 	}
				// })
			},
			// 获取时间
			selectData() {
				if (this.selectdValue) {
					this.pickerVisible = this.selectedValue;
				} else {
					this.pickerVisible = this.day;
				}
				this.$refs.datePicker.open();
			},
			handleConfirm() {
				this.day = formatDateMin(this.pickerVisible);
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
			mButton
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
	
	.m-info-content {
		justify-content: flex-start;
		flex: 1;
	}
	
	.m-info .m-info-content text {
		width: 80px;
	}
	.m-info-content input{
		flex: 1;
		padding-left: 10px;
	}
	.allOil{
		height: 100%;
		padding: 10px 15px ;
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

	.addressimg img {
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
