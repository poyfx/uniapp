<template>
	<view>
		<view class="mContent pB10" style="margin-bottom: 50px;">
			<view class="userIntegral mTop10 bgcf  borderRadius8" v-for="item in orderInfo" :key="item.id">
				<!-- @tap="getOrderNumber(item.no,item.oil_remain)" -->
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
				more: true,
			}
		},
		methods: {
			//获取订单编号
			getorderNumberInfo() {
				this.test.post('order/query_orderSnInfo', {
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

<style>

</style>
