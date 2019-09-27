<template>
	<view>
		<view class="content">
			<view class="timeOut" v-if="status == 2 || status == 3 || status == 4">
				<!-- <timer endTime="172800" :callback="callback" endText="已经结束了"></timer> -->
				<text class="time">{{countDown}}</text>
				<text class="timeOver">订单自动取消</text>
			</view>
			<view class="fget-num detailsState" :class="have? 'padding11' : 'mTop30p'" ref="detail">
				<view class="stateBox">
					<view class="state1 flex">
						<text>订单状态：</text>
						<view class="">
							<text class="oT" v-if="status == -1">已取消</text>
							<text class="oT" v-if="status == -2">超时已取消</text>
							<text class="oL" v-if="status == 2">已确认价格</text>
							<text class="oL" v-if="status == 3">待付款</text>
							<text class="oL" v-if="status == 4">待确认收款</text>
							<text class="oL" v-if="status == 5">待开票</text>
							<text class="oP" v-if="status == 9">已完成</text>
						</view>

					</view>
					<view class="state2 flex">
						<text>当前价格：</text>
						<view class="">
							<text>{{order.oil_price}}</text>/吨
						</view>

					</view>
					<view class="state2 flex">
						<text>市场定价：</text>
						<view class="">
							<text>{{order.market_price}}</text>/吨
						</view>


					</view>
				</view>
				<view class="discount">
					<view>已优惠</view>
					<text>{{discounts}}%</text>
				</view>
			</view>

			<view class="fget-num detailsProcess" @tap="goRotate" v-if="status == 2 || status == 3 || status == 4 || status == 5 ||status == 9">
				<view class="processText" v-if="status == 2">
					<view class="" >{{statusinfo.content}}</view>
					<view>{{dates}}</view>
				</view>
				<view class="processText" v-if="status == 4">
					<view class="">{{statusinfo.content}}</view>
					<view>{{dates}}</view>
				</view>
				<view class="processText" v-if="status == 3">
					<view class="">{{statusinfo.content}}</view>
					<view>{{dates}}</view>
				</view>
				
				<view class="processText" v-if="status == 5">
					<view class="">{{statusinfo.content}}</view>
					<view>{{dates}}</view>
				</view>
				
				<view class="processText" v-if="status == 9">
					<view class="oP">{{statusinfo.content}}</view>
					<view  class="oP">{{dates}}</view>
				</view>
<image class="imgs" src="../../../static/img/right.png" mode="aspectFit"></image>
				<!-- <image :class="rotate ? 'go' : 'imgs'" src="../../../static/img/right.png" mode="aspectFit"></image> -->
			</view>

			<view class="fget-num">
				<view class="orderDetails">
					<view>
						<text>订单编号：</text>
						<text>{{order.no}}</text>
					</view>
					<view>
						<text>下单时间：</text>
						<text>{{time}}</text>
					</view>
					<view>
						<text>购油单位：</text>
						<text>{{order.org_name}}</text>
					</view>
					<view>
						<text>油品类型：</text>
						<text>{{order.oil_type}}</text>
					</view>
					<view v-show="status == 3 || status == 4 || status == 5 || status == 9">
						<text>发票状态：</text>
						<text v-if="order.is_invoice == '是'">已开发票</text>
						<text v-else>未开发票</text>
					</view>
					<view>
						<text>购油数量：</text>
						<text>{{order.count}}吨</text>
					</view>
					<view>
						<text>提油方式：</text>
						<text >{{order.get_type}}</text>
						<!-- <text v-if="order.get_type ==1">自提</text> -->
					</view>
					<view v-show="order.get_type == '配送'">
						<text>送油地址：</text>

						<text>{{order.ship_addr}}</text>
					</view>
				</view>
			</view>
			<view class="pay">
				<view class="flex">
					<text>配送金额：</text>
					<view style="margin-left: 16px;"><text>￥{{delivery}}</text></view>
				</view>
				<view class="flex">
					<text>油品总金额：</text>
					<view class="">
						<text>￥{{oilPrice}}</text>
					</view>

				</view>
				<view class="flex">
					<text>订单总金额：</text>
					<view class="">
						<text>￥{{orderPrice}}</text>
					</view>

				</view>
			</view>

			<view class="m-two-btn mTop15 mB" v-if="status ==2">
				<button class="tButton cal" @tap="cancelOrder">取消订单</button>
				<tButton :type="type" class="tButton" :content="con2" @sureBuy="sureBuy(order.count)"></tButton>
			</view>
			<view class=" nextBox mTop15 mB" v-else-if="status ==-1  || status ==-2 || status ==5">
				<mButton :type="type" :value="closed" @tell="closePage"></mButton>
			</view>

			<view class="m-two-btn mTop15 mB" v-else-if="status ==3  ">
				<button class="tButton cal" @tap="cancelOrder">取消订单</button>
				<tButton :type="type" class="tButton" :content="btnValue" :disabled="disabled" @tell="tells"></tButton>
			</view>
			<view class="nextBox mTop15 mB" v-else-if="status ==4  ">
				<mButton :type="type" :value="btnValue" :disabled="disabled" @tell="payment"></mButton>
			</view>
			<view class="m-two-btn mTop15 mB" v-else-if="status == 9  ">
				<button class="tButton cal" @tap="closePage">关闭</button>
				<button class="tButton " type="primary" style="padding: 0;" @tap="sureBuy(order.count)" v-show="order.is_invoice == '否'" >补开发票</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tButton from '../../../components/twoButton/twoButton.vue'
	import mButton from '../../../components/m-button.vue'
	import {formatSeconds} from "../../../common/js/date.js"
	// import wPicker from '../../../common/js/w-picker.js'
	export default {
		data() {
			return {
				type1: "defult",
				type: "primary",
				con1: '取消订单',
				con2: '确认购买',
				btnValue: '确认已付款',
				closed: '关闭',
				dates: '2019-08-12 08:12',
				// rotate: false,//日志动画
				orderId: '', //订单ID
				no:'',
				order: [],
				time: '',//下单时间
				countDown:'00:00:00',//倒计时
				disabled: false,
				have:'',
				status:'',
				statusinfo:[],
				// delivery:'100',
				// discount:this.order.oil_price,//优惠
			}
		},
		onLoad(option) {
			this.orderId = option.id;
			this.status  = option.status;
			this.no = option.no;
			this.getOrderDtails();
			if(this.status == -2 || this.status == -1 || this.status == 9 || this.status == 5){
				 this.have = true
				
			} else{
				 this.have = false
			}
		},
		methods: {
			// 订单详情获取数据
			getOrderDtails() {
				this.test.post('order/query_OrderById', {
					id: this.orderId
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.order = res.data.value;
						this.status = res.data.value.status;
						this.statusinfo = this.order.latestHis
						//倒计时时间
						this.time = new Date(this.order.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(/-/g,'-')
						// 订单流程时间
						this.dates = new Date(this.statusinfo.time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(/-/g,'-')
						const a = this.order.difference
						this.cutDown(a)
						
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 倒计时
			cutDown(time){
				const that =this;
				if(time == 0){
					clearInterval()
				}
				setInterval(function(){
					time -- ;
					that.countDown =formatSeconds(time)
				},1000)
			},
			sureBuy(num) {
				uni.redirectTo({
					url: "../invoice/invoice?id=" + this.orderId + '&number=' + num + '&no=' + this.no + '&status=' + this.status + '&company=' + this.order.org_name + '&moeny=' + this.oilPrice
				})
			},
			tells(){
				this.test.post('order/com_payment',{
					id:this.orderId,
				}).then(res=>{
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						// this.getOrderDtails()
						this.test.post('order/query_OrderById', {
							id: this.orderId
						}).then(res => {
							console.log(res)
							if (res.statusCode == 200 && res.data.errorCode == 0) {
								this.order = res.data.value;
								this.status = res.data.value.status;
								this.time = new Date(this.order.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(/-/g,'-')
								clearInterval();
								const a = this.order.difference
								this.cutDown(a)
								
							}
						}).catch(err => {
							console.log(err)
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//取消订单
			cancelOrder() {
				const that = this;
				uni.showModal({
					"content": "确认取消订单",
					success: function(res) {
						if (res.confirm) {
							that.test.post('order/cancel_order', {
								id: that.orderId
							}).then(res => {
								console.log(res)
								if (res.statusCode == 200 && res.data.errorCode == 0) {
									uni.redirectTo({
										url:'../orderList'
									})
									uni.showToast({
										title: '取消订单成功',
									})
								} else {
									uni.showToast({
										title: '取消订单失败',
										icon: 'none'
									})
								}
							}).catch(err => {
								console.log(err)
							})
						} else if (res.cancel) {}
					}
				})
			},
			closePage() {
				uni.navigateBack({
					delta: 1
				});
			},
			goRotate() {
				uni.navigateTo({
					url:'./orderStatus/orderStatus?id='+this.orderId +'&user_id='+this.order.user_id+'&status='+this.status
				})
			},
			payment(){
				this.test.post('order/urgent_payment',{
					id:this.orderId
				}).then(res=>{
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.disabled = !this.disabled;
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		computed: {
			oilPrice() {
				return parseFloat(this.order.oil_price*this.order.count).toFixed(2)
			},
			orderPrice(){
				return (parseFloat(this.oilPrice) + parseFloat(this.delivery)).toFixed(2)
			},
			discounts(){
				return (((this.order.market_price - this.order.oil_price)/this.order.market_price)*100).toFixed(2)
			},
			delivery(){
				return (this.order.ship_price*this.order.ship_dis).toFixed(2)
			}
		},
		components: {
			tButton,
			mButton,
			// wPicker
		}
	}
</script>

<style>
	.detailsProcess {
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		align-self: center;
		padding: 12px 15px 11px;
		margin-top: 10px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
	}

	.processText {
		flex: 1;
		font-size: 14px;
		color: #00A8FF;
	}

	.processText view {
		margin-bottom: 4px;
	}

	.detailsProcess image {
		width: 12px;
		height: 12px;
	}

	.imgs {
		transition: all 0.5s;
	}

	.go {
		transform: rotate(90deg);
		transition: all 0.5s;
	}
</style>
