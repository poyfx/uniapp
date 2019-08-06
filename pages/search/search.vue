<template>
	<view>
		<view class="content">
			<view class="fget-num">
				<view class="orderDate">
					<view>选择日期</view>
					<view class="datetimesty">
						<picker mode="date" :value="values" :start="startDate" :end="endDate" @change="bindChange">
							<view style="text-align: center;">{{date}}</view>
						</picker>
						<!-- <ruiDatePicker class="datetime" fields="day" start="2010-00-00" end="2030-12-31" :value="values" @change="bindChange" ></ruiDatePicker> -->
					</view>

					<view>订单编号</view>
					<input type="number" v-model="ordernumber" value>
				</view>
			</view>
			<view class="nextBox">
				<mButton :type="btnType" :value="btnValue" @search="search"></mButton>

			</view>
		</view>

	</view>
</template>

<script>
	import {
		formatDate
	} from "../../common/js/date.js"
	import ruiDatePicker from '../../rattenking-dtpicker/rattenking-dtpicker.vue'
	import mButton from '../../components/m-button.vue'
	export default {
		data() {
			return {
				ordernumber: '',
				date: "请选择时间",
				values: '',
				btnType: 'primary',
				btnValue: "查询",
				startDate: '2010-00-00',
				endDate: '2030-12-31',
				name: '', //区分页面
				page: 1,
				pageSize: 10
			};
		},
		onLoad(option) {
			this.name = option.name
		},
		methods: {
			bindChange(val) {
				this.date = val.detail.value
			},
			search() {
				if (this.name == "orderList") {
					this.test.post('order/search_order', {
						order_sn: this.ordernumber, //订单编号
						start_time: this.date,
						end_time: this.date,
						page: this.page,
						pageSize: this.pageSize,
					}).then(res => {
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							if (res.data.value.length <= 0) {
								uni.showToast({
									title: '搜索失败,订单编号无效或日期不正确',
									icon: 'none',
								})
							} else if (res.data.value.length > 0) {
								uni.navigateTo({
									url: '../orderList/orderList?times=' + this.date + '&ordernumber=' + this.ordernumber
								})

							}
						}
					}).catch(err => {
						console.log(err)
					})
				} else if (this.name == "reserveOilList") {
					this.test.post('order/search_reserve', {
						order_sn: this.ordernumber, //订单编号
						start_time: this.date,
						end_time: this.date,
						page: this.page,
						pageSize: this.pageSize,
					}).then(res => {
						console.log(res);
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							if (res.data.value.length <= 0) {
								uni.showToast({
									title: '搜索失败,订单编号无效或日期不正确',
									icon: 'none'
								})
							} else if (res.data.value.length > 0) {
								uni.navigateTo({
									url: '../reserveOilList/reserveOilList?times=' + this.date + '&ordernumber=' + this.ordernumber
								})

							}
						}
					}).catch(err => {
						console.log(err)
					})
				}

			}
		},
		components: {
			ruiDatePicker,
			mButton
		},
	}
</script>

<style scoped>
	.orderDate {
		padding: 10px 15px 24px;
	}


	.orderDate input,
	.datetimesty {
		width: 100%;
		height: 42px;
		border: 1px solid #e5e5e5;
		border-radius: 5px;
		margin: 10px 0;
		padding-left: 10px;
		background-color: #fff;
		justify-content: center;
		line-height: 42px;
		box-sizing: border-box;
	}
</style>
