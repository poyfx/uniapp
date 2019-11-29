<template>
	<view class="">
		<view class="self_header_bar">
			<view class="top_view"></view>
		</view>
		<view class="title_content">
			<view class="flex self_header_title">
				<view class="leftBtn" @tap="back">
					<uni-icons type="arrowleft" size="27"></uni-icons>
				</view>
				<view>发票详情</view>
				<!-- <view class="takecode" v-show="status == 2">
					提油码 @tap="getCode"
				</view> -->
			</view>
		</view>

		<view class="chooseAddress">
			<view class="content">
				<view class="fget-num paddingLeft15 confirmed_content mB10" :class="{refuse:isrefuse}">
					<view class="flex  m-info">
						<view class="flex center m-info-content ">
							<text>发票状态</text>
							<view class="confirmed_status">
								<text class="state" v-if="reserveInfo.status == 0">未领取</text>
								<text class=" j" v-else-if="reserveInfo.status == 1">已领取</text>
							</view>

						</view>
					</view>


					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>订单编号</text>
							<view>{{reserveInfo.no}}</view>
						</view>
					</view>

					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>下单时间</text>
							<view>{{time}}</view>
						</view>
					</view>


				</view>

				<view class="fget-num paddingLeft15 confirmed_content mB10" :class="{refuse:isrefuse}">
					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>发票抬头</text>
							<view> <text>{{reserveInfo.name}}</text> </view>
						</view>
					</view>
					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>发票类型</text>
							<view> <text>{{reserveInfo.invoice_type}}</text> </view>
						</view>
					</view>
					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>油品种类</text>
							<view> <text>{{reserveInfo.oil_type}}</text> </view>
						</view>
					</view>
					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>购买数量</text>
							<view> <text>{{reserveInfo.count}}吨</text> </view>
						</view>
					</view>
					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>油品单价</text>
							<view> <text>{{reserveInfo.oil_price}}/吨</text> </view>
						</view>
					</view>
					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>总金额</text>
							<view> <text class="s">￥{{reserveInfo.total_money}}</text> </view>
						</view>
					</view>

				</view>

				<view class="fget-num paddingLeft15 confirmed_content" :class="{refuse:isrefuse}">
					<view class="flex  m-info">
						<view class="flex center m-info-content">
							<text>是否拆分</text>
							<view> <text>{{reserveInfo.is_invoice}}</text> </view>
						</view>
					</view>
					<view class="flex  m-info" v-show="reserveInfo.is_invoice == '是'">
						<view class="flex center m-info-content">
							<text>拆分数量</text>
							<view> <text>{{reserveInfo.invoice_count}}</text> </view>
						</view>
					</view>
					<view class="flex  m-info" v-for="(item, index) in reserveInfo.spilt_money" :key="index" v-show="reserveInfo.is_invoice == '是'">
						<view class="flex center m-info-content">
							<text>发票&nbsp;{{index+1}}</text>
							<view> <text class="s">￥{{item}}</text> </view>
						</view>
					</view>


				</view>


				<view class="invoice_btnbox flex" v-show="reserveInfo.status== 0">
					<button type="primary" @tap="apply(0)" v-if="reserveInfo.is_instead == 0">申请代领人</button>
					<button class="exchange" type="primary" @tap="apply(1)" v-else>更换代领人</button>
				</view>
				<view class="invoice_btnboxs flex">

				</view>
			</view>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				disabled: true,
				right: true,
				rId: '', //reserveId
				oId: '', //orderId
				reserveInfo: '', //所有详情参数
				showAddress: false,
				time: '',
				isrefuse: false,
				get_type: '',
			}
		},
		onLoad(option) {
			this.rId = option.id;
			this.oId = option.no;
			this.getReserveOilList();
		},
		methods: {
			getReserveOilList() {
				console.log(this.rId)
				this.test.post('order/query_InvoiceById', {
					id: this.rId,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.reserveInfo = res.data.value;
						console.log(this.reserveInfo)
						this.time = new Date(this.reserveInfo.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
							/-/g, '-');
						 // this.reserveInfo.spilt_money.map(el=>{
							//  console.log(JSON.stringify(el))
							// var str =  JSON.stringify(el).match(/aaa(\S*)fff/)[1];
							// console.log(str)
						 // })

					}
				}).catch(err => {
					console.log(err)
				})
			},
			close() {
				uni.redirectTo({
					url: '../reserveOilList'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1,
					"animationType": "pop-out",
					"animationDuration": 200,
				})
			},
			apply(x) {
				const that = this;
				if (x !== 0) {
					uni.showModal({
						title: '提示',
						content: '如果再次申请代领人，之前的代领人则无法领取发票',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../../reserveOilList/confirmed/replaceMan/replaceMan?name=' + 'invoice' + '&no=' + that.oId + '&id=' +
										that.rId
								})
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '../../reserveOilList/confirmed/replaceMan/replaceMan?name=' + 'invoice' + '&no=' + this.oId + '&id=' +
							this.rId
					})
				}

			},
		},
	}
</script>

<style scoped>
	.chooseAddress {
		/* position: absolute;
		top: 0;
		left: 0;
		z-index: 9999; */
		width: 100%;
		height: 100%;
		background-color: #EFEFF4;
	}

	.m-info {
		padding: 12px 0;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}

	.m-info-content {
		justify-content: flex-start;
	}

	.m-info-content view {
		color: #616161;
	}

	.m-info text {
		width: 4rem;
	}

	.m-info image {
		width: 12px;
		height: 12px;
		padding-right: 15px;
	}

	.refuse {
		margin: 0;
		padding: 0 0 0 15px;
	}

	.takecode {
		position: absolute;
		right: 15px;
		font-size: 16px;
	}

	.invoice_btnbox,
	.invoice_btnboxs {
		width: 100%;
		margin: 24px 0 15px;
	}

	.invoice_btnbox button {
		width: 90%;
		background-color: #00A8FF;
	}

	.invoice_btnboxs button {
		width: 90%;
		background-color: #F5F5F5;
		color: #9E9E9E;
	}
	.invoice_btnbox .exchange{
		background-color: #fff;
		color: #616161;
		box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
	}
</style>
