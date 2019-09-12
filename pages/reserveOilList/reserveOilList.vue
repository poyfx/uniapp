<template>
	<view>
		<view class="status_bar">

		</view>
		<view class="flex title">
			<view class="left" @tap="back">
				<uni-icon type="arrowleft" size="27"></uni-icon>
			</view>

			<!-- <image src="../../../static/img/back.png" mode="aspectFit" ></image> -->
			<view>提油记录</view>
			<view @tap="searchs" style="padding-right:5px ;">搜索</view>
		</view>
		<view class="select_day">
			<view class="times" v-show="day">
				<view class="times" style="padding: 4px 15px; position: absolute; left:3%; top: 10px; display:inline-block;">{{day}}</view>
			</view>
			<view style="width: 120px;position: absolute; right:3%; top: 10px; display:inline-block;">
				<selects :list="list" :clearable="false" :showItemNum="6" :listShow="false" :isCanInput="false" :style_Container="' font-size: 12px;'"
				 :placeholder="'placeholder'" :initValue="'预约单状态'" @change="changeMsg">
				</selects>
			</view>
		</view>


		<view class="mContent" style=" padding-top: 0px;">
			<!-- <view class="times" v-show="day">
				<view style="padding: 4px 15px;position: absolute; left:3%; top: 10px; display:inline-block;">{{day}}</view>
			</view> -->

			<view class="fget-num orderList" @tap="reserveList(item.reserve_id,item.no)" v-for="(item,index) in oil" :key="item.reserve_id">
				<view class="stateBox flex">
					<view class="">
						<view>
							<text>订单编号：</text>
							<text>{{item.r_no}}</text>
						</view>
						<view>
							<text>提油时间：</text>
							<text>{{time[index]}}</text>
						</view>
						<view>
							<text>提油类型：</text>
							<text>{{item.oil_type}}</text>
						</view>
						<view>
							<text>购油数量：</text>
							<text>{{item.extract_num}} &nbsp;吨</text>
						</view>
						<view>
							<text>提油方式：</text>
							<text>{{item.get_type}}</text>

						</view>
						<view v-if="item.status==-1">
							<text>拒绝原因：</text>
							<text>油库没油</text>
						</view>
					</view>
					<view class="flex reserveStatus" v-if='item.get_type=="配送"' style="flex-direction: column; align-items: flex-end;padding: 10px 0;">
						<text class="orderListState state " v-if="item.status==1">等待预约确认</text>
						<text class="orderListState state " v-if="item.status==2 ">预约已确认</text>
						<text class="orderListState state " v-if="item.status==2 ">待发油</text>
						<text class="orderListState state " v-if="item.status==3 ">已发油</text>
						<text class="orderListState state " v-if="item.status==3 ">待收油</text>
						<text class="orderListState oc " v-if="item.status==-1">已拒绝</text>
						<text class="orderListState state " v-if="item.status==9">已完成</text>
					</view>
					<view class="flex reserveStatus" v-else-if="item.get_type=='自提'" style="flex-direction: column; align-items: flex-end;padding: 10px 0;">
						<text class="orderListState state " v-if="item.status==1">等待预约确认</text>
						<text class="orderListState state " v-if="item.status==2 ">预约已确认</text>
						<text class="orderListState state " v-if="item.status==2 ">待提油</text>
						<text class="orderListState state " v-if="item.status==3 ">已提油</text>
						<text class="orderListState oc " v-if="item.status==-1">已拒绝</text>
						<text class="orderListState state " v-if="item.status==9">已完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="loading" @tap="Smore" v-show="more">
			<view>
				<img src="../../static/img/loading.png" alt> &nbsp; 点击加载更多...
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
						value: "已拒绝",
						label: -1
					},
					{
						value: "已发油",
						label: 5
					},
					{
						value: "已完成",
						label: 9
					},
					{
						value: "预约已确定",
						label: 4
					},
					{
						value: "等待预约确定",
						label: 1
					}
				],
				page: 1,
				pageSize: 10,
				oil: [], //所有订单
				more: true,
				status: '',
				time: '',
				day: '',
				no: '',
				from: '',
				to: '',
			}
		},
		onLoad(option) {
			this.to = option.to;
			this.from = option.from;
			this.no = option.ordernumber;
			this.day = option.times;
			this.getReserveList(this.no);
		},
		methods: {
			getReserveList() {
				if (this.from == undefined || this.from == '' || this.from == null) {
					this.from = ''
				};
				if (this.to == undefined || this.to == '' || this.to == null) {
					this.to = ''
				};
				if (this.no == undefined || this.no == '' || this.no == null) {
					this.no = ''
				};
				this.test.post('order/search_reserve', {
					no: this.no,
					status: this.status,
					start_time: this.from,
					end_time: this.to,
					page: this.page,
					pageSize: this.pageSize,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						// this.oil = res.data.value;
						res.data.value.forEach(el => {
							this.oil.push(el)
						})
						this.time = [];
						this.oil.forEach(el => {
							this.time.push(new Date(el.reserve_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
								/-/g, '-'))
						})
						if (res.data.value.length < 10 && res.data.value.length > 0) {
							this.more = false;
						} else if (res.data.value.length == 0) {
							this.more = false;
							uni.showToast({
								title: '没有更多了',
								icon: "none",
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
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			reserveList(rId, oId) {
				uni.navigateTo({
					url: 'confirmed/confirmed?reserve_id=' + rId + '&no=' + oId,
				})
			},
			complete() {
				// this.$router.push('/complete');
			},
			changeMsg(e) {
				this.oil = [];
				this.page = 1;
				this.status = e.orignItem.label;
				this.getReserveList();

			},
			Smore() {
				this.page += 1;
				this.getReserveList();
			},
			searchs() {
				uni.navigateTo({
					url: "../search/search?name=" + 'reserveOilList'
				})
			},
			back() {
				uni.switchTab({
					url: '../index/index',
				})
			},
		},
		// onNavigationBarButtonTap(e) {
		// 	
		// },
		components: {
			selects
		}
	}
</script>

<style>
	.reserveStatus text {
		margin: 5px 0;
	}

	.select_day {
		position: relative;
		width: 100%;
		height: 40px;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #e5e5e5;

	}

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
		background-color: rgba(255, 255, 255, 0.8);
		justify-content: center;
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
</style>
