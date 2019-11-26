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
				<view style="font-size:40upx">发票列表</view>
				<view style="padding-right:5px ;"></view><!-- 搜索 @tap="searchs"-->
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
					 :placeholder="'placeholder'" :initValue="'全部发票'" @change="changeMsg">
					</selects>

				</view>
			</view>
		</view>


		<view class="mContent list_content">
			<view class="fget-num orderList" v-for="(item,index) in oil" :key="item.reserve_id" @touchmove="hidetitle" @touchend="showtitle">
				<view class="stateBox flex" @tap="reserveList(index)">
					<view class="">
						<view>
							<text>订单编号：</text>
							<text>{{item.no}}</text>
						</view>
						<view>
							<text>提油时间：</text>
							<text>{{time[index]}}</text>
						</view>
						<view>
							<text>发票金额：</text>
							<text class="s" style="font-weight: 550;">￥{{item.total_money}}</text>
						</view>

					</view>
					<view class="flex invoiceStatus" style="">

						<text class="invoiceListState state" v-if="item.status==0">未领取</text>
						<text class="invoiceListState s " v-if="item.status== 1">已领取</text>
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
						value: "全部发票",
						label: 0
					},
					{
						value: "已领取",
						label: 1
					},
					{
						value: "未领取",
						label: -1
					},

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
			this.getReserveList();
		},
		methods: {
			getReserveList() {
				this.test.post('order/listInvoices', {
					no: this.no,
					status: this.status,
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
						console.log(this.oil)
						this.time = [];
						this.oil.forEach(el => {
							this.time.push(new Date(el.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
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
			reserveList(idx) {
				uni.navigateTo({
					url: 'receiveIntaile/receiveIntaile?id=' + this.oil[idx].id + '&no=' + this.oil[idx].no,
				})

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
	.invoiceStatus {
		flex-direction: column;
		align-items: flex-end;
		padding: 10px 0;
		justify-content: center;
	}

	.invoiceStatus text {
		margin: 5px 0;
	}

	.invoiceStatus .invoiceListState {
		padding: 8px 13px;
		font-size: 0.95rem;
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
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
