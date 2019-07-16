<template>
	<view>
		<view class="nav">
			<view class="navbar">
				<navigator url="../../pages/order/order">
					<image src="../../static/img/buy.png" alt />
					</image>
					<text>下单购油</text>
				</navigator>
				<navigator url="../../pages/orderList/orderList">
					<image src="../../static/img/query.png" alt />
					</image>
					<text>订单查询</text>
				</navigator>
				<navigator url="../../pages/reserveOil/reserveOil">
					<image src="../../static/img/appointment.png" alt />
					</image>
					<text>预约提油</text>
				</navigator>
				<navigator url="../../pages/reserveOilList/reserveOilList">
					<image src="../../static/img/record.png" alt />
					</image>
					<text>提油记录</text>
				</navigator>
				<navigator>
					<image src="../../static/img/integral.png" alt />
					</image>
					<text>积分商城</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
