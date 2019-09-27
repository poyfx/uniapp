<template>
	<view>
		<titles :titles="titles"></titles>
		<view class="content">
			<view class="fget-num paddingLeft15">
				<infoImg :imgText="text.orderNumberText" :disabled="text.disabled" :value="values.orderNumber" :placeholder="text.orderNumberP"
				 @goOrderNumber="goOrderNumber"></infoImg>

				<view class="flex  m-info">
					<view class="flex center m-info-content">
						<text>{{text.dayTimeText}}</text>
						<ruiDatePicker class="minute" fields="minute" start="2010-00-00 00:00" end="2030-12-31 23:59" :value="day"
						 @change="bindChange" style="width: 220px; justify-content:flex-start; padding:0;"></ruiDatePicker>
					</view>
					<view class="flex m-info-text">
						<image src="../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
					</view>
				</view>
				<view class="flex  m-info" :model="text">
					<view class="flex center m-info-contents">
						<text>提油数量</text>
						<input type="number" v-model="values.muchOil" @input="getOilNum" :placeholder="text.muchOilText" />
					</view>
					<text class="allOil" @tap="allIn">全提</text>

				</view>

				<infoText :textValue="text.productOilText" :disabled="text.disabled" :value="values.productOil" :placeholder="text.productOilP"></infoText>
				<infoText :textValue="text.modeOilText" :disabled="text.disabled" v-model="values.modeOil" :placeholder="text.modeOilP"></infoText>
				<view class="fget-eara underLine" v-show="showAddress">
					<view class="first-li">配送地址</view>
					<view class="addressimg">
						<view style="width: 90%;">{{address}}</view>
						<!-- <img src="../../static/img/right.png" alt> -->
						<!-- <image src="../../static/img/right.png" mode="aspectFit"></image> -->
					</view>

				</view>
				<view class="fget-eara">
					<view class="first-li">备注</view>
					<view class="secend-in ml">
						<textarea auto-height="" placeholder="(选填)" v-model="remark"></textarea>
						<b></b>
					</view>
				</view>
			</view>
			<view class="mTop20">
				<mButton :type="primary" :value="btnValue" @commit="commit"></mButton>
			</view>
		</view>

		<view v-show="showOrderNumber" class="companyCustomer">
			<!-- <view class="flex title">
				<image src="../../static/img/back.png" mode="aspectFit" @tap="showOrderNumber = !showOrderNumber"></image>
				<text>选择单号</text>
			</view> -->
			<view class="self_header ">
				<view class="self_header_bar">
					<view class="top_view"></view>  
				</view>
				<view class="self_header_title flex self_header_position" >
					<view class="leftBtn" @tap="showOrderNumber =! showOrderNumber">
						<uni-icons type="arrowleft" size="27"></uni-icons>
					</view>
					<view>选择单号</view>
				</view>
			</view>

			<view class="mContent pB10" >
				<view class="userIntegral mTop10 bgcf  borderRadius8" @tap="chooseNumbers(index,item.id)" v-for="(item,index) in chooseNumber.orderInfo"
				 :key="item.id">
					<view class="orderNumber">
						<view><text class="numberTitle">订单编号:</text> <text>{{item.no}}</text></view>
						<view><text class="numberTitle">油品类型:</text> <text>{{item.oil_type}}</text></view>
						<view><text class="numberTitle">提油方式:</text> <text>{{item.get_type}}</text></view>
					</view>
					<view class="integral">
						<text>剩余油量(吨)</text>
						<view>{{item.oil_remain}}</view>
					</view>
				</view>
			</view>
			<view class="loading" @tap="Smore" v-show="more">
				<view>
					<img src="../../static/img/loading.png" alt /> &nbsp; 点击加载更多...
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import {
		formatDate,
		formatDateMin
	} from "../../common/js/date.js";
	import ruiDatePicker from '../../rattenking-dtpicker/rattenking-dtpicker.vue'
	import infoText from '../../components/m-info-text/m-info-text'
	import infoImg from '../../components/m-info-img/m-info-img'
	import mButton from '../../components/m-button.vue'
	// import uniIcon from '../../components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				titles: "预约提油",
				text: {
					orderNumberText: "订单编号",
					dayTimeText: '提油时间',
					productOilText: '提油油品',
					modeOilText: '提油方式',
					muchOilText: '提油数量(吨)',
					disabled: true,
					orderNumberP: '选择订单编号',
					dayP: '请选择时间',
					productOilP: '选择提油油品',
					modeOilP: '选择提油方式',

				},
				chooseNumber: {
					page: 1,
					pageSize: 10,
					orderInfo: [],
				},

				values: {
					orderNumber: '', //订单编号
					productOil: "", //提油油品
					modeOil: "", //提油方式
					muchOil: "", //提油数量

				},
				address: "",
				startDate: new Date(),
				url: 'reserveOil',
				primary: 'primary',
				btnValue: '提交',
				day: formatDateMin(new Date()),
				showOrderNumber: false,
				muchOilText: '', //油的总数量
				remark: '', //备注
				id: '',
				more: true,
				showAddress: true,
				barHeight:25,
			}
		},
		onLoad() {


		},
		methods: {
			//获取订单编号
			getorderNumberInfo() {
				this.test.post('order/query_orderSnInfo', {
					page: this.chooseNumber.page,
					pageSize: this.chooseNumber.pageSize,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						// this.chooseNumber.orderInfo = res.data.value
						res.data.value.forEach(el => {
							this.chooseNumber.orderInfo.push(el)
						})
						if (res.data.value.length < 10 && res.data.value.length > 0) {
							this.more = false;
						} else if (res.data.value.length == 0) {
							this.more = false;
							uni.showToast({
								title: '没有更多了',
								icon: "none"
							})
						}
					} else if (res.data.errorCode == 10001 || res.data.errorCode == 10002 || res.data.errorCode == 10003) {
						uni.showModal({
							title: '提示',
							content: res.data.message,
							success: function(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '../../login/login'
									})
								} else {
									uni.reLaunch({
										url: '../../login/login'
									})
								}
							}
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取时间
			bindChange(val) {
				console.log(val)
				this.day = val;
				// const date1 = new Date(this.day.replace(/-/g,"\/"))//now
				// const date2 = new Date(val.replace(/-/g,"\/"))//选择时间
				// if(date1>date2){
				// 	this.day =formatDateMin(new Date())
				// 	 return uni.showToast({
				// 		title:'预约时间不得小于当前时间',
				// 		icon:'none'
				// 	});
				// 	
				// }else{
				// 	this.day = val
				// }
			},
			// 订单编号的显示
			goOrderNumber() {
				this.chooseNumber.orderInfo = []
				this.getorderNumberInfo();
				this.showOrderNumber = !this.showOrderNumber
			},
			// 点击点单编号
			chooseNumbers(e, id) {
				console.log(e)
				this.id = id;
				this.values.orderNumber = this.chooseNumber.orderInfo[e].no;
				this.values.productOil = this.chooseNumber.orderInfo[e].oil_type;

				this.values.modeOil = this.chooseNumber.orderInfo[e].get_type;
				// if (this.chooseNumber.orderInfo[e].get_type == 0) {
				// 	this.values.modeOil = '配送'
				// } else {
				// 	this.values.modeOil = '自提'
				// }
				if (this.values.modeOil == '' || this.values.modeOil == '配送') {
					this.showAddress = true
				} else if (this.values.modeOil == '自提') {
					this.showAddress = false
				}
				this.muchOilText = this.chooseNumber.orderInfo[e].oil_remain; //保存油的数量
				this.address = this.chooseNumber.orderInfo[e].ship_addr;
				this.showOrderNumber = !this.showOrderNumber
			},
			// 全提
			allIn() {
				if (this.values.orderNumber == '' || this.values.orderNumber == null) {
					uni.showToast({
						title: '请选择订单编号',
						icon: 'none'
					})
				} else {
					this.values.muchOil = this.muchOilText
				}

			},
			getOilNum(e) {
				console.log(e.detail.value)
				if (this.values.orderNumber == '' || this.values.orderNumber == null) {
					uni.showToast({
						title: '请选择订单编号',
						icon: 'none'
					})
				} else {
					if (e.detail.value > this.muchOilText) {
						uni.showToast({
							title: '不能超过油的总量：' + this.muchOilText,
							icon: 'none'
						})
					}
				}

			},
			Smore() {
				this.chooseNumber.page += 1;
				this.getorderNumberInfo()
			},
			commit(id) {
				const oilNumbers = Number(this.values.muchOil)
				const day = this.day
				console.log(day)
				const that = this;
				if (this.values.orderNumber !== '' && this.values.orderNumber !== null) {
					if (this.values.muchOil !== '' && this.values.muchOil !== null) {
						uni.showModal({
							title: '提示',
							content: '提交后无法修改，确认提交？',
							success: function(res) {
								if (res.confirm) {
									console.log(typeof(oilNumbers), typeof(that.id))
									that.test.post('order/mark_reserve', { //http://192.168.0.156:8080/api/bizcust/
										bz_order_id: that.id,
										reserve_time: that.day,
										extract_num: oilNumbers,
										remark: that.remark,
									}).then(res => {
										console.log(res)
										if (res.statusCode == 200 && res.data.errorCode == 0) {
											uni.redirectTo({
												url: '../reserveOilList/reserveOilList',
											});
										} else if (res.data.errorCode == 10001 || res.data.errorCode == 10002 || res.data.errorCode == 10003) {
											uni.showModal({
												title: '提示',
												content: '用户信息已失效，请重新登录',
												success: function(res) {
													if (res.confirm) {
														uni.reLaunch({
															url: '../login/login'
														})
													} else {
														uni.reLaunch({
															url: '../login/login'
														})
													}
												}
											})
										} else {
											uni.showToast({
												title: res.data.message,
												icon: "none"
											})
										}
									}).catch(err => {
										console.log(err)
									})
								} else {
									return;
								}
							}
						})

					} else {
						uni.showToast({
							title: '请输入提油数量',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: '请选择订单编号',
						icon: 'none'
					})
				}

			},
		},
		components: {
			infoImg,
			infoText,
			mButton,
			ruiDatePicker,
			// uniIcon
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
		width: 4rem;
	}

	.m-info-contents input {
		flex: 1;
	}

	.m-info-content {
		padding: 4px 0;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		align-self: center;
		flex: 1;
	}

	.m-info-content text {
		width:4rem;
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
		padding: 12px 15px;
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
		color: #616161;
	}

	.footmodel .modelmain view {
		display: block;
		background-color: #fff;
		padding: 13px;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		font-size: 18px;
		color: #616161;
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

	/* 选择单号样式 */
	.companyCustomer {
		position: absolute;
		top: 0;
		z-index: 997;
		width: 100%;
		height: 100%;
		background-color: #EFEFF4;
	}

	.title {
		width: 100%;
		height: 44px;
		padding: 7px 3px;
		box-sizing: border-box;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
		text-align: center;
		position: fixed;
		top: 0;
		background-color: #fff;
	}

	.title image,
	text {
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.title image {
		width: 18px;
		height: 18px;
		margin-left: 5px;
	}

	.title text {
		flex: 1;
		font-size: 17px;

	}
</style>
