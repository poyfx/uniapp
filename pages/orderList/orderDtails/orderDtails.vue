<template>
	<view>
		<view class="content" v-for="item in order" :key="item.id">
			<view class="timeOut">
				<!-- <timer endTime="172800" :callback="callback" endText="已经结束了"></timer> -->
				<text class="time">00:00:00</text>
				<text class="timeOver">订单自动取消</text>
			</view>
			<view class="fget-num detailsState">
				<view class="stateBox">
					<view class="state1 flex">
						<text>订单状态：</text>
						<view class="">
							<text v-if="item.status == -1">已拒绝</text>
							<text v-if="item.status == 2">已确认价格</text>
							<text v-if="item.status == 3">待付款</text>
							<text v-if="item.status == 4">待确认收款</text>
							<text v-if="item.status == 5">待开票</text>
							<text v-if="item.status == 9">已完成</text>
						</view>

					</view>
					<view class="state2 flex">
						<text>当前价格：</text>
						<view class="">
							<text>{{oil_price}}</text>/吨
						</view>

					</view>
					<view class="state2 flex">
						<text>市场定价：</text>
						<view class="">
							<text>{{market_price}}</text>/吨
						</view>


					</view>
				</view>
				<view class="discount">
					<view>已优惠</view>
					<text>10%</text>
				</view>
			</view>

			<view class="fget-num detailsProcess" @tap="goRotate">
				<view class="processText">
					<view class="">您的付款未到账，请稍后重新点击‘确认已付款’，让收款员继续查收</view>
					<view>{{dates}}</view>
				</view>


				<image :class="rotate ? 'go' : 'imgs'" src="../../../static/img/right.png" mode="aspectFit"></image>
			</view>

			<view class="fget-num">
				<view class="orderDetails">
					<view>
						<text>订单编号：</text>
						<text>{{item.order_sn}}</text>
					</view>
					<view>
						<text>下单时间：</text>
						<text>{{time}}</text>
					</view>
					<view>
						<text>购油单位：</text>
						<text>{{item.org_name}}</text>
					</view>
					<view>
						<text>油品类型：</text>
						<text>{{item.oil_type}}</text>
					</view>
					<view>
						<text>购油数量：</text>
						<text>{{item.count}}吨</text>
					</view>
					<view>
						<text>提油方式：</text>
						<text v-if="item.get_type ==0">配送</text>
					</view>
					<view>
						<text>送油地址：</text>

						<text>{{item.ship_addr}}</text>
					</view>
				</view>
			</view>
			<view class="pay">
				<view class="flex">
					<text>配送金额：</text>
					<view style="margin-left: 16px;"><text>￥100.00</text></view>
				</view>
				<view class="flex">
					<text>油品总金额：</text>
					<view class="">
						<text>￥540000.00</text>
					</view>

				</view>
				<view class="flex">
					<text>订单总金额：</text>
					<view class="">
						<text>￥540100.00</text>
					</view>

				</view>
			</view>

			<view class="m-two-btn mTop15 mB" v-if="item.status ==2 || item.status ==3">
				<button class="tButton cal" @tap="cancelOrder">取消订单</button>
				<tButton :type="type" class="tButton" :content="con2" @sureBuy="sureBuy(item.count)"></tButton>
			</view>
			<view class=" nextBox mTop15 mB" v-else-if="item.status ==-1 || item.status ==9">
				<mButton :type="btntype" :value="closed" @tell="closePage"></mButton>
			</view>

			<view class="nextBox mTop15 mB" v-else-if="item.status ==4  || item.status ==5">
				<mButton :type="btntype" :value="btnValue" @tell="tell"></mButton>
			</view>
		</view>
	</view>
</template>

<script>
	import tButton from '../../../components/twoButton/twoButton.vue'
	import mButton from '../../../components/m-button.vue'
	// import wPicker from '../../../common/js/w-picker.js'
	export default {
		data() {
			return {
				type1: "defult",
				type: "primary",
				con1: '取消订单',
				con2: '确认购买',
				btntype: 'primary',
				btnValue: '确认已付款',
				closed: '关闭',
				dates: '2019-08-12 08:12',
				rotate: false,
				orderId: '', //订单ID
				order: [],
				time:'',
			}
		},
		onLoad(option) {
			this.orderId = option.id;
			this.getOrderDtails();
		},
		methods: {
			getOrderDtails() {
				this.test.post('order/query_OrderById', {
					id: this.orderId
				}).then(res => {
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.order = res.data.value;
						this.order.forEach(el=>{
							this.time = new Date(el.create_time + 8*3600*1000).toJSON().substr(0, 16).replace('T', ' ').replace(/-/g, '-')
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			sureBuy(num) {
				uni.navigateTo({
					url: "../invoice/invoice?id=" + this.orderId + '&number=' + num
				})
			},
			tell() {
				uni.showToast({
					title: "已提醒财务确认,请耐心等待",
					icon: "none"
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
								if (res.statusCode == 200 && res.data.errorCode == 0) {
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
				this.rotate = !this.rotate
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
