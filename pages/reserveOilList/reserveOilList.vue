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
				<view style="font-size:40upx">提油记录</view>
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
			<view class="fget-num orderList" @tap="reserveList(item.reserve_id,item.no,item.status)" v-for="(item,index) in oil" :key="item.reserve_id"
			 @touchmove="hidetitle" @touchend="showtitle">
				<view class="stateBox flex">
					<view class="">
						<view>
							<text>订单编号：</text>
							<text>{{item.r_no}}</text>
						</view>
						<view v-if="item.status==7">
							<text>冲销时间：</text>
							<text>{{time[index]}}</text>
						</view>
						<view v-else>
							<text>提油时间：</text>
							<text>{{time[index]}}</text>
						</view>
						<view>
							<text>提油类型：</text>
							<text>{{item.oil_type}}</text>
						</view>
						<view>
							<text>提油数量：</text>
							<text>{{item.extract_num}} &nbsp;吨</text>
						</view>
						<!-- <view>
							<text>提油方式：</text>
							<text>{{item.get_type}}</text>

						</view> -->
						<view v-if="item.status==-1">
							<text>拒绝原因：</text>
							<text>{{item.denial_reason}}</text>
						</view>
					</view>
					<view class="flex reserveStatus" v-if='item.get_type=="配送"' style="flex-direction: column; align-items: flex-end;padding: 10px 0;">
						<text class="orderListState state " v-if="item.status==1">等待预约确认</text>
						<text class="orderListState state " v-else-if="item.status==2 ">预约已确认</text>
						<!-- <text class="orderListState state " v-if="item.status==3 ">待提油</text>
						<text class="orderListState state " v-if="item.status==4 ">已提油</text> -->
						<text class="orderListState oc " v-else-if="item.status==-1">已拒绝</text>
						<text class="orderListState oc " v-else-if="item.status==7">已冲销</text>
						<text class="orderListState s " v-else-if="item.status== 8">已取消</text>
						<text class="orderListState oP " v-else-if="item.status==9">已完成</text>
					</view>
					<view class="flex reserveStatus" v-else-if="item.get_type=='自提'" style="flex-direction: column; align-items: flex-end;padding: 10px 0;">
						<text class="orderListState state " v-if="item.status==1">等待预约确认</text>
						<text class="orderListState state " v-else-if="item.status==2 ">预约已确认</text>
						<!-- <text class="orderListState state " v-if="item.status==2 ">待提油</text> -->
						<!-- <text class="orderListState state " v-if="item.status==4 ">请确认收油</text> -->
						<text class="orderListState oc " v-else-if="item.status==7">已冲销</text>
						<text class="orderListState s " v-else-if="item.status==8 ">已取消</text>
						<text class="orderListState oc " v-else-if="item.status==-1">已拒绝</text>
						<text class="orderListState oP " v-else-if="item.status==9">已完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="loadings" @tap="Smore" v-show="more">
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
						value: "全部订单",
						label: 0
					},
					{
						value: "已拒绝",
						label: -1
					},
					{
						value: "等待预约确定",
						label: 1
					},
					{
						value: "预约已确定",
						label: 2
					},
					// {
					// 	value: "待提油",
					// 	label: 3
					// },
					// {
					// 	value: "已提油",
					// 	label: 4
					// },
					// {
					// 	value: "请确认收油",
					// 	label: 4
					// },
					{
						value: "已取消",
						label: 8
					},
					{
						value: "已完成",
						label: 9
					}
				],
				page: 1,
				pageSize: 10,
				oil: [], //所有订单
				more: false,
				status: '',
				time: '',
				day: '',
				no: '',
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
				this.test.post('reserve/search_reserve', {
					no: this.no,
					status: this.status,
					start_time: this.from,
					end_time: this.to,
					page: this.page,
					pageSize: this.pageSize,
				}).then(res => {
					console.log(res)
					uni.hideLoading();
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
						if (res.data.value.length >= 10) {
							this.more = true;
						} else if (res.data.value.length < 10 && res.data.value.length > 0) {
							this.more = false;
						} else if (res.data.value.length == 0) {
							this.more = false;
							uni.showToast({
								title: '没有更多了',
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
							icon: 'none',
							position: 'bottom',
						})
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: '加载失败',
						icon: 'none',
						position: 'bottom',
					})
					console.log(err)
				})
			},
			reserveList(rId, oId,stu) {
				if (stu == 7) {
					return 
				}else if(stu !== 1){
					uni.navigateTo({
						url: 'confirmed/confirmed?reserve_id=' + rId + '&no=' + oId,
					})
				}else{
					uni.showToast({
						title:'预约确认中...',
						icon:'none',
						position:'bottom',
						duration:1500,
					})
				}

			},
			complete() {
				// this.$router.push('/complete');
			},
			changeMsg(e) {
				uni.showLoading({
					title: '加载中...'
				})
				console.log(e)
				this.more = true;
				this.oil = [];
				this.page = 1;
				this.status = e.orignItem.label;
				this.getReserveList();

			},
			Smore() {
				uni.showLoading({
					title: '加载中...'
				})
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
			hidetitle() {

				console.log(this.$refs.statusdays)

				this.showhide = "hidetitles"
			},
			showtitle() {

				this.showhide = "showtitles"
			},
		},

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
