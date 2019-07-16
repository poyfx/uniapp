<template>
	<view>
		<view class="content">
			<view class="fget-num">
				<mt-field label="开票公司" placeholder="XXXXXXXXXX公司" v-model="company"></mt-field>
				<mt-field label="开票金额" placeholder="￥540000.00" v-model="money"></mt-field>
				<mt-field label="发票拆分" readonly>
					<mt-switch v-model="value" @change="showIncoice()"></mt-switch>
				</mt-field>
			</view>
			<view class="fget-num" style="margin-top: 10px" v-show="show">
				<mt-field label="拆分方式" placeholder="按数量"></mt-field>
				<mt-field label="当前购油数量" :value="all"></mt-field>
				<view class="splitCase underline">
					<view class="first-li" style="padding:10px 0 15px 15px; color: #666;" >拆分方案(单位:吨)</view>
					<view class="splitNum">
						<view class="invoiceMeth">
							<input type="text" v-model="num" placeholder="0">
							<img src="../../../static/img/add.png" @click="add" alt>
						</view>
						<view class="invoiceMeth">
							<input type="text" v-model="num1" placeholder="0">
							<img src="../../../static/img/move.png" alt>
						</view>
						<view v-show="move"></view>
					</view>
				</view>
				<mt-field label="剩余数量" placeholder="90.00000吨" v-model="surplus" style="border-top: 1px solid #e5e5e5;"></mt-field>
			</view>
			<view class="m-two-btn mTop15">
				<!-- <button @click="goDtails">无需发票</button>
        <button class="blue" @click="invoiceSure">确 &nbsp; &nbsp; 认</button> -->
				<button class="tButton cal" @click="cancelOrder">无需发票</button>
				<tButton :type="type" class="tButton" :content="con2"></tButton>
			</view>
		</view>
	</view>
</template>

<script>
	import tButton from '../../../components/twoButton/twoButton.vue'
	export default {
		data() {
			return {
				type: 'primary',
				con2: '确认',
				company: '',
				money: '',
				show: false,
				value: false,
				all: '90',
				num: '23.256',
				num1: '28.3369',
				move: false,
			}
		},
		methods: {
			showIncoice() {
				this.show = this.value;
			},
			add() {}
		},
		components: {
			tButton
		},
		computed: {
			surplus() {
				return this.all - this.num - this.num1
			}
		}
	}
</script>

<style>
.invoiceMeth{
	text-align: center;
	display: flex;
	align-content: center;
	align-items: center;
	align-self: center;
	justify-content: center;
	margin-bottom: 10px;
}
.invoiceMeth input{
	border: 1px solid #e5e5e5;
	padding: 8px 0;
}
</style>
