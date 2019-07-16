<template>
	<view>
		<view class="mContent">
			<view style="width: 120px;position: relative; left: 66%;">
				<selects :list="list" :clearable="false" :showItemNum="6" :listShow="false" :isCanInput="false" :style_Container="' font-size: 12px;'"
				 :placeholder="'placeholder'" :initValue="'预约单状态'">
				</selects>
			</view>
			<view class="fget-num orderList" @click="reserveList">
				<view class="stateBox">
					<view>
						<text class="orderListState state ">等待预约确认</text>
						<text class="orderListState stay "></text>

					</view>

					<view>
						订单编号：
						<text>2817273654213</text>
					</view>
					<view>
						预约时间：
						<text>2019-12-12 20:20</text>
					</view>
					<view>
						提油类型：
						<text>92#乙醇汽油</text>
					</view>
					<view>
						购油数量：
						<text>90.00000吨</text>
					</view>
					<view>
						提油方式：
						<text>配送</text>
					</view>
				</view>
			</view>
			<view class="fget-num orderList" @click="complete">
				<view class="stateBox">
					<view>
						<text class="orderListState state oc">已拒绝</text>
					</view>
					<view>
						订单编号：
						<text>2817273654213</text>
					</view>
					<view>
						预约时间：
						<text>2019-12-12 20:20</text>
					</view>
					<view>
						油品类型：
						<text>92#乙醇汽油</text>
					</view>
					<view>
						提油数量：
						<text>90.00000吨</text>
					</view>
					<view>
						提油方式：
						<text>配送</text>
					</view>
					<view>
						原因
						<text>油库没油了</text>
					</view>
				</view>
			</view>
			<view class="fget-num orderList">
				<view class="stateBox">
					<view>
						<text class="orderListState state">待付款</text>
						<text class="orderListState unit">单价:</text>
						<text class="orderListState price">￥7900/吨</text>
					</view>
					<view>
						订单编号：
						<text>2817273654213</text>
					</view>
					<view>
						下单时间：
						<text>2019-12-12 20:20</text>
					</view>
					<view>
						油品类型：
						<text>92#乙醇汽油</text>
					</view>
					<view>
						购油数量：
						<text>90.00000吨</text>
					</view>
					<!-- <view>
            提油方式：
            <text>配送</text>
          </view> -->
				</view>
			</view>
			<view class="fget-num orderList">
				<view class="stateBox">
					<view>
						<text class="orderListState state">待付款</text>
						<text class="orderListState unit">单价:</text>
						<text class="orderListState price">￥7900/吨</text>
					</view>
					<view>
						订单编号：
						<text>2817273654213</text>
					</view>
					<view>
						下单时间：
						<text>2019-12-12 20:20</text>
					</view>
					<view>
						油品类型：
						<text>92#乙醇汽油</text>
					</view>
					<view>
						购油数量：
						<text>90.00000吨</text>
					</view>
					<!-- <view>
            提油方式：
            <text>配送</text>
          </view> -->
				</view>
			</view>

		</view>
		<view class="loading">
			<view>
				<img src="../../static/img/loading.png" alt> &nbsp; 点击加载更多...
			</view>
		</view>
	</view>
</template>

<script>
	import selects from '../../static/js/xfl-select.vue'
	export default {
		data() {
			return {
				list: [{
						value:"全部" ,
						label: 1
					},
					{
						value:"已拒绝" ,
						label:2 
					},
					{
						value:"已发油",
						label: 3 
					},
					{
						value:  "已完成",
						label:4
					},
					{
						value: "预约已确定",
						label: 5
					},
					{
						value: "等待预约确定",
						label:6 
					}
				]
			}
		},
		methods: {
			reserveList() {
				uni.navigateTo({
					url:'confirmed/confirmed'
				})
			},
			complete() {
				// this.$router.push('/complete');
			}
		},
		components:{
			selects
		}
	}
</script>

<style>

</style>
