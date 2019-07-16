<template>
	<view>
		<div class="content">
			<div class="fget-num">
				<div class="orderDate">
					<p>选择日期</p>
					<div class="datetime" @click="selectData">{{day}}</div>
					<p>订单编号</p>
					<input type="number" v-model="ordernumber" value>
				</div>
			</div>
			<div class="nextBox">
				<mt-button class="btn" type="primary" size="large" @click.native="search">查询</mt-button>
			</div>
		</div>
		<mt-datetime-picker ref="datePicker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月"
		 date-format="{value} 日" :startDate="stateDate" @confirm="handleConfirm"></mt-datetime-picker>
	</view>
</template>

<script>

	import {
		DatetimePicker
	} from "../../mint-ui";
	import {
		formatDate
	} from "../../static/js/date.js";
	export default {
		data() {
			return {
				title: "订单搜索",
				ordernumber: '',
				home: "home",
				day: "",
				pickerVisible: "",
				date: "",
				stateDate: new Date()
			};
		},
		mounted() {
			this.date = new Date();
			this.day = formatDate(this.date);
		},
		methods: {
			selectData() {
				if (this.selectdValue) {
					this.pickerVisible = this.selectedValue;
				} else {
					this.pickerVisible = this.date;
				}
				this.$refs.datePicker.open();
			},
			handleConfirm() {
				this.day = formatDate(this.pickerVisible);
			},
			search() {
				uni.navigateTo({
					url:'searchDateList/searchDateList?times='+this.day
				})
				// console.log(this.day)
				// this.$router.push({
				// 	path: '/searchDateList',
				// 	query: {
				// 		date: this.day,
				// 		number: this.ordernumber
				// 	}
				// })
			}
		},
	}
</script>

<style scoped>
.orderDate {
  padding: 10px 15px 24px;
}
.orderDate input,
.datetime {
  width: 100%;
  height: 42px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin: 10px 0;
  padding-left: 10px;
  background-color: #fff;
  text-align: center;
  line-height: 42px;
  box-sizing: border-box;
}
</style>
