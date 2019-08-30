<template>
	<view>
		<view class="content">
			<view class="fget-num">
				<view class="orderDate">
					<view>选择日期</view>
					<view class="datetimesty">

						<view style="text-align: center;" @tap="bindChange">{{date}}</view>

						<w-picker mode="range" startYear="2019" endYear="2030" :defaultVal="[0,0,0,0,0,0,0]" :current="true" @confirm="onConfirm"
						 ref="range" themeColor="#f00"></w-picker>
					</view>

					<view>订单编号</view>
					<input type="text" v-model="ordernumber" value>
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
	import wPicker from "@/components/w-picker/w-picker.vue";
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
				pageSize: 10,
				resultInfo: {
					result: "2019-12-20 10:00:00"
				},
				 from:'',//第一个时间
				 to:'',//第二个时间
			};
		},
		onLoad(option) {
			this.name = option.name
		},
		methods: {
			bindChange() {
				this.$refs.range.show();
			},
			onConfirm(val) {
				console.log(val);
				this.date = val.result;
				this.from = val.from;
				this.to = val.to;
				
			},
			search() {
				if (this.date == '请选择时间') this.date = '';
				if (this.name == "orderList") {
					this.test.post('order/search_order', {
						no: this.ordernumber, //订单编号
						start_time: this.from,
						end_time: this.to,
						page: this.page,
						pageSize: this.pageSize,
					}).then(res => {
						console.log(res)
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							if (res.data.value.length <= 0) {
								uni.showToast({
									title: '没有找到相关的订单，请重新查询',
									icon: 'none',
								})
							} else if (res.data.value.length > 0) {
								uni.redirectTo({
									url: '../orderList/orderList?times=' + this.date + '&ordernumber=' + this.ordernumber
								})

							}
						}
					}).catch(err => {
						console.log(err)
					})
				} else if (this.name == "reserveOilList") {
					this.test.post('order/search_reserve', {
						no: this.ordernumber, //订单编号
						start_time: this.from,
						end_time: this.to,
						page: this.page,
						pageSize: this.pageSize,
					}).then(res => {
						console.log(res);
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							if (res.data.value.length <= 0) {
								uni.showToast({
									title: '没有找到相关的订单，请重新查询',
									icon: 'none'
								})
							} else if (res.data.value.length > 0) {
								uni.redirectTo({
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
			wPicker,
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
