<template>
	<view>
		<titles :titles="titles"></titles>

		<view class="content">
			<view class="fget-num paddingLeft15">
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

			</view>


			<view class="fget-num paddingLeft15 mTop10">
				<!-- 公司 -->

				<view class="flex  m-info" @tap="chooseOwnCompany">
					<view class="flex center m-info-content">
						<text>购油公司</text>
						<view>{{buyCompany}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit" v-show="buycompanyImg"></image>
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
				<!-- <view class="flex  m-info" @tap="modeShow">
					<view class="flex center m-info-content">
						<text>提油方式</text>
						<view>{{modeOil}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view> -->

				<view class="flex  m-info" @tap="payShow">
					<view class="flex center m-info-content">
						<text>付款方式</text>
						<view>{{modePay}}</view>
					</view>
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>


				<view class="flex  m-info">
					<view class="flex center m-info-content" style="flex: 1;padding-right: 15px;">
						<text>购买数量</text>
						<input type="number" :placeholder="infos.placeholder" v-model="count" @input="setNumber" placeholder-style="color:#9e9e9e"
						 style="flex: 1;" :class="placecolor?color9:colorRed" />
					</view>
				</view>



				<!-- <infoText :textValue="infos.buyoilText" :type="infos.number" @input="setNumber" :placeholder="infos.placeholder"
				 :value="infos.muchOil" v-model="count"></infoText> -->

				<view class="fget-eara underLine" @tap="chooseAddr" v-show="addrShow">
					<view class="first-li">客户地址</view>
					<view class="addressimg">
						<view style="width: 90%;"> {{address}}</view>
						<image src="../../static/img/right.png" mode="aspectFit" v-show="addrImg"></image>
					</view>

				</view>
				<view class="fget-eara">
					<view class="first-li">备注</view>
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
					<view class="top_view"></view>
				</view>
				<view class="self_header_title flex self_header_position">
					<view class="leftBtn" @tap="chooseAddress =! chooseAddress">
						<uni-icons type="arrowleft" size="27"></uni-icons>
					</view>
					<view>选择地址</view>
				</view>
			</view>


			<view class="mContent" style="margin-top:44px">
				<view class="harvest" v-for="(item,index) in info" :key="item.id">
					<!-- <view class="harvest-name" @tap="isAddress(index)">
						<view>{{item.realname}}</view>
						<view>{{item.phone}}</view>
					</view> -->
					<view class="harvests-address" @tap="isAddress(index)">
						<view>{{item.address}}</view>
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
					<view class="top_view"></view>
				</view>
				<view class="self_header_title flex self_header_position">
					<view class="leftBtn" @tap="showCompany = !showCompany">
						<uni-icons type="arrowleft" size="27"></uni-icons>
					</view>
					<view>选择公司</view>
				</view>
			</view>
			<!-- 售油公司 -->
			<view class="company_content" v-show="nextConpany">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" :style="{height:scrollheight+'px'}" style=" position: relative;">
					<view class="customerCompany " @tap="chooseCompany(index)" v-for="(item,index) in newDatas" :key="index">

						<view class="newCompany">{{item.name}}</view>


					</view>
				</scroll-view>
			</view>
			<!-- 购油公司 -->
			<view class="company_content" v-show="!nextConpany">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" :style="{height:scrollheight+'px'}" style=" position: relative;">
					<view class="customerCompany " @tap="chooseownCompany(index)" v-for="(item,index) in managers" :key="index">

						<view class="newCompany">{{item.name}}</view>


					</view>
				</scroll-view>
			</view>


		</view>

		<!-- 客户经理 -->
		<view v-show="showCoutomer" class="companyCustomer">

			<view class="self_header">
				<view class="self_header_bar">

				</view>
				<view class="self_header_title flex self_header_position">
					<view class="leftBtn" @tap="showCoutomer = !showCoutomer">
						<uni-icons type="arrowleft" size="27"></uni-icons>
					</view>
					<view>选择客户经理</view>
				</view>
			</view>


			<view class="" style="margin-top:44px; padding: 0;">
				<view class="search flex">
					<input type="text" value="" placeholder="搜索" class="search_input" v-model="value" @input="searchCustomer" />
				</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" :style="{height:manergerscrollheight+'px'}">
					<view class="customerCompany" @tap="chooseCustomers(index,item.id)" v-for="(item,index) in man" :key="index">
						<view>{{item.realname}}</view>
						<view>{{item.phone}}</view>
						<!-- <view>
						{{item.departmentText}}
					</view> -->
					</view>
				</scroll-view>
				<view class="loading" @tap="Smore" v-show="more">
					<view>
						<img src="../../static/img/loading.png" alt /> &nbsp; 点击加载更多...
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import infoText from '../../components/m-info-text/m-info-text'
	import mButton from '../../components/m-button.vue'
	// import uniIcon from '../../components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				titles: '下单购油',
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
					placeholder: '请输入数量(吨)，可保留六位小数',
					buyoilText: '购买数量',
					number: 'number',
					muchOil: "",
				},
				btn: {
					primary: "primary",
					btnvalue: "提交意向单",
				},
				info: [], //收货地址
				range: 0,
				chooseAddress: false,
				getTpe: '',
				myManager: '', //客户经理
				newDatas: [], //售油公司
				showCompany: false,
				companyId: '',
				showCoutomer: false,
				page: 1,
				pageSize: 10,
				man: [],
				more: false,
				value: '',
				myManagerId: '',
				scrollTop: 0,
				old: {
					scrollTop: 0,
				},
				managers: [], //多个购油公司选择
				phoneHeight: '', //手机高
				scrollheight: '', //实际需要高度
				manergerscrollheight: '', //实际需要高度
				buyCompany: '', //购油公司
				buycompanyImg: false,
				addrImg: false, //地址图片
				buyCompanyID: '',
				nextConpany: false, //区分购油公司和售油公司
				dotIdx: '', //输入数量小数点下标
				placecolor: true, //输入数量颜色
				color9: 'color9',
				colorRed: 'colorRed',
			}
		},
		onLoad() {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res.model);
					// console.log(res.pixelRatio);
					// console.log(res.windowWidth);
					// console.log(res.windowHeight);
					// console.log(res.language);
					// console.log(res.version);
					// console.log(res.platform);
					that.phoneHeight = res.windowHeight;
					that.scrollheight = that.phoneHeight - 44 - 25;
					that.manergerscrollheight = that.phoneHeight - 44 - 25 - 54;
				}
			});
			this.getCompanyInfo();
			// this.getAddressInfo();
			this.getBuycompany(0)
		},

		methods: {
			//获取默认售油公司
			getCompanyInfo() {
				const that = this;
				this.test.post('order/order_company')
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
						console.log(res)
						that.myManager = res.data.managers[0].manager_name; //客户经理信息
						that.myManagerId = res.data.managers[0].manager_id; //客户经理信息
						// that.buyCompany = res.data.managers[0].customer_name; //购油公司信息
						// that.buyCompanyID = res.data.managers[0].customer_id; //购油公司信息
						// that.managers = res.data.managers;
					}
				})
			},
			// 进入页面获取购油公司默认第一个公司及地址
			getBuycompany(idx) {
				this.test.post('order/order_customers').then(res => {
					console.log(res);
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.managers = res.data.value;
						this.buyCompany = this.managers[idx].name;
						this.buyCompanyID = this.managers[idx].id;
						this.info = this.managers[idx].customerLocations;
						this.address = this.info[0].address;
						console.log(this.info)
						if (this.managers.length > 1) {
							this.buycompanyImg = true;
						} else {
							this.buycompanyImg = false;
						}
						if (this.info.length > 1) {
							this.addrImg = true;
						} else {
							this.addrImg = false;
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			///选择购油公司
			chooseOwnCompany() {
				if (this.managers.length > 1) {
					this.buycompanyImg = true;
					this.showCompany = true;
					this.nextConpany = false;
				} else {
					this.buycompanyImg = false;
					return;
				}
			},
			//获取售油公司
			getNewCompany() {
				const that = this;
				this.page = 1;
				this.showCompany = true;
				this.nextConpany = true;
				uni.showLoading({
					title: '加载中...'
				})
				this.test.post('order/listOrgs')
					.then(res => {
						uni.hideLoading();
						console.log(res);
						that.newDatas = res.data.value;

					}).catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: '加载失败',
							icon: 'none',
							position: 'bottom',
						})
						console.log(err)
					})
			},


			//选择公司
			chooseCompany(e) {
				const that = this;
				console.log(e);
				//售油公司
				console.log('收油')
				this.more = true;
				this.company = this.newDatas[e].name;
				this.companyId = this.newDatas[e].id;
				this.showCompany = !this.showCompany;
				this.myManager = '请选择';

			},
			//购油公司
			chooseownCompany(e) {
				this.buyCompany = this.managers[e].name;
				this.showCompany = !this.showCompany;
				this.getBuycompany(e)
				console.log(this.buyCompany)
			},
			getNewCustemerInfo() {
				this.man = [];
				this.page = 1;
				this.more = true;
				this.value = '';
				this.getNewCustemer();
				this.showCoutomer = true;
				uni.showLoading({
					title: '加载中...'
				})
			},
			//获取客户经理
			getNewCustemer() {
				console.log(this.value)
				this.test.post('order/listManagers', {
						search: this.value,
						org_id: this.companyId,
						size: this.page,
						pageSize: this.pageSize,
					})
					.then(res => {
						// that.newDatas = res.data.value
						uni.hideLoading()
						console.log(res)
						if (res.statusCode == 200 && res.data.errorCode == 0) {
							// console.log()
							res.data.value.forEach(el => {
								this.man.push(el)
							})
							// this.myManager = this.man[0].realname;
							if (res.data.value.length < 10 && res.data.value.length > 0) {
								this.more = false;
							} else if (res.data.value.length == 0) {
								this.more = false;
								uni.showToast({
									title: '没有更多了',
									icon: "none",
									position: 'bottom',
								})
							}
						}
					}).catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: '加载失败',
							icon: 'none',
							position: 'bottom',
						})
						console.log(err)
					})


			},

			// 搜索客户经理
			searchCustomer(e) {
				this.page = 1;
				if (e.target.value !== '' && e.target.value !== null) {
					this.man = [];
					this.page = 1;
					this.more = true;
					this.getNewCustemer();
				} else {
					this.man = [];
					this.page = 1;
					this.more = true;
					this.value = '';
					this.getNewCustemer();
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
				uni.showLoading({
					title: '加载中...'
				})
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
				// this.getAddressInfo();
				console.log(this.info.length)

				if (this.info.length > 1) {
					this.addrImg = true;
					this.chooseAddress = !this.chooseAddress;
					uni.showToast({
						title: '选择你要收货的地址,然后点确认',
						icon: 'none',
						position: 'bottom',
					})
				} else {
					return;
				}

			},
			// 获取地址信息
			// getAddressInfo() {
			// 	const that = this;
			// 	this.range = 0;
			// 	this.test.post('user/getAddrList').then(res => {
			// 		if (res.statusCode == 200 && res.data.errorCode == 0) {
			// 			this.info = res.data.value;
			// 			//  console.log(this.info)
			// 			this.info.forEach(el => {
			// 				// console.log(el)
			// 				if (el.is_default == 1) {
			// 					that.address = el.address
			// 				}
			// 			})
			// 		}
			// 	}).catch(err => {
			// 		console.log(err)
			// 	})
			// },
			//设置输入框只能为整数
			setNumber(val) {
				this.placecolor = true;
				if (val.detail.value < 0) {
					this.count = this.count.replace(/^(0+)|[^\d]+/g, '')
					return uni.showToast({
						title: '购买数量不能小于0',
						icon: 'none',
						position: 'bottom',
					})

				} // else if (val !== 0) {
				// 	this.count = this.count.replace(/^(0+)|[^\d]+/g, '')
				// }

				// this.count = val.detail.value.replace(/[^\d.]/g, ""); //仅保留数字和"."
				// this.count = val.detail.value.replace(/\.{2,}/g, "."); //两个连续的"."仅保留第一个"."
				// this.count = val.detail.value.replace(".", "$#*").replace(/\./g, '').replace('$#*', '.'); //去除其他"."
				// this.count = val.detail.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');; //限制只能输入两个小数



				var s = val.detail.value;
				console.log(s)
				let dotIdx = s.indexOf('.');
				console.log(dotIdx)
				this.dotIdx = dotIdx
			
			
				// var reg = /^\d+(\.\d{1,2})?$/;
				// if(reg.test(val.detail.value)){
				//  console.log(reg.test(val.detail.value))
				// this.count = val.detail.value;
				// }else{
				// uni.showToast({
				// 	title:'最多只能输入两位小数',
				// icon:'none',
				// position:'bottom',
				// })
				// this.count = 0
				// }

				// if (val.detail.value.indexOf(".") < 0 && val.detail.value != "") { //首位是0的话去掉
				// 	this.count = parseFloat(val.detail.value);
				// }
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
			// sure(e) {
			// 	uni.showModal({
			// 		"title": "提示",
			// 		"content": '确认选择该地址为默认地址？',
			// 		success: res => {
			// 			if (res.confirm) {
			// 				for (let i = 0; i < this.info.length; i++) {
			// 					if (this.info[i].is_default == e.target.value) {
			// 						this.range = i;
			// 						console.log(this.info, e)
			// 						this.test.post("user/setDefaultAddr", {
			// 							addr_id: this.info[i].cl_id
			// 						}).then(res => {
			// 							console.log(res)
			// 							if (res.statusCode == 200 && res.data.errorCode == 0) {
			// 								uni.showToast({
			// 									title: '设置成功'
			// 								})
			// 							}
			// 						})
			// 						break;
			// 					}
			// 				}
			// 				// 点击取消
			// 			} else if (res.cancel) {
			// 				this.info = '',
			// 					this.getAddressInfo()
			// 			}
			// 		}
			// 	})
			// },
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
			toBuy() {
				const that = this;
				console.log(this.count.length, this.dotIdx)
				if (this.myManager !== null && this.myManager !== '' && this.myManager !== '请选择') {
					if (this.productOil !== null && this.productOil !== '' && this.productOil !== '选择油品') {
						// if (this.getTpe !== null && this.getTpe !== '') {
						if (this.modePay !== null && this.modePay !== '' && this.modePay !== '请选择付款方式') {
							if (this.count !== null && this.count !== '' && this.count !== 0) {
								if (this.dotIdx == -1) {
									console.log(this.dotIdx)
								return	uni.showModal({
										title: '提示',
										content: '提交后无法修改，是否提交',
										success: function(res) {
									
											if (res.confirm) {
												uni.showLoading({
													title: '提交中...'
												})
												that.test.post('order/make_order', { //http://192.168.0.156:8080/api/bizcust/
													org_id: that.companyId,
													manager_id: that.myManagerId,
													manager_name: that.myManager,
													customer_name: that.buyCompany,
													customer_id: that.buyCompanyID,
													oil_type: that.productOil,
													// get_type: that.getTpe,
													pay_type: that.modePay,
													count: that.count,
													ship_addr: that.address,
													remark: that.Remarks,
												}).then(res => {
													console.log(res)
													uni.hideLoading()
													if (res.statusCode == 200 && res.data.errorCode == 0) {
														uni.redirectTo({
															url: '../orderList/orderList'
														})
													} else if (res.data.errorCode == 10001 || res.data.errorCode == 10002 || res.data.errorCode == 10003) {
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
													} else {
														uni.showToast({
															title: res.data.message,
															icon: "none",
															position: 'bottom',
														})
													}
												}).catch(err => {
													uni.hideLoading();
													uni.showToast({
														title: '提交失败',
														icon: 'none',
														position: 'bottom',
													})
													console.log(err)
												})
											} else {
												return;
											}
										}
									})
																		
								} else {
										this.dotIdx = this.dotIdx + 7
									if (this.count.length > this.dotIdx) {
										this.placecolor = false;
										uni.showToast({
											title: '购买数量最多保留六位有效数字',
											icon: 'none',
											position: 'bottom',
										});
										this.count = 0;
									} else {
										uni.showModal({
											title: '提示',
											content: '提交后无法修改，是否提交',
											success: function(res) {

												if (res.confirm) {
													uni.showLoading({
														title: '提交中...'
													})
													that.test.post('order/make_order', { //http://192.168.0.156:8080/api/bizcust/
														org_id: that.companyId,
														manager_id: that.myManagerId,
														manager_name: that.myManager,
														customer_name: that.buyCompany,
														customer_id: that.buyCompanyID,
														oil_type: that.productOil,
														// get_type: that.getTpe,
														pay_type: that.modePay,
														count: that.count,
														ship_addr: that.address,
														remark: that.Remarks,
													}).then(res => {
														console.log(res)
														uni.hideLoading()
														if (res.statusCode == 200 && res.data.errorCode == 0) {
															uni.redirectTo({
																url: '../orderList/orderList'
															})
														} else if (res.data.errorCode == 10001 || res.data.errorCode == 10002 || res.data.errorCode == 10003) {
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
														} else {
															uni.showToast({
																title: res.data.message,
																icon: "none",
																position: 'bottom',
															})
														}
													}).catch(err => {
														uni.hideLoading();
														uni.showToast({
															title: '提交失败',
															icon: 'none',
															position: 'bottom',
														})
														console.log(err)
													})
												} else {
													return;
												}
											}
										})
									
									}
								}






								//购油数量	
							} else {
								uni.showToast({
									title: '请输入购油数量',
									icon: 'none',
									position: 'bottom',
								})
							}
							//付款方式
						} else {
							uni.showToast({
								title: '请选择付款方式',
								icon: 'none',
								position: 'bottom',
							})
						}
						//提油	方式
						// } else {
						// 	uni.showToast({
						// 		title: '请选择提油方式',
						// 		icon: 'none',
						// 		position: 'bottom',
						// 	})
						// }
						//油品	
					} else {
						uni.showToast({
							title: '请选择油品',
							icon: 'none',
							position: 'bottom',
						})
					}
				} else {
					uni.showToast({
						title: '请选择客户经理',
						icon: "none",
						position: 'bottom',
					})
				}




			},
		},

		components: {
			mButton,
			infoText,
			// uniIcon
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
		color: #616161;
	}

	.m-info text {
		width: 4rem;
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
		color: #616161;
	}

	.footmodel .modelmain text {
		display: block;
		background-color: #fff;
		padding: 13px;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		font-size: 18px;
		color: #616161;
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
		color: #616161;
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
		margin-bottom: 1px;
		/* position: fixed;
		left: 0;
		top: 78px; */
	}

	.search_input {
		background-color: #e5e5e5;
		border-radius: 14px;
		width: 100%;
		padding: 4px 15px;
	}

	.self_header_position {
		position: fixed;

		left: 0;
	}

	.company_content {
		margin-top: 55px;
	}

	.color9 {
		color: #666666;
	}

	.colorRed {
		color: red;
	}
	.harvests-address {
		width: 100%;
		padding: 10px 10px 10px 0;
	/* 	border-bottom: 1px solid #e5e5e5; */
		color: #757575;
	
	}
</style>
