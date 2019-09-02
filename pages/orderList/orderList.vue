<template>
	<view>
		<view class="" style="position: relative; width: 100%;height: 25px;padding: 15px 0 10px 0;">
				<view class="times" v-show="day">
					<view class="times" style="padding: 4px 15px; position: absolute; left:3%; top: 10px; display:inline-block;">{{day}}</view>
				</view>

				<view style="width: 120px;position: absolute; right:3%; top: 10px; display:inline-block;">
					<selects :list="list" :clearable="true" :showItemNum="6" :listShow="false" :isCanInput="false" :style_Container="' font-size: 12px;'"
					 :placeholder="'placeholder'" :initValue="'全部订单'" @change="changeMsg">
					</selects>
				</view>
			</view>
		<view class="mContent" style="margin-bottom: 50px;">
			

			<view class="fget-num orderList"  v-for="(item,index) in info" :key='item.id'>
				<view class="stateBox flex"  @tap="orderDtails(item.status,item.id,item.no)">
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
							<text>{{item.count}}</text>
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
							<text class="orderListState unit">单价:</text>
							<text class="orderListState price">{{item.oil_price}}/吨</text>
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
							<text class="orderListState state ">已完成</text>
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

			<view class="loading" @tap="more" v-show="showMore">
				<image src="../../static/img/loading.png" mode="aspectFit"></image> &nbsp; 点击加载更多...
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
				from:'',
				to:'',
			}
		},
		onLoad(option) {
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
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						const data = res.data.value;
						// this.info = data (显示十条)
						data.forEach(el=>{
							this.info.push(el);
						});
						this.time = [];
						this.info.forEach(el => {
							this.time.push(new Date(el.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(/-/g,'-')) 
							
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
								// success: function() {
								// 	that.page = 1
								// 	// that.getOrderListInfo()
								// }
							})
						};
					}else {
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
					}
				}).catch(err => {
					console.log(err)
				})
			},
			orderDtails(status, id, order) {
				if (status == 1) {
					uni.showToast({
						title: '价格正在计算中,请稍等',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: './orderDtails/orderDtails?id=' + id + '&no=' + order + '&status=' + status
					})
				}

			},
			changeMsg(e) {
				this.info = [];
				this.status = e.orignItem.label;
				this.page = 1;
				this.getOrderListInfo()
			},
			more() {
				this.page += 1;
				this.getOrderListInfo();
			},

		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "../search/search?name=" + 'orderList'
			})
		},
		components: {
			selects
		}
	}
</script>

<style>
	.loading {
		left: 0;
	}
</style>
