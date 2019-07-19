<template>
	<view>
		<view class="content">
			<view class="fget-num">
				<view class="orderDate">
					<view>选择日期</view>
					 <ruiDatePicker class="datetime" fields="day" start="2010-00-00" end="2030-12-31" :value="values" @change="bindChange"></ruiDatePicker>

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
	} from "../../static/js/date.js";
	import ruiDatePicker  from '../../rattenking-dtpicker/rattenking-dtpicker.vue'
	import mButton from  '../../components/m-button.vue'
	export default {
		data() {
			return {
				ordernumber: '',
				date: "",
				values: '',
				btnType:'primary',
				btnValue:"查询"
			};
		},
		onLoad() {
			this.date = new Date();
			this.values = formatDate(this.date);
		},
		methods: {
	
			bindChange(value){
				this.values = value
			},
			search() {
				uni.navigateTo({
					url:'searchDateList/searchDateList?times='+this.values
				})
			
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
.datetime {
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
