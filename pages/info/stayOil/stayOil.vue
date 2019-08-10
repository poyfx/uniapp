<template>
	<view>
		<view class="mContent pB10" style="margin-bottom: 50px;">
			<view class="userIntegral mTop10 bgcf  borderRadius8" @tap="getOrderNumber" v-for="(item,index) in orderInfo" :key="item.id">
				<view class="orderNumber">
					<view><text class="numberTitle">订单编号:</text> <text>{{item.order_sn}}</text></view>
					<view><text class="numberTitle">油品类型:</text> <text>{{item.oil_type}}</text></view>
					<view><text class="numberTitle">提油方式:</text> <text v-if="item.get_type == 0">配送</text><text v-else>自提</text></view>
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
				orderInfo: [],
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
						this.orderInfo = res.data.value
						if (res.data.value.length < 10 && res.data.value.length > 0) {
							this.more = false;
						} else if (res.data.value.length == 0) {
							this.more = false;
							uni.showToast({
								title: '没有更多了',
								icon: "none"
							})
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getOrderNumber() {
				if (this.role == 2 || this.role == 3) {
					uni.navigateTo({
						url: "../../reserveOilList/confirmed/oliCode/oliCode"
					})
				}else{
					uni.showToast({
						title:'权限不够，请在用户信息界面申请权限',
						icon:'none'
					})
				}

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
