<template>
	<view>
		<titles :titles="titles"></titles>
		
		<view class="content">
			<view class="fget-num paddingLeft15">
				<!-- 公司 -->
				<view class="flex  m-info" @tap="getNewCompany()">
					<view class="flex center m-info-content">
						<text>售油公司</text>
						<view>{{company}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>

				<!-- 客户经理 -->
				<view class="flex  m-info" @tap="getNewCustemerInfo()">
					<view class="flex center m-info-content">
						<text>客户经理</text>
						<view>{{myManager}}</view>
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

				<view class="flex  m-info" @tap="payShow">
					<view class="flex center m-info-content">
						<text>付款方式</text>
						<view>{{modePay}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>

				<infoText :textValue="infos.buyoilText" :type="infos.number" @input="setNumber" :placeholder="infos.placeholder"
				 :value="infos.muchOil" v-model="count"></infoText>

				<view class="fget-eara underLine" @click="chooseAddr" v-show="addrShow">
					<view class="first-li">配送地址：</view>
					<view class="addressimg">
						<view style="width: 90%;"> {{address}}</view>
						<image src="../../static/img/right.png" mode="aspectFit"></image>
					</view>

				</view>
				<view class="fget-eara">
					<view class="first-li">备注：</view>
					<view class="secend-in ml">
						<textarea type="text" cols="38" auto-height placeholder="(选填)" v-model="Remarks"></textarea>
						<b></b>
					</view>
				</view>
			</view>
			<view class="mTop20">
				<mButton :type="btn.primary" :value="btn.btnvalue" @toBuy="toBuy"></mButton>
			</view>
		</view>
		<!-- 选择油号 -->
		<view class="footmodel" v-show='show'>
			<transition name="myanimate">
				<view class="footermain">
					<view class="modelmain">
						<text>请选择油品</text>
						<view ref="chooseOne" @tap="chooseOne" id='92#国六'>92#国六</view>
						<view ref="chooseOne" @tap="chooseOne" id='95#国六'>95#国六</view>
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
		<!-- 选择付款方式 -->
		<view class="footmodel" v-show='pay'>
			<transition name="myanimate">
				<view class="footermain">
					<view class="modelmain">
						<text>请选择付款方式</text>
						<view @tap="pays" id='现金'>现金</view>
						<view @tap="pays" id='支票'>支票</view>
						<view @tap="pays" id='转账'>转账</view>
						<view @tap="pays" id='信用卡'>信用卡</view>
						<view @tap="pays" id='POS'>POS</view>
						<view @tap="pays" id='信用销售'>信用销售</view>
					</view>
					<view class="modelfooter">
						<view @tap="chooseOilShowPay">取消</view>
					</view>
				</view>
			</transition>
		</view>
		<!-- 地址信息 -->
		<view class="chooseAddress" v-show="chooseAddress">
			<!-- <view class="flex title">
				<image src="../../static/img/back.png" mode="aspectFit" @tap="chooseAddress = !chooseAddress"></image>
				<text>选择地址</text>
			</view> -->
			<view class="self_header ">
				<view class="self_header_bar">
					
				</view>
				<view class="self_header_title flex self_header_position">
					<view class="leftBtn" @tap="chooseAddress =! chooseAddress">
						<uni-icon type="arrowleft" size="27"></uni-icon>
					</view>
					<view>{{addrTitles}}</view>
				</view>
			</view>
			<view class="mContent" style="margin-top:44px">
				<view class="harvest" v-for="(item,index) in info" :key="item.id">
					<view class="harvest-name" @tap="isAddress(index)">
						<view>{{item.realname}}</view>
						<view>{{item.phone}}</view>
					</view>
					<view class="harvest-address" @tap="isAddress(index)">
						<view>{{item.address}}</view>
					</view>
					<view class="harvest-write">
						<radio-group @change="sure">
							<label class="radio">
								<radio :value="String(item.is_default)" :checked="index === range" />设置为默认地址
							</label>
						</radio-group>
						<!-- 编辑修改地址 和删除地址 暂时不用 -->
						<!-- <view class="operation">
							<button type="defult" class="write" size="small" @tap="edit">编辑</button>
							<button type="defult" class="write" size="small" @tap="delate">删除</button>
						</view> -->
					</view>
				</view>

			</view>
			<!-- 新增地址暂时不用 -->
			<!-- <view class="newaddress">
				<button class="btn" @click="newadd">新增地址</button>
			</view> -->
		</view>


		<!-- 公司 -->
		<view v-show="showCompany" class="companyCustomer">
			<view class="self_header ">
				<view class="self_header_bar">
					
				</view>
				<view class="self_header_title flex self_header_position">
					<view class="leftBtn" @tap="showCompany =! showCompany">
						<uni-icon type="arrowleft" size="27"></uni-icon>
					</view>
					<view>{{companyTitles}}</view>
				</view>
			</view>
			<view class="company_content">
				<view class="customerCompany " @tap="chooseCompany(index)" v-for="(item,index) in newDatas" :key="index">
				<view class="newCompany">{{item.name}}</view>
			</view>
			</view>
			
		</view>

		<!-- 客户经理 -->
		<view v-show="showCoutomer" class="companyCustomer">
			<!-- <view class="flex title">
				<image src="../../static/img/back.png" mode="aspectFit" @tap="showCoutomer = !showCoutomer"></image>
				<text>选择客户经理</text>
			</view> -->
			<!-- <titles :titles="coutomerTitles"></titles> -->
			<view class="self_header">
				<view class="self_header_bar">
					
				</view>
				<view class="self_header_title flex self_header_position">
					<view class="leftBtn" @tap="showCoutomer = !showCoutomer">
						<uni-icon type="arrowleft" size="27"></uni-icon>
					</view>
					<view>{{coutomerTitles}}</view>
				</view>
			</view>
			
			<view class="search flex">
				<input type="text" value="" placeholder="搜索" class="search_input" v-model="value" @input="searchCustomer" />
			</view>
			<view class="content" style="margin:95px 0 49px;">
				<view class="customerCompany" @tap="chooseCustomers(index,item.id)" v-for="(item,index) in man" :key="index">
					<view>{{item.realname}}</view>
					<view>{{item.phone}}</view>
					<!-- <view>
						{{item.departmentText}}
					</view> -->
				</view>
			</view>
			<view class="loading" @tap="Smore" v-show="more">
				<view>
					<img src="../../static/img/loading.png" alt /> &nbsp; 点击加载更多...
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import infoText from '../../components/m-info-text/m-info-text'
	import mButton from '../../components/m-button.vue'
	import uniIcon from '../../components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				titles:'下单购油',
				addrTitles:'选择地址',
				coutomerTitles:'选择客户经理',
				companyTitles:'选择公司',
				company: "",
				productOil: '选择油品',
				modeOil: "选择提油方式",
				modePay: '请选择付款方式',
				address: "请选择地址",
				count: '',
				Remarks: '',
				show: false,
				mode: false,
				pay: false,
				addrShow: true,
				infos: {
					placeholder: '请输入数量',
					buyoilText: '购买数量(吨)',
					number: 'number',
					muchOil: "",
				},
				btn: {
					primary: "primary",
					btnvalue: "提交意向单",
				},
				info: [], //地址
				range: 0,
				chooseAddress: false,
				getTpe: '',
				myManager: '', //客户经理
				newDatas: [],
				showCompany: false,
				companyId: '',
				showCoutomer: false,
				page: 1,
				pageSize: 10,
				man: [],
				more: true,
				value: '',
				myManagerId: '',

			}
		},
		onLoad() {
			this.getCompanyInfo();
			this.getAddressInfo();
		},

		methods: {
			//获取默认公司
			getCompanyInfo() {
				const that = this;
				this.test.post('user/order_company')
					.then(res => {
						console.log(res)
						// 
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							// res.data.value.forEach(el => {
							// 	const info = el
							that.company = res.data.value.name;
							that.companyId = res.data.value.id 
							// })
						} else {

						}


					}).catch(err => {
						console.log(err)
					});
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						// console.log(res)
						that.myManager = res.data.user.manager_name; //客户经理信息
					}
				})
			},
			getNewCompany() {
				const that = this;
				this.showCompany = true;
				this.test.post('order/listOrgs')
					.then(res => {
						console.log(res)
						that.newDatas = res.data.value;

					})
			},


			//选择公司
			chooseCompany(e) {
				const that = this;
				console.log(this.newDatas)
				this.company = this.newDatas[e].name;
				this.companyId = this.newDatas[e].id;
				this.showCompany = !this.showCompany;
				this.test.post('order/listManagers', { //选择公司后默认第一个客户经理
						realname: this.value,
						org_id: this.companyId,
						size: this.page,
						pageSize: this.pageSize,
					})
					.then(res => {
						// that.newDatas = res.data.value
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							// console.log()
							that.man = [];
							res.data.value.forEach(el => {
								that.man.push(el)
							})
							this.myManager = this.man[0].realname;
							if (res.data.value.length < 10 && res.data.value.length > 0) {
								this.more = false;
							} else if (res.data.value.length == 0) {
								this.more = false;
								uni.showToast({
									title: '没有更多了',
									icon: "none"
								})
							}
						}
					})
				console.log(this.man)


			},

			getNewCustemerInfo() {
					this.man = [];
					this.getNewCustemer();
					this.showCoutomer = true;
			},
			getNewCustemer() {
				console.log(this.value)
				this.test.post('order/listManagers', {
						realname: this.value,
						org_id: this.companyId,
						size: this.page,
						pageSize: this.pageSize,
					})
					.then(res => {
						// that.newDatas = res.data.value
						console.log(res)
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							// console.log()
							res.data.value.forEach(el => {
								this.man.push(el)
							})
							this.myManager = this.man[0].realname;
							if (res.data.value.length < 10 && res.data.value.length > 0) {
								this.more = false;
							} else if (res.data.value.length == 0) {
								this.more = false;
								uni.showToast({
									title: '没有更多了',
									icon: "none"
								})
							}
						}
					})


			},

			// 搜索客户经理
			searchCustomer(e) {
				console.log(e)
				this.page = 1;
				if (e.target.value !== '' && e.target.value !== null) {
					this.getNewCustemerInfo();
				} else {
					this.value = '';
					this.getNewCustemerInfo();
				}
			},
			chooseCustomers(e, id) {
				this.myManagerId = id;
				this.myManager = this.man[e].realname;
				this.showCoutomer = !this.showCoutomer
			},
			// 点击加载更多
			Smore() {
				this.page += 1;
				this.getNewCustemer()
			},
			// 付款方式
			payShow() {
				this.pay = !this.pay
			},
			chooseOilShowPay() {
				this.pay = !this.pay
			},
			//选择油品
			chooseOilShow() {
				this.show = !this.show;
			},
			// 取消
			chooseOilLeave() {
				this.mode = !this.mode;
			},
			chooseOne(val) {
				console.log(val)
				this.show = !this.show;
				this.productOil = val.target.id;
				//  this.$refs.chooseOne.className="modelmainActive"
			},
			pays(val) {
				this.pay = !this.pay;
				this.modePay = val.target.id
			},
			modeShow() {
				this.mode = !this.mode;
			},
			chooseTwo(val) {
				console.log(val);
				this.mode = !this.mode;
				this.getTpe = val.target.id
				if (val.target.id == '配送') {

					this.addrShow = true
				} else {

					this.addrShow = false
				}
				this.modeOil = val.target.id;

			},

			chooseAddr() {
				this.getAddressInfo();
				this.chooseAddress = !this.chooseAddress;
				uni.showToast({
					title: '选择你要收货的地址,然后点确认',
					icon: 'none'
				})
			},
			// 获取地址信息
			getAddressInfo() {
				const that = this;
				this.test.post('user/getAddrList').then(res => {
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.info = res.data.value;
						//  console.log(this.info)
						this.info.forEach(el => {
							// console.log(el)
							if (el.is_default == 1) {
								that.address = el.address
							}
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//设置输入框只能为正整数
			setNumber(val) {
				console.log(val)
				if (val == 0) {
					this.count = ''
					uni.showToast({
						title: '购买数量不能为0',
						icon: 'none'
					})
				} else if (val !== 0) {
					this.count = this.count.replace(/^(0+)|[^\d]+/g, '')
				}

			},



			// 选择地址
			isAddress(inx) {
				console.log(inx, this.info)
				const that = this;
				uni.showModal({
					content: '确定选择该地址为收货地址',
					success: function(res) {
						if (res.confirm) {
							that.address = that.info[inx].address;
							that.chooseAddress = !that.chooseAddress
							console.log(that.address)
						} else if (res.cancel) {
							return;
						}

					}
				})

			},
			sure(e) {
				uni.showModal({
					"title": "提示",
					"content": '确认选择该地址为默认地址？',
					success: res => {
						if (res.confirm) {
							for (let i = 0; i < this.info.length; i++) {
								if (this.info[i].is_default == e.target.value) {
									this.range = i;
									console.log(this.info[i].id)
									this.test.post("user/setDefaultAddr", {
										addr_id: this.info[i].id
									}).then(res => {
										console.log(res)
										if (res.statusCode == 200 && res.data.errorCode == 0) {
											uni.showToast({
												title: '设置成功'
											})
										}
									})
									break;
								}
							}
							// 点击取消
						} else if (res.cancel) {
							this.info = '',
								this.getAddressInfo()
						}
					}
				})
			},

			toBuy() {
				const that = this;
				if (this.productOil !== null && this.productOil !== '' && this.productOil !== '选择油品') {
					if (this.getTpe !== null && this.getTpe !== '') {
						if (this.modePay !== null && this.modePay !== '' && this.modePay !== '请选择付款方式') {
							if (this.count !== null && this.count !== '') {

								uni.showModal({
									title: '提示',
									content: '提交后无法修改，是否提交',
									success: function(res) {
										if (res.confirm) {
											that.test.post('order/make_order', { //http://192.168.0.156:8080/api/bizcust/
												org_id: that.companyId,
												manager_id: that.myManagerId,
												manager_name: that.myManager,
												oil_type: that.productOil,
												get_type: that.getTpe,
												pay_type: that.modePay,
												count: that.count,
												ship_addr: that.address,
												remark: that.Remarks,
											}).then(res => {
												console.log(res)
												if (res.statusCode == 200 && res.data.errorCode == 0) {
													uni.redirectTo({
														url: '../orderList/orderList'
													})
												}  else if(res.data.errorCode == 10001 || res.data.errorCode == 10002 || res.data.errorCode == 10003){
													uni.showModal({
														title: '提示',
														content: '用户信息已失效，请重新登录',
														success: function(res) {
															if (res.confirm) {
																uni.reLaunch({
																	url: '../login/login'
																})
															} else {
																uni.reLaunch({
																	url: '../login/login'
																})
															}
														}
													})
												}else{
													uni.showToast({
														title: res.data.message,
														icon: "none"
													})
												}
											}).catch(err => {
												console.log(err)
											})
										} else {
											return;
										}
									}
								})



								//购油数量	
							} else {
								uni.showToast({
									title: '请输入购油数量',
									icon: 'none'
								})
							}
							//付款方式
						} else {
							uni.showToast({
								title: '请选择付款方式',
								icon: 'none'
							})
						}
						//提油	方式
					} else {
						uni.showToast({
							title: '请选择提油方式',
							icon: 'none'
						})
					}
					//油品	
				} else {
					uni.showToast({
						title: '请选择油品',
						icon: 'none'
					})
				}

			},
		},

		components: {
			mButton,
			infoText,
			uniIcon
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
		color: #666;
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

	.addressimg image {
		width: 12px;
		height: 12px;
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

	.chooseAddress {
		position: absolute;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: #EFEFF4;
	}

	.title {
		width: 100%;
		height: 44px;
		padding: 7px 3px;
		box-sizing: border-box;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
		text-align: center;
		position: fixed;
		top: 0;
		background-color: #fff;
	}

	.title image,
	text {
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.title image {
		width: 18px;
		height: 18px;
		margin-left: 5px;
	}

	.title text {
		flex: 1;
		font-size: 17px;

	}

	.companyCustomer {
		position: absolute;
		top: 0;
		z-index: 997;
		width: 100%;
		height: 100%;
		background-color: #e5e5e5;
	}

	.customerCompany {
		background-color: #fff;
		padding: 10px 0 10px 15px;
		border-bottom: 1px solid #d6d6d6;
		font-size: 14px;
		color: #666;
		line-height: 28px;
	}

	/* .newCompany{
		border-bottom: 1px solid #e5e5e5;
		padding: 12px 15px;
	} */
	.search {
		width: 100%;
		justify-content: center;
		background-color: #fff;
		padding: 12px 15px;
		box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.16);
		position: fixed;
		left: 0;
		top: 78px;
	}

	.search_input {
		background-color: #e5e5e5;
		border-radius: 14px;
		width: 100%;
		padding: 4px 15px;
	}
	.self_header_position{
		position: fixed;
		
		left: 0;
	}
	.company_content{
		margin-top: 55px;
	}
</style>
