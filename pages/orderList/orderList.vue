<template>
	<view>
		<view class="self_header_bar">
			<view class="top_view"></view>
		</view>
		<view class="title_content">
			<view class="flex title">
				<view class="left" @tap="back">
					<uni-icons type="arrowleft" size="27"></uni-icons>
				</view>

				<!-- <image src="../../../static/img/back.png" mode="aspectFit" ></image> -->
				<view style="font-size:40upx">订单列表</view>
				<view @tap="searchs" style="padding-right:5px ;">搜索</view>
			</view>
		</view>

		<!-- 订单状态查询和日期 -->
		<view class="status_days" ref="statusdays" :class="day?height95:height55" v-show="titleshow">
			<view class="mContent status_days_day" :class="showhide">
				<view class="times" v-show="day">
					<view class="times" style="padding: 10px 15px; ">{{day}}</view>
				</view>

				<view style="position: relative;box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16);">
					<selects :list="list" :clearable="true" :showItemNum="6" :listShow="false" :isCanInput="false" :style_Container="' border:none;'"
					 :placeholder="'placeholder'" :initValue="'全部订单'" @change="changeMsg">
					</selects>
				</view>
			</view>
		</view>

		<view class="mContent list_content">
			<view class="fget-num orderList" v-for="(item,index) in info" :key='item.id'>
				<view class="stateBox flex" @tap="orderDtails(item.status,item.id,item.no)" @touchmove="hidetitle" @touchend="showtitle">
					<view class="state-left">
						<view>
							订单编号：
							<text>{{item.no}}</text>
						</view>
						<view>
							下单时间：
							<text>{{time[index]}}</text><!--  -->
						</view>
						<view>
							油品类型：
							<text>{{item.oil_type}}</text>
						</view>
						<view>
							购油数量：
							<text>{{item.count}}吨</text>
						</view>
					</view>
					<view class="state-right" v-if='item.status == 1'>
						<view class="">
							<text class="orderListState state ">等待价格</text>
						</view>
					</view>

					<view class="state-right flex" v-else-if='item.status == 2'>
						<view class="">
							<text class="orderListState state ">已确认价格</text>
						</view>
						<view class="oilPrice flex">
							<text class="orderListState unit">总金额:</text>
							<text class="orderListState price">￥{{item.oil_price*item.count}}</text>
						</view>
					</view>

					<view class="state-right flex" v-else-if='item.status == 3'>
						<view class="">
							<text class="orderListState state ">待付款</text>
						</view>
						<view class="oilPrice flex">
							<text class="orderListState unit">总金额:</text>
							<text class="orderListState price">￥{{item.oil_price*item.count}}</text>
						</view>
					</view>

					<view class="state-right" v-if='item.status == -1'>
						<view class="">
							<text class="orderListState oc ">已取消</text>
						</view>
					</view>
					<view class="state-right" v-if='item.status == -2'>
						<view class="">
							<text class="orderListState oc ">超时已取消</text>
						</view>
					</view>
					<view class="state-right" v-if='item.status == 9'>
						<view class="">
							<text class="orderListState stay ">已完成</text>
						</view>
					</view>

					<view class="state-right" v-if='item.status == 4'>
						<view class="">
							<text class="orderListState state ">待确认收款</text>
						</view>
					</view>

					<view class="state-right" v-if='item.status == 5'>
						<view class="">
							<text class="orderListState state ">待开票</text>
						</view>
					</view>
				</view>
			</view>


		</view>
		<view class="loadings" @tap="more" v-show="showMore">
			<image src="../../static/img/loading.png" mode="aspectFit"></image> &nbsp; 点击加载更多...
		</view>
	</view>
</template>

<script>
	import selects from '../../common/js/xfl-select.vue'
	// import uniIcon from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				list: [{
						value: "全部订单",
						label: 0
					},
					{
						value: "已取消",
						label: -1
					},
					{
						value: "已完成 ",
						label: 9
					},
					{
						value: "待付款",
						label: 3
					},
					{
						value: "待开票",
						label: 5
					},
					{
						value: "已确认价格",
						label: 2
					},
					{
						value: "待确认收款",
						label: 4
					}
				],
				orderNumber: '', //订单编号
				buyTime: '', //下单时间
				oilType: '', //油品类型
				count: '', //购买数量
				info: [], //所有信息
				page: 1,
				pageSize: 10,
				status: 0,
				showMore: false,
				day: '',
				days: false,
				time: [],
				from: '',
				to: '',
				height95: 'height95',
				height55: 'height55',
				titleshow: true,
				showhide: '', //点击滑动样式
			}
		},
		onLoad(option) {
			this.showhide = '';
			this.day = option.times;
			this.to = option.to;
			this.from = option.from;
			this.orderNumber = option.ordernumber;
			this.getOrderListInfo();
		},
		methods: {
			//获取订单列表信息
			getOrderListInfo() {
				const that = this;
				if (this.from == undefined || this.from == '' || this.from == null) {
					this.from = ''
				};
				if (this.to == undefined || this.to == '' || this.to == null) {
					this.to = ''
				};
				if (this.orderNumber == undefined || this.orderNumber == '' || this.orderNumber == null) {
					this.orderNumber = ''
				};
				this.test.post('order/search_order', {
					start_time: this.from,
					end_time: this.to,
					status: this.status,
					no: this.orderNumber,
					page: this.page,
					pageSize: this.pageSize,
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						const data = res.data.value;
						// this.info = data (显示十条)
						data.forEach(el => {
							this.info.push(el);
						});
						this.time = [];
						this.info.forEach(el => {
							this.time.push(new Date(el.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
								/-/g, '-'))

						});
						if (data.length >= 10) {
							this.showMore = true;
						} else if (data.length < 10 && data.length > 0) {
							this.showMore = false;
						} else if (data.length <= 0) {
							this.showMore = false;
							return uni.showToast({
								title: '没有数据了',
								icon: "none",
								position: 'bottom',
							})
						};
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
							icon: "none",
							position:'bottom',
						})
					}
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: '加载失败',
						icon: 'none',
						position:'bottom',
					})
					console.log(err)
				})
			},
			orderDtails(status, id, order) {
				if (status == 1) {
					uni.showToast({
						title: '价格正在计算中,请稍等',
						icon: 'none',
						position:'bottom',
					})
				} else {
					uni.navigateTo({
						url: './orderDtails/orderDtails?id=' + id + '&no=' + order + '&status=' + status
					})
				}

			},
			changeMsg(e) {
				this.showMore = true;
				this.info = [];
				this.status = e.orignItem.label;
				this.page = 1;
				this.getOrderListInfo()
			},
			more() {
				this.page += 1;
				this.getOrderListInfo();
				uni.showLoading({
					title: '加载中...'
				})
			},
			back() {
				uni.switchTab({
					url: '../index/index',
				})
			},
			searchs() {
				uni.navigateTo({
					url: "../search/search?name=" + 'orderList'
				})
			},
			hidetitle() {

				console.log(this.$refs.statusdays)

				this.showhide = "hidetitles"
			},
			showtitle() {
				this.showhide = "showtitles"
			},
		},

		components: {
			selects,
			// uniIcon
		}
	}
</script>

<style>
	.title {
		width: 100%;
		height: 44px;
		padding: 7px 3px;
		box-sizing: border-box;
		/* background-color: black; */
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
		align-content: center;
		align-items: center;
		align-self: center;
		background-color: rgba(255, 255, 255, 1);
		justify-content: center;
		position: fixed;
		z-index: 998;
	}

	.title .left {
		width: 25px;
		height: 25px;
		margin-left: 5px;
		position: absolute;
		left: 10px;

	}

	.title view {
		font-size: 16px;
	}

	.title view:last-child {
		font-size: 14px;
		position: absolute;
		right: 8px;
	}

	.loadings {
		width: 100%;
		height: 49px;
		background-color: #fff;
		color: #999;
		text-align: center;
		line-height: 44px;
		position: relative;
		bottom: 0;
		left: 0;
	}

	.loadings image {
		width: 8px;
		height: 8px;
	}
</style>
