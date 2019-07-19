<template>
	<view>
		<view class="content">
			<view class="fget-num paddingLeft15">
				<!-- <mt-field label="开票公司" placeholder="XXXXXXXXXX公司" v-model="company"></mt-field>
				<mt-field label="开票金额" placeholder="￥540000.00" v-model="money"></mt-field>
				<mt-field label="发票拆分" readonly>
					<mt-switch v-model="value" @change="showIncoice()"></mt-switch>
				</mt-field> -->
				<infoText :textValue="invoice.company" v-model="company"></infoText>
				<infoText :textValue="invoice.money" v-model="money"></infoText>
				<infoImg :textContent="invoice.type" :disabled="disabled" :value="types"></infoImg>
				<view class="flex invoiceSplit">
					<text>发票拆分</text>
					<switch @change="showIncoice" />
				</view>
			</view>
			<view class="fget-num paddingLeft15" style="margin-top: 10px" v-show="show">
				<!-- <mt-field label="拆分方式" placeholder="按数量"></mt-field>
				<mt-field label="当前购油数量" :value="all"></mt-field> -->
				<infoText :textValue="invoice.way" value="按数量" :disabled="disabled"></infoText>
				<infoText :textValue="invoice.currentOil" v-model="currentOil" :disabled="disabled"></infoText>
				<view class="underline">
					<view class="first-li" style="padding:10px 0 15px 0px; color: #666;">拆分方案(单位:吨)</view>
					<view class="splitNum">
						<view class="invoiceMeth">
							<input type="text" v-model="num" placeholder="0">
							<!-- <img src="../../../static/img/add.png" @tap="add" alt> -->
							<image src="../../../static/img/add.png" mode="aspectFit"></image>
						</view>
						<view class="invoiceMeth">
							<input type="text" v-model="num1" placeholder="0">
							<!-- <img src="../../../static/img/move.png" alt> -->
							<image src="../../../static/img/move.png" mode="aspectFit"></image>
						</view>
						<view v-show="move"></view>
					</view>
				</view>
				<!-- <infoText :textValue="invoice.surplus" :value="surplusOil" :disabled="disabled"></infoText> -->
				<view class="flex m-info">
					<text>{{invoice.surplus}}</text>
					<input type="type" :value="surplusOil" :disabled="disabled" />
				</view>
				<!-- <mt-field label="剩余数量" placeholder="90.00000吨" v-model="surplus" style="border-top: 1px solid #e5e5e5;"></mt-field> -->
			</view>
			<view class="m-two-btn mTop15">
				<!-- <button @click="goDtails">无需发票</button>
        <button class="blue" @click="invoiceSure">确 &nbsp; &nbsp; 认</button> -->
				<button class="tButton cal" @tap="cancelOrder">无需发票</button>
				<tButton :type="btn.type" class="tButton" :content="btn.con2"></tButton>
			</view>
		</view>
	</view>
</template>

<script>
	import tButton from '../../../components/twoButton/twoButton.vue'
	import infoImg from '../../../components/m-info-img/m-info-img'
	import infoText from '../../../components/m-info-text/m-info-text'
	export default {
		data() {
			return {
				btn: {
					type: 'primary',
					con2: '确认',
				},
				show: false,
				value: false,
				currentOil: "90",
				num: "23",
				num1: "28",
				move: false,
				company: 'xxxxxxxx公司',
				money: '111111111',
				types: '22222222',
				disabled: true,
				invoice: {
					company: '开票公司',
					money: '开票金额',
					type: '发票类型',
					way: '拆分方式',
					currentOil: '当前购油量',
					surplus: '剩余未拆油量',
				}
			}
		},
		methods: {
			showIncoice() {
				this.show = !this.show;
			},
			add() {},
			cancelOrder() {}
		},
		components: {
			tButton,
			infoImg,
			infoText
		},
		computed: {
			surplusOil() {

				return parseFloat(this.currentOil - this.num - this.num1)
			}
		}
	}
</script>

<style>
	.invoiceMeth {
		text-align: center;
		display: flex;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: center;
		margin-bottom: 10px;
	}

	.invoiceMeth input {
		width: 400upx;
		border: 1px solid #e5e5e5;
		padding: 8px 0;
	}

	.invoiceMeth image {
		width: 25px;
		height: 25px;
	}

	.invoiceSplit {
		align-content: center;
		align-items: center;
		align-self: center;
		padding: 5px 0;
		justify-content: space-between;
	}

	.m-info {
		padding: 10px 15px 10px 0;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.m-info-content {
		justify-content: flex-start;
	}

	.m-info text {
		min-width: 70px;
		margin-right: 10px;
	}

	.m-info input {
		flex: 1;
	}
</style>
