<template>
	<view>
		<view class="content">
			<view class="fget-num paddingLeft15">
				<!-- <mt-field label="购油公司" placeholder="XXXXXXXXXX公司" @click.native="GoOilByCompany" readonly disableClear >
					<img src="../../static/img/right.png" alt>
				</mt-field>

				<mt-field label="选择油品" placeholder="选择油品" @click.native="chooseOilShow" readonly disableClear v-model="productOil">
					<img src="../../static/img/right.png" alt>
				</mt-field>
				<mt-field label="提油方式" placeholder="选择提油方式" @click.native="modeShow" readonly disableClear v-model="modeOil">
					<img src="../../static/img/right.png" alt>
				</mt-field>
				<mt-field label="购买数量(吨)" placeholder="输入阿拉伯数字" type="number" v-model="muchOil"></mt-field> -->
				<!-- 公司 -->
				<view class="flex  m-info" @tap="GoOilByCompany">
					<view class="flex center m-info-content">
						<text>购油公司</text>
						<view>{{company}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>
				<!-- 油品 -->
				<view class="flex  m-info" @tap="chooseOilShow">
					<view class="flex center m-info-content">
						<text>选择油品</text>
						<view>{{productOil}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>
				<!-- 提油方式 -->
				<view class="flex  m-info" @tap="modeShow">
					<view class="flex center m-info-content">
						<text>提油方式</text>
						<view>{{modeOil}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>
				
				<infoText :textValue="buyoilText" :type="number" :placeholder="placeholder"  :value="muchOil"></infoText>
				
				<view class="fget-eara " @click="chooseAddress">
					<view class="first-li">配送地址：</view>
					<view class="addressimg">
						<view style="width: 90%;"> {{address}}</view>
						<img src="../../static/img/right.png" alt>
					</view>

				</view>
				<view class="fget-eara">
					<view class="first-li">备注：</view>
					<view class="secend-in ml">
						<textarea type="text" cols="38" auto-height placeholder="如：XXXXXXXXXXXXXXXXXX" v-model="Remarks"></textarea>
						<b></b>
					</view>
				</view>
			</view>
			<view class="mTop20" >
				<mButton :type="btn.primary" class="mTop20" :value="btn.btnvalue" @toBuy="toBuy"></mButton>
			</view>

			<!-- <view class="nextBox">
				<mt-button class="btn"  type="primary" size="large" >提交意向单</mt-button>
			</view> -->
		</view>
		<!-- 选择油号 -->
		<view class="footmodel" v-show='show'>
			<transition name="myanimate">
				<view class="footermain">
					<view class="modelmain">
						<text>请选择油品</text>
						<view ref="chooseOne" @tap="chooseOne" id='95#国六'>95#国六</view>
						<view ref="chooseOne" @tap="chooseOne" id='92#国六'>92#国六</view>
						<view ref="chooseOne" @tap="chooseOne" id='98#国六'>98#国六</view>
						<view ref="chooseOne" @tap="chooseOne" id='-10#柴油'>-10#柴油</view>
						<view ref="chooseOne" @tap="chooseOne" id='0#柴油'>0#柴油</view>
					</view>
					<view class="modelfooter">
						<view @tap="chooseOilShow">取消</view>
					</view>
				</view>

			</transition>
		</view>
		<!-- 提油方式 -->
		<view class="footmodel" v-show="mode">
			<transition name="myanimate">
				<view class="footermain">
					<view class="modelmain">
						<text>请选择提油方式</text>
						<view @tap="chooseTwo" id="配送">配送</view>
						<view @tap="chooseTwo" id="自提">自提</view>
					</view>
					<view class="modelfooter">

						<view @tap="chooseOilLeave">取消</view>
					</view>
				</view>
			</transition>
		</view>
	</view>
</template>

<script>
	import infoText from '../../components/m-info-text/m-info-text'
	import mButton from '../../components/m-button.vue'
	export default {
		data() {
			return {
				buyoilText: '购买数量',
				number: 'number',
				productOil: '选择油品',
				modeOil: "选择提油方式",
				buyOilP: "输入阿拉伯数字",
				company: "小菊",
				muchOil: "100",
				address: "请选择提油方式请选择提油择提油方式",
				show: false,
				mode: false,
				urlAddress: 'order',
				Remarks: '你好',
				placeholder:'请输入数量',
				btn: {
					primary: "primary",
					btnvalue: "提交意向单",
				}

			}
		},
		onLoad(option) {
			this.company = option.newaddress
		},

		methods: {
			GoOilByCompany() {
				uni.navigateTo({
					url: 'oilByCompany/oilByCompany?address=' + this.urlAddress
				})
			},
			chooseOilShow() {
				this.show = !this.show;
			},
			chooseOilLeave() {
				this.mode = !this.mode;
			},
			chooseOne(val) {
				this.show = !this.show;
				this.productOil = val.target.id;
				//  this.$refs.chooseOne.className="modelmainActive"
			},
			modeShow() {
				this.mode = !this.mode;
			},
			chooseTwo(val) {
				console.log(val);
				this.mode = !this.mode;
				this.modeOil = val.target.id;
			},
			toBuy() {
				uni.navigateTo({
					url: '../orderList/orderList'
				})
			},
			chooseAddress() {

			}
		},
		components: {
			mButton,
			infoText
		},
		mounted() {
			// setTimeout(() => { }, 0),
			setTimeout(function() {
				this.company = "小花"
			}, 0);
		}
	}
</script>

<style>
	.m-info {
		padding: 10px 0;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}

	.m-info-content {
		justify-content: flex-start;
	}

	.m-info text {
		width: 80px;
	}

	.m-info image {
		width: 12px;
		height: 12px;
		padding-right: 15px;
	}

	.myanimate-enter-active {
		animation: show1 0.3s;
	}

	.myanimate-leave-active {
		animation: leave 0.3s;
	}

	.addressimg {
		position: relative;
	}

	.addressimg img {
		position: absolute;
		right: 5px;
		top: 50%;
		margin: -6px;
	}

	.footmodel {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		bottom: 0px;
		left: 0;
	}

	.footmodel .modelmain view {
		background-color: #fff;
		padding: 13px;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		font-size: 18px;
		color: #666;
	}

	.footmodel .modelmain text {
		display: block;
		background-color: #fff;
		padding: 13px;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		font-size: 18px;
		color: #666;
	}

	.footermain {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		animation: show1 0.3s;
		border-radius: 8px 8px 0 0;
	}

	.modelfooter {
		width: 100%;
		display: flex;
		margin-top: 6px;
		background-color: #fff;

		line-height: 50px;
	}

	.modelfooter view {
		width: 100%;
		text-align: center;
	}

	.footmodel .modelmain view:hover {
		background-color: #e5e5e5;
		;
	}

	@keyframes show1 {
		0% {
			bottom: -241px;
		}

		100% {
			bottom: 0px;
		}
	}

	@keyframes leave {
		100% {
			bottom: 0px;
		}

		0% {
			bottom: -362px;
		}
	}
</style>
