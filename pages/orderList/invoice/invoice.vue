<template>
	<view>
		<view class="content">
			<view class="fget-num paddingLeft15">
				<infoText :textValue="invoice.company" v-model="company" :disabled="invoice.disabled"></infoText>
				<!-- <infoText :textValue="invoice.moeny" v-model="invoice_money" :disabled="invoice.disabled"></infoText> -->
				<view class="flex m-info">
					<text>开票金额</text>
					<input type="type" :value="invoice_money" :disabled="invoice.disabled" style="font-weight: 550;"/>
				</view>
				<view class="fget-eara flex invoiceType underline" @tap="chooseInvoice">
					<view class="">
						<text class="first-li" style="margin-right: 10px;">发票类型：</text>
						<text>{{typeInvoice}}</text>
					</view>
					<image src="../../../static/img/right.png" style="width: 12px; height: 12px;" mode="aspectFit"></image>
				</view>
				<view class="flex invoiceSplit">
					<text>发票拆分</text>
					<switch @change="showIncoice" />
				</view>
			</view>
			<view class="fget-num paddingLeft15" style="margin-top: 10px;" v-show="show">

				<infoText :textValue="invoice.way" value="按数量" :disabled="invoice.disabled"></infoText>
				<!-- <infoText :textValue="invoice.currentOil" v-model="currentOil" :disabled="invoice.disabled"></infoText> -->
				<view class="flex m-info">
					<text style="width: 5rem;">当前购油量</text>
					<input type="type" :value="currentOil" :disabled="invoice.disabled" style=""/>
				</view>
				<view class="underline">
					<view class="first-li" style="padding:10px 0 15px 0px; color: #616161;">拆分方案(单位:吨)</view>
					<view class="splitNum">
						<view class="invoiceMeth">
							<input type="number" v-model="num" value="0" @input="incoiceSplit1">

							<image src="../../../static/img/add.png" @tap="add" mode="aspectFit"></image>
						</view>
						<view class="invoiceMeth" v-for="(item,index) in list" :key="index">
							<input type="number" v-model="item.nums" value="0" :id="index"  @input="incoiceSplit2" >

							<image src="../../../static/img/move.png" @tap="detal(index)" mode="aspectFit"></image>
						</view>
						<view v-show="move"></view>
					</view>
				</view>

				<view class="flex m-info">
					<text>剩余未拆油量</text>
					<input type="type" :value="surplusOil" :disabled="invoice.disabled" />
				</view>

			</view>
			<view class="m-two-btn mTop15 pB10">

				<button class="tButton cal" v-show="status == 2" @tap="cancelOrder">暂不开票</button>
				<tButton :type="btn.type" class="tButton" :disabled="btn.disabled" :content="btn.con2" @invoiceSure="invoiceSure(invoice.currentOil)"></tButton>
			</view>
		</view>
		<!-- 角色 -->
		<view class="footmodel" v-show='invoiceTypes'>
			<transition name="myanimate">
				<view class="footermain">
					<view class="modelmain">
						<text>- 请选择发票类型 -</text>
						<view @tap="invoiceType" id='增值税专用发票'>增值税专用发票</view>
						<view @tap="invoiceType" id='增值税普通发票'>增值税普通发票</view>
					</view>
					<view class="modelfooter">
						<view @tap="chooseUsersShow">取消</view>
					</view>
				</view>
			</transition>
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
					disabled: false
				},
				invoice: {
					company: 'xxxxxxxx公司',
					disabled: true,
					// moeny: '111111111',
					placeholder: '22222222',
					company: '开票公司',
					moeny: '开票金额',
					types: '发票类型',
					way: '拆分方式',
					currentOil: '当前购油量',
				},
				list: [], //拆分次数集合
				ids: -1, //默认不需要发票
				yesORno: '是',
				typeInvoice: '请选择发票类型',
				invoiceTypes: false,
				id: '',
				invoiceNum: [], //拆分数量
				show: false, //发票开关，默认关
				value: false,
				num: 0, //第一个拆分数量
				currentOil: '', //当前购油数量
				move: false,
				no: '',
				company: '',
				status: '',
				moeny: '',//总价格
				invoice_money:'',
			}
		},
		onLoad(option) {
			this.id = option.id; //id
			this.currentOil = option.number; //油量
			this.no = option.no; //订单编号
			this.company = option.company; //购油公司
			this.status = option.status; //状态
			this.moeny =option.moeny; //油价
			this.invoice_money = '￥' + option.moeny;
		},
		methods: {
			incoiceSplit1(e){
				console.log(e)
				if(e.detail.value<0){
						this.num = 0;
					return uni.showToast({
						title:'拆分油量不能小于0',
						icon:'none',
						position:'bottom',
						duration: 3000,
					})
				}
			},
			incoiceSplit2(e){
				console.log(e)
				if(e.detail.value<0){
					this.list[e.target.id].nums = 0	
					return uni.showToast({
						title:'拆分油量不能小于0',
						icon:'none',
						position:'bottom',
						duration: 3000,
					})
				}
			},
			// 点击选择发票类型
			chooseInvoice() {
				this.invoiceTypes = !this.invoiceTypes
			},
			// 选择发票类型
			invoiceType(e) {
				console.log(e)
				this.typeInvoice = e.target.id;
				this.invoiceTypes = !this.invoiceTypes
			},
			// 点击取消选择
			chooseUsersShow() {
				this.invoiceTypes = !this.invoiceTypes
			},
			// 展开发票  
			showIncoice(e) {
				console.log(e)
				if (e.target.value) {
					this.yesORno = "是"
					this.ids = 1; //需要发票
				} else {
					this.yesORno = "否"
					this.ids = -1
				}
				this.show = !this.show;
			},
			// 点击加号添加一行
			add() {
				this.list.push({
					nums: ''
				})
			},
			// 点击减号删除一行
			detal(val) {
				this.list.splice(val, 1)
			},
			// 不需要发票
			cancelOrder() {
				uni.showModal({
					title: '提示',
					content: '确认不开发票吗?',
					success: (res) => {
						if (res.confirm) {
							this.test.post('order/make_invoice', {
								id: this.id,
								is_invoice: '否',
								invoice_money: this.moeny
							}).then(res => {
								console.log(res)
								if (res.statusCode == 200 && res.data.errorCode == 0) {
									uni.redirectTo({
										url: '../orderDtails/orderDtails?id=' + this.id + '&no=' + this.no + '&status=' + this.status
									})
								} else {
									uni.showToast({
										title: res.data.message,
										icon: 'none',
										position:'bottom',
										duration: 3000,
									});
								}
							}).catch(err => {
								console.log(err)
							})
						} else {
							return;
						}
					}
				})

			},
			// 确认开票
			invoiceSure(invoiceAll) {

				if (this.typeInvoice == "请选择发票类型") {
					uni.showToast({
						title: '请选择发票类型',
						icon: 'none',
						position:'bottom',
						duration: 3000,
					});
				} else {
					this.invoiceNum = [];
					const that = this;
					if (this.list.length == 0) {
						this.invoiceNum.push(this.num)
						this.invoiceNum = String(this.invoiceNum)
					} else {
						this.invoiceNum.push(this.num)

						this.list.forEach(el => {
							console.log(el)
							that.invoiceNum.push(el.nums)

						})
						this.invoiceNum = String(this.invoiceNum)
					}
					// console.log(typeof(this.invoiceNum))
					// console.log(this.invoiceNum)
					//第一次开发票
					if (this.status == 2) {
						if (this.ids == 1) {
							if (this.invoiceNum !== '') {
								if (this.surplusOil == 0) {
									uni.showModal({
										title: '提示',
										content: '确认开票',
										success: (res) => {
											if (res.confirm) {
												this.test.post('order/make_invoice', {
													id: this.id,
													invoice_type: this.typeInvoice,
													is_invoice: '是',
													invoice_split: this.invoiceNum,
													invoice_money: this.moeny
												}).then(res => {
													console.log(res)
													if (res.statusCode == 200 && res.data.errorCode == 0) {
														uni.showToast({
															title: '开票成功',
															duration: 3000,
														})
														uni.redirectTo({
															url: '../orderDtails/orderDtails?id=' + this.id + '&no=' + this.no + '&status=' + this.status
														})
													} else {
														uni.showToast({
															title: res.data.message,
															icon: 'none',
															position:'bottom',
															duration: 3000,
														});
													}
												}).catch(err => {
													console.log(err)
												})
											} else {
												return;
											}
										}


									})

								} else {
									uni.showToast({
										title: '发票拆分数量必须与当前油量一致',
										icon: 'none',
										position:'bottom',
										duration: 3000,
									})
								}

							} else {
								uni.showToast({
									title: '请填写拆分数量',
									icon: 'none',
									position:'bottom',
									duration: 3000,
								})
							}

						} else if (this.ids == -1) {
							const that = this;
							uni.showModal({
								title: '提示',
								content: '确认开票',
								success: (res) => {
									console.log(res)
									if (res.confirm) {
										console.log(1)
										this.test.post('order/make_invoice', {
											id: this.id,
											invoice_type: this.typeInvoice,
											is_invoice: '是',
											invoice_split: this.currentOil,
											invoice_money: this.moeny
										}).then(res => {
											console.log(res)
											if (res.statusCode == 200 && res.data.errorCode == 0) {
												uni.showToast({
													title: '开票成功',
													duration: 3000,
												})
												uni.redirectTo({
													url: '../orderDtails/orderDtails?id=' + this.id + '&no=' + this.no + '&status=' + this.status
												})
											} else {
												uni.showToast({
													title: res.data.message,
													icon: 'none',
													position:'bottom',
													duration: 3000,
												});
											}
										}).catch(err => {
											console.log(err)
										})
									} else {
										return;
									}
								}
							})
						}

					}else{//补开发票
						if (this.ids == 1) {
							if (this.invoiceNum !== '') {
								if (this.surplusOil == 0) {
									uni.showModal({
										title: '提示',
										content: '确认开票',
										success: (res) => {
											if (res.confirm) {
												this.test.post('order/repair_invoic', {
													id: this.id,
													invoice_type: this.typeInvoice,
													is_invoice: this.yesORno,
													invoice_split: this.invoiceNum,
													invoice_money: this.moeny
												}).then(res => {
													console.log(res)
													if (res.statusCode == 200 && res.data.errorCode == 0) {
														uni.showToast({
															title: '开票成功',
															duration: 3000,
														})
														uni.redirectTo({
															url: '../orderDtails/orderDtails?id=' + this.id + '&no=' + this.no + '&status=' + this.status
														})
													} else {
														uni.showToast({
															title: res.data.message,
															icon: 'none',
															position:'bottom',
															duration: 3000,
														});
													}
												}).catch(err => {
													console.log(err)
												})
											} else {
												return;
											}
										}
						
						
									})
						
								} else {
									uni.showToast({
										title: '发票拆分数量必须与当前油量一致',
										icon: 'none',
										duration: 3000,
									})
								}
						
							} else {
								uni.showToast({
									title: '请填写拆分数量',
									icon: 'none',
									duration: 3000,
								})
							}
						
						} else if (this.ids == -1) {
							const that = this;
							uni.showModal({
								title: '提示',
								content: '确认开票',
								success: (res) => {
									console.log(res)
									if (res.confirm) {
										console.log(1)
										this.test.post('order/repair_invoic', {
											id: this.id,
											invoice_type: this.typeInvoice,
											is_invoice: this.yesORno,
											invoice_split: this.currentOil,
											invoice_money: this.moeny
										}).then(res => {
											console.log(res)
											if (res.statusCode == 200 && res.data.errorCode == 0) {
												uni.showToast({
													title: '开票成功',
													duration: 3000,
												})
												uni.redirectTo({
													url: '../orderDtails/orderDtails?id=' + this.id + '&no=' + this.no + '&status=' + this.status
												})
											} else {
												uni.showToast({
													title: res.data.message,
													icon: 'none',
													position:'bottom',
													duration: 3000,
												});
											}
										}).catch(err => {
											console.log(err)
										})
									} else {
										return;
									}
								}
							})
						}
						
					}

				}
			}

		},
		components: {
			tButton,
			infoImg,
			infoText
		},
		watch: {
			// 监听用户是否输入数量超过购买总数
			surplusOil(newValue, oldValue) {
				// console.log(newValue, oldValue)
				if (newValue < 0) {
					this.btn.disabled = true;
					uni.showToast({
						title: '输入的数字不能超过总吨数',
						icon: 'none',
						position:'bottom',
						duration: 3000,
					})
				} else {
					this.btn.disabled = false;
				}
			},
		},
		computed: {
			// 计算拆分发票油的数量
			surplusOil() {
				if (this.list.length === 0) {
					return parseFloat(this.currentOil - this.num).toFixed(6)
				} else {
					let sum = parseFloat(this.currentOil - this.num)
					for (let i = 0; i < this.list.length; i++) {
						sum = (sum - this.list[i].nums).toFixed(6);
					}
					return sum
				}


			},

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

	.invoiceType {
		position: relative;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		align-self: center;
	}
</style>
