<template>
	<view>
		<view class="content">
			<view class="timeOut">
					<!-- <timer endTime="172800" :callback="callback" endText="已经结束了"></timer> -->
					<text class="time">00:00:00</text>
					<text class="timeOver">订单自动取消</text>
				</view>
			<view class="fget-num detailsState">
				
				<view class="stateBox">
					<view class="state1">
						订单状态：
						<text>待付款</text>
					</view>
					<view class="state2">
						当前价格：
						<text>￥6300</text>/吨
					</view>
					<view class="state2">
						市场定价：
						<text>￥6300</text>/吨
					</view>
				</view>
				<view class="discount">
					<view>已优惠</view>
					<text>10%</text>
				</view>
			</view>
			<view class="fget-num">
				<view class="orderDetails">
					<view>
						订单编号：
						<text>2817273654213</text>
					</view>
					<view>
						下单时间：
						<text>2019-12-12 20:20</text>
					</view>
					<view>
						购油单位：
						<text>XXXXX公司</text>
					</view>
					<view>
						油品类型：
						<text>92#乙醇汽油</text>
					</view>
					<view>
						购油数量：
						<text>90.00000</text>吨
					</view>
					<view>
						提油方式：
						<text>配送</text>
					</view>
					<view>
						<text>送油地址：</text>

						<textarea auto-height></textarea>
					</view>
				</view>
			</view>
			<view class="pay">
				<view>
					配送金额：
					<text style="margin-left: 16px;">￥100.00</text>
				</view>
				<view>
					油品总金额：
					<text>￥540000.00</text>
				</view>
				<view>
					订单总金额：
					<text>￥540100.00</text>
				</view>
			</view>
			<view class="m-two-btn mTop15" v-show="isbought">
				<button class="tButton cal" @click="cancelOrder">取消订单</button>
				<tButton :type="type" class="tButton" :content="con2" @sureBuy="sureBuy"></tButton>
			</view>
			<view class="nextBox"  v-show="!isbought">
				<mButton :type="btntype" :value="btnValue" @tell="tell"></mButton>
			</view>
		</view>
	</view>
</template>

<script>
	import tButton from '../../../components/twoButton/twoButton.vue'
	import mButton from '../../../components/m-button.vue'
	export default {
		data() {
			return {
				isbought:true,
				type1:"defult",
				type:"primary",
				con1:'取消订单',
				con2:'确认购买',
				btntype:'primary',
				btnValue:'提醒财务确认收款'
			}
		},
		methods: {
			sureBuy(){
				uni.navigateTo({
					url:"../invoice/invoice"
				})
			},
			tell(){
				uni.showToast({
					title:"已提醒财务确认,请耐心等待",
					icon:"none"
				})
			},
			cancelOrder(){
				uni.showModal({
					"content":"确认取消订单",
					success:function(res){
						if(res.confirm){
							console.log(res)
						}else if(res.cancel){}
					}
				})
			}
		},
		components:{
			tButton,
			mButton
		}
	}
</script>

<style>

</style>
