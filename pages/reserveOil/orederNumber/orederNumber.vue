<template>
	<view>
		<view class="mContent">
			<view class="userIntegral mB10 bgcf borderRadius8" @tap="getOrderNumber" v-for="item in orderInfo" :key="item.id">
				<view class="orderNumber">
					<view><text class="numberTitle">订单编号:</text> <text>{{item.no}}</text></view>
					<view><text class="numberTitle">油品类型:</text> <text>{{item.oil_type}}</text></view>
					<view><text class="numberTitle">提油方式:</text> <text v-if="item.get_type == 0">配送</text><text v-else>自提</text></view>
				</view>
				<view class="integral">
					<text>剩余油量(吨)</text>
					<view>{{item.count}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				orderInfo: [],
			}
		},



		methods: {
			getorderNumberInfo() {
				this.test.post('http://192.168.0.156:8080/api/bizcust/order/query_orderSnInfo', {
					page: this.page,
					pageSize: this.pageSize,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.orderInfo = res.data.value
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getOrderNumber() {
				uni.navigateTo({
					url: "../" + this.url + "?ordernumber=" + this.ordernumber
				})
			}
		},
		onLoad(option) {
			this.url = option.url;
			this.getorderNumberInfo()
		}
	}
</script>

<style>

</style>
