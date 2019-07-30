<template>
	<view>
		<view class="mContent">
			<!-- <el-select v-model="value" size="mini" style="width:120px;left:66%">
				<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
			</el-select> -->
			<view style="width: 120px;position: relative; left: 66%;">
				<selects :list="list" :clearable="true" :showItemNum="6" :listShow="false" :isCanInput="false" :style_Container="' font-size: 12px;'"
				 :placeholder="'placeholder'" :initValue="'全部订单'">
				</selects>
			</view>
			<view class="fget-num orderList" @tap="orderDtails">
				<view class="stateBox">
					<view>
						<text class="orderListState state ">等待价格</text>
						<text class="orderListState stay ">待发油</text>
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
          </view> -->
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
				<!-- <img src="" alt> --><image src="../../static/img/loading.png" mode="aspectFit"></image> &nbsp; 点击加载更多...
		</view>
	</view>
	</view>
</template>

<script>
	import selects from '../../common/js/xfl-select.vue'
	export default {
		data() {
			return {
				list: [{
						value: "全部",
						label: 1
					},
					{
						value: "已取消",
						label: 2
					},
					{
						value: "已完成 ",
						label: 3
					},
					{
						value: "待付款",
						label: 4
					},
					{
						value: "已确认价格",
						label: 5
					},
					{
						value: "待财务确认收款",
						label: 6
					}
				]
			}
		},
		methods: {
			orderDtails(){
				uni.navigateTo({
					url:'./orderDtails/orderDtails'
				})
			},
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			uni.navigateTo({
				url: "../search/search"
			})
		},
		components: {
			selects
		}
	}
</script>

<style>

</style>
