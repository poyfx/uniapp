<template>
	<view>
		<view class="mContent">
			
				<view class="times">{{day}}</view>
				<view style="width: 120px;position: relative;display:inline-block; left: 34%; margin-top: 10px;">
					<selects :list="list" :clearable="false" :showItemNum="7" :listShow="false" :isCanInput="false" :style_Container="' font-size: 12px;'"
					 :placeholder="'placeholder'" :initValue="'预约单状态'">
					</selects>
				</view>
			

			<view class="fget-num orderList" @tap="orderDtails">
				<view class="stateBox">
					<view>
						<text class="orderListState state">等待价格</text>
						<text class="orderListState stay">待发油</text>
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
          </view>-->
				</view>
			</view>
			<view class="fget-num orderList">
				<view class="stateBox">
					<view>
						<text class="orderListState state">等待价格</text>
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
          </view>-->
				</view>
			</view>
			<view class="fget-num orderList">
				<view class="stateBox">
					<view>
						<text class="orderListState state oc">已取消</text>
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
          </view>-->
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
          </view>-->
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
          </view>-->
				</view>
			</view>
		</view>
		<view class="loading">
			<view>
				<img src="../../../static/img/loading.png" alt> &nbsp; 点击加载更多...
			</view>
		</view>
	</view>
</template>

<script>
// 	import selects from '../../../common/js/xfl-select.vue'
// 	export default {
// 		data() {
// 			return {
// 				list: [{
// 						value: "全部",
// 						label: 1
// 					},
// 					{
// 						value: "已取消",
// 						label: 2
// 					},
// 					{
// 						value: "已完成",
// 						label: 3
// 					},
// 					{
// 						value: "已发油",
// 						label: 4
// 					},
// 					{
// 						value: "待付款",
// 						label: 5
// 					},
// 					{
// 						value: "等待价格",
// 						label: 6
// 					},
// 					{
// 						value: "待确认收款",
// 						label: 7
// 					}
// 				],
// 				arr: [],
// 				day: ""
// 			}
// 		},
// 		onLoad(option) {
// 			this.day = option.times
// 			this.arr = option.data
// 			console.log(JSON.stringify(this.arr))
// 		},
// 		methods: {
// orderDtails(){
// 	uni.navigateTo({
// 		url:"../../orderList/orderDtails/orderDtails"
// 	})
// }
// 		},
// 		components: {
// 			selects
// 		},
// 		onNavigationBarButtonTap(e) {
// 			uni.navigateTo({
// 				url: "../search"
// 			})
// 		}
// 	}
</script>

<style>
	/* .times {
		display: inline-block;
		border-radius: 5px;
		padding: 4px 15px;
		background-color: #fff;
		text-align: center;
	} */
</style>
