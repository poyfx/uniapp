<template>
	<view>
		<view class="mContent">
			<view class="userIntegral bgcf borderRadius8" @tap="getOrderNumber">
				<view class="orderNumber">
					<view><text class="numberTitle">订单编号:</text> <text>{{ordernumber}}</text></view>
					<view><text class="numberTitle">油品类型:</text> <text>{{type}}</text></view>
					<view><text class="numberTitle">提油方式:</text> <text>{{mode}}</text></view>
				</view>
				<view class="integral">
					<text>剩余油量(吨)</text>
					<view>2989</view>
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
				url:''
			}
		},
		methods: {
			getOrderNumber() {
				uni.navigateTo({
					url:"../" + this.url + "?ordernumber="+this.ordernumber
				})
			}
		},
		onLoad(option){
			this.url = option.url
		}
	}
</script>

<style>

</style>
