<template>
	<view>
		<view class="mContent pB10" style="margin-bottom: 50px;">
			<view class="mB10 bgcf  borderRadius8" v-for="item in orderInfo" :key="item.id" style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);">
				<!-- @tap="getOrderNumber(item.no,item.oil_remain)" -->
				<view class="userIntegral_company">
					<text>{{item.customer_name}}</text>
				</view>
				<view class="oilUserIntegral">
					<view class="orderNumber">
						<view><text class="numberTitle">订单编号:</text> <text>{{item.no}}</text></view>
						<view><text class="numberTitle">油品类型:</text> <text>{{item.oil_type}}</text></view>
					</view>
					<view class="integral">
						<text>剩余油量(吨)</text>
						<view>{{item.oil_remain}}</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="loading" @tap="Smore" v-show="more">
			<view>
				<img src="../../../static/img/loading.png" alt /> &nbsp; 点击加载更多...
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				ordernumber: "2132134564646",
				type: '95#乙醇汽油',
				mode: "配送",
				title: "选择单号",
				url: '',
				page: 1,
				pageSize: 10,
				orderInfo: [], //总油量
				more: false,
			}
		},
		methods: {
			//获取订单编号
			getorderNumberInfo() {
				this.test.post('reserve/query_orderSnInfo', {
					page: this.page,
					pageSize: this.pageSize,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						// this.orderInfo = res.data.value
						res.data.value.forEach(el => {
							this.orderInfo.push(el)
						})

						if (res.data.value.length < 10 && res.data.value.length > 0) {
							this.more = false;
						} else if (res.data.value.length == 0) {
							this.more = false;
							uni.showToast({
								title: '没有更多了',
								icon: "none",
								position:'bottom',
							})
						}
					} else if (res.data.errorCode == -10001 || res.data.errorCode == -10002 || res.data.errorCode == -10003) {
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
					}else if(res.data.errorCode == -10000 ){
						console.log(1)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none",
							position: 'bottom'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getOrderNumber(sn, oli) {
				uni.navigateTo({
					url: "./oilCodeDetali/oilCodeDetali?no=" + sn + '&oil_remain=' + oli
				})


			},
			Smore() {
				this.page += 1;
				this.getorderNumberInfo()
			},
		},
		onLoad(option) {
			this.url = option.url;
			this.getorderNumberInfo();
		},
		computed: {
			...mapState(['role'])
		},
	}
</script>

<style scoped>
.oilUserIntegral{
	width: 100%;
	min-height: 78px;
	/* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16); */
	display: flex;
	justify-content: space-between;
}
.oilUserIntegral .orderNumber {
	padding-right: 5px;
	width: 100%;
	margin: 3px 0 6px 10px;
}

.orderNumber view {
	padding: 3px;
	margin: 5px 0;
}

.orderNumber view .numberTitle {
	font-size: 14px;
	/* font-weight: bold;
	color: #616161; */
	margin-right: 8px;
}

.orderNumber view text {
	font-size: 14px;
}
.oilUserIntegral .integral {
	min-width: 118px;
	min-height: 78px;
	max-width: 125px;
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
	align-self: center;
	justify-content: center;
	padding: 6px 0;
	border-radius: 0 8px 8px 0;
	border-left: 1px solid #e5e5e5;
}
.oilUserIntegral .integral view {
	color: #00A8FF;
	font-size: 0.85rem;
	/* text-shadow: 1px 2px 0 rgba(0, 0, 0, 0.16);
	font-weight: 550; */
}

.oilUserIntegral .integral text {
	color: #9E9E9E;
	font-size: 0.65rem;
	margin-bottom: 8px;
}
</style>
