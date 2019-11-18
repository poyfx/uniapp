<template>
	<view class="" style="width: 100%; height: 100%;">
		<view class="self_header ">
			<view class="self_header_bar">
				<view class="top_view"></view>
			</view>
			<view class="title_content">
				<view class="self_header_title flex">
					<view class="leftBtn" @tap="back">
						<uni-icons type="arrowleft" size="27"></uni-icons>
					</view>
					<view>注册</view>
				</view>
			</view>
		</view>
		<view class="">

			<view class="fget-num paddingLeft15">
				<view class="flex  m-info" @tap="chooseUser">
					<view class="flex center m-info-content">
						<text>角色</text>
						<input type="text" placeholder="请选择角色" class="infoText" v-model="info.user" disabled="disabled" />
						<image src="../../static/img/right.png" mode="aspectFit"></image>
					</view>
				</view>

				<infoImg :imgText="text.company" :disabled="text.disabled" :placeholder="text.companyP" @oilByCompany="oilByCompany"
				 v-model="info.company"></infoImg>

				<infoText :textValue="text.customerName" :placeholder="text.customerNameP" :disabled="text.disabled" class="noneB"
				 v-model="info.customer"></infoText> <!-- 点击获取客户经理@chooseCustomer="chooseCustomer" -->


				<infoImg :imgText="text.city" :placeholder="text.cityP" :disabled="text.disabled" v-model="info.userCity"
				 @chooseCustomer="chooseCitys" v-if="!cityValue"></infoImg>

				<infoText :textValue="text.city" :placeholder="text.cityP" :disabled="text.disabled" v-model="info.userCity" v-if="cityValue"></infoText>
			</view>

			<view class="fget-num paddingLeft15 mTop10">

				<infoText :textValue="text.userName" :placeholder="text.userNameP" v-model="info.userName"></infoText>
				<infoText :textValue="text.userId" :placeholder="text.userIdP" v-model="info.userId"></infoText>
				<infoText :textValue="text.phoneNum" :placeholder="text.phoneNumP" :disabled="text.disabled" v-model="info.userPhoneNum"></infoText>


				<setPassword :textValue="pws.textValue" :placeholder="pws.placeholder" v-model="info.newPwd1"></setPassword>
				<setPassword :textValue="pws.newTextValue" :placeholder="pws.newPlaceholder" v-model="info.newPwd2"></setPassword>
			</view>
			<view class="mTop20">
				<mButton :value="btn.value" :type="btn.type" @goPositive="goPositive"></mButton>
			</view>
			<!-- 角色 -->
			<view class="footmodel" v-show='users'>
				<transition name="myanimate">
					<view class="footermain">
						<view class="modelmains">
							<text>请选择角色(多选)</text>
							<!-- <view @tap="buyAndCarry" id='购油人'>购油人</view>
							<view @tap="buyAndCarry" id='提油人'>提油人</view>
							<view @tap="buyAndCarry" id='购油人和提油人'>购油人和提油人</view> -->
							<view class="uni-list">
								<checkbox-group @change="checkboxChange">
									<label class="flex user-list" v-for="item in items" :key="item.id">
										<view>
											<checkbox :value="item.value" :checked="item.checked" />
										</view>
										<view>{{item.name}}</view>
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="modelfooter">
							<view @tap="chooseUsersShow" style="border-right: 1px solid #e5e5e5; font-size: 18px;">取消</view>
							<view style="color: #009dff; font-size: 18px;" @tap="buyAndCarry">确认</view>
						</view>
					</view>
				</transition>
			</view>
			<!-- 公司 -->
			<view v-show="showCompany" class="companyCustomerCity">
				<!-- <view class="flex title">
					<image src="../../static/img/back.png" mode="aspectFit" @tap="showCompany = !showCompany"></image>
					<text>选择公司</text>
				</view> -->
				<view class="self_header ">
					<view class="self_header_bar">
						<view class="top_view"></view>
					</view>
					<view class="self_header_title flex self_header_position">
						<view class="leftBtn" @tap="showCompany =! showCompany">
							<uni-icons type="arrowleft" size="27"></uni-icons>
						</view>
						<view>选择公司</view>
					</view>

				</view>


				<view class="choosemany" :style="{height:scrollheight+'px'}">

					<view class="search flex">
						<input type="text" value="" placeholder="根据编号和公司名称搜索" class="search_input" @input="searchCompany" v-model="inputValue" />
					</view>

					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" :style="{height:scrollheight+'px'}">
						<view class="customerCompany" @tap="chooseCompany(index,item.id)" v-for="(item,index) in datas" :key="item.id">
							<view>{{item.num}}</view>
							<view>{{item.name}}</view>
							<view>{{item.addr}}</view>
						</view>


					</scroll-view>
					<view class="loading" @tap="mores" v-show="Cmore">
						<view>
							<image src="/../static/img/loading.png" mode="aspectFit" style="width: 8px ;height: 8px;"></image>&nbsp;
							点击加载更多...
						</view>
					</view>
				</view>

			</view>
			<!-- 客户经理 -->
			<view v-show="showCoutomer" class="companyCustomerCity">
				<!-- <view class="flex title">
					<image src="../../static/img/back.png" mode="aspectFit" @tap="showCoutomer = !showCoutomer"></image>
					<text>选择客户经理</text>
				</view -->
				<view class="self_header ">
					<view class="self_header_bar">
						<view class="top_view"></view>
					</view>
					<view class="self_header_title flex self_header_position">
						<view class="leftBtn" @tap="showCoutomer =! showCoutomer">
							<uni-icons type="arrowleft" size="27"></uni-icons>
						</view>
						<view>选择客户经理</view>
					</view>
				</view>

				<view class=" choosemany">
					<view class="search flex">
						<input type="text" value="" placeholder="根据客户经理名称搜索" class="search_input" v-model="value" @input="searchCustomer" />
					</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
						<view class="customerCompany" @tap="chooseCustomers(index,item.id)" v-for="(item,index) in man" :key="item.id">
							<view>{{item.realname}}</view>
							<view>{{item.phone}}</view>
							<view>
								{{item.departmentText}}
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="loading" @tap="Smore" v-show="more">
					<view>
						<img src="../../static/img/loading.png" alt /> &nbsp; 点击加载更多...
					</view>
				</view>
			</view>

			<!-- 城市 -->
			<view v-show="showCity" class="companyCustomerCity">
				<!-- <view class="flex title">
					<image src="../../static/img/back.png" mode="aspectFit" @tap="showCompany = !showCompany"></image>
					<text>选择公司</text>
				</view> -->
				<view class="self_header ">
					<view class="self_header_bar">
						<view class="top_view"></view>
					</view>
					<view class="self_header_title flex self_header_position">
						<view class="leftBtn" @tap="showCity =! showCity">
							<uni-icons type="arrowleft" size="27"></uni-icons>
						</view>
						<view>选择城市</view>
					</view>
				</view>
				<!-- <view class="search flex">
					<input type="text" value="" placeholder="搜索" class="search_input" @input="searchCompany" v-model="inputValue" />
				</view> -->
				<view class=" choosemany" style="padding-top: 54px;">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" style="height100%">
						<view class="customerCompany" @tap="chooseCity(index,item.id)" v-for="(item,index) in cityDatas" :key="index">
							<!-- 	<view>{{item.id}}</view> -->
							<view>{{item.name}}</view>
							<!-- <view>{{item.addr}}</view> -->
						</view>
					</scroll-view>
				</view>
				<!-- <view class="loading" @tap="mores" v-show="Cmore">
					<view>
						<image src="/../static/img/loading.png" mode="aspectFit" style="width: 8px ;height: 8px;"></image>&nbsp; 点击加载更多...
					</view>
				</view> -->
			</view>
		</view>
	</view>

</template>

<script>
	import infoText from '../../components/m-info-text/m-info-text'
	import infoImg from '../../components/m-info-img/m-info-img'
	import setPassword from "../../components/setPassword/setPassword"
	import mButton from '../../components/m-button.vue'
	import titles from '../../components/title.vue'
	// import uniIcon from '../../components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				titles: "注册",
				text: {
					// user: '角色',
					userName: '姓名',
					userId: '身份证',
					company: '公司',
					phoneNum: '手机',
					city: '所在城市',
					customerName: '客户经理',
					disabled: true,
					// userP: '请选择角色',
					companyP: '选择公司',
					userNameP: '请输入真实姓名',
					userIdP: '请输入身份证号码',
					phoneNumP: '电话号码',
					cityP: '客户经理所在城市',
					customerNameP: '根据选择的公司进行分配',
					disabled: true
				},
				pws: {
					textValue: '登录密码',
					newTextValue: '确认密码',
					placeholder: '请输入密码',
					newPlaceholder: '请在此输入密码',
				},
				info: {
					user: '',
					role: '',
					company: '',
					companyId: '',
					userName: '',
					userId: '',
					userPhoneNum: '',
					userCity: '',
					customer: '',
					customerId: '',
					newPwd1: '',
					newPwd2: ''

				},
				btn: {
					type: 'primary',
					value: '下一步',
				},
				items: [{
					id: '1',
					value: '购油人',
					name: '购油人'
				}, {
					id: '2',
					value: '提油人',
					name: '提油人'
				}, {
					id: '3',
					value: '发票领取人',
					name: '发票领取人'
				}],
				showCompany: false,
				showCoutomer: false,
				users: false, //角色选择显示隐藏
				value: "",
				datas: [], //公司集合
				man: [], //客户经理集合
				inputValue: "",
				Cpage: 1,
				page: 1,
				pageSize: 10,
				Cmore: false, //公司查看更多
				more: false, //客户经理查看更多
				checkUser: '',
				showCity: false, //城市页面
				cityDatas: [], //城市集合
				ciytId: '', //城市ID
				scrollTop: 0,
				old: {
					scrollTop: 0,
				},
				cityValue: true,
				phoneHeight: '',
				scrollheight: ''
			}
		},
		onLoad(option) {
			const that = this;
			this.info.userPhoneNum = option.number;
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
					that.scrollheight = that.phoneHeight - 44 - 44 - 25 - 49
				}
			});
			//#ifdef APP-PLUS  
			//#endif
		},
		methods: {
			//点击角色
			chooseUser() {
				this.users = !this.users;
			},
			userNameBlur(e) {
				// console.log(e)
			},

			//选择公司
			oilByCompany() {
				this.getCompanyInfo();
				this.Cmore = true;
				this.datas = [];
				this.inputValue = '';
				this.showCompany = !this.showCompany;
				uni.showLoading({
					title: '加载中...'
				})
			},
			// 选中公司
			chooseCompany(e, id) {
				this.info.companyId = id;
				this.info.company = this.datas[e].name;
				this.showCompany = !this.showCompany;
				this.getCustmerCity()

			},
			//公司输入框搜索
			searchCompany() {
				this.Cpage = 1
				if (this.inputValue !== '' && this.inputValue !== null) {
					this.datas = [];
					this.getCompanyInfo()
				} else {
					this.inputValue = '';
					this.datas = [];
					this.getCompanyInfo()
				}
			},
			// 获取公司信息
			getCompanyInfo() {
				this.test.post('base/regist/listCustCompany', {
					search: this.inputValue,
					page: this.Cpage,
					pageSize: this.pageSize
				}).then(res => {
					uni.hideLoading()
					// console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						// console.log(res)
						res.data.value.forEach(el => {
							this.datas.push(el);
						})
						if (res.data.value.length < 10 && res.data.value.length >= 1) {
							this.Cmore = false;

						} else if (res.data.value.length < 1) {
							this.Cmore = false;
							uni.showToast({
								title: '没有更多了',
								icon: "none",
								position:'bottom',
							})
						}
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: '加载失败',
						icon: 'none',
						position:'bottom',
					})
					console.log(err)
				})
			},
			// 通过所选城市获取客户经理&&城市
			getCustmerCity() {
				this.test.post('base/regist/getCustomerData', {
					customer_id: this.info.companyId
				}).then(res => {
					 console.log(res)
					this.info.customer = res.data.value.manager_name;
					this.info.userCity = res.data.value.city;
					if (this.info.userCity == '' || this.info.userCity == null) {

						this.cityValue = false;

					} else {

						this.cityValue = true;
					}
				}).catch(err => {
					console.log(err);
				})
			},

			//角色选择
			buyAndCarry() {
				
				console.log(this.checkUser)
				var str = String(this.checkUser)
				// if(str == '发票领取人,购油人'){
				// 	console.log(100)
				// 	this.info.user = '购油人,发票领取人'
					
				// }else if(str == '发票领取人,提油人'){
				// 	console.log(99)
				// 	this.info.user = '提油人,发票领取人'
					
				// }else if(str == '提油人,购油人'){
				// 	console.log(98)
				// 	this.info.user = '购油人,提油人'
				// };
				this.info.user = String(this.checkUser);
				
				this.users = !this.users;
			},
			checkboxChange(e) {
				this.info.user = ''
				 console.log(e)
				this.checkUser = e.target.value;
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},


			// 取消
			chooseUsersShow() {
				this.users = !this.users
			},
			//选择市
			getCityInfo() {
				this.test.post('base/regist/listUserCity').then(res => {
					// console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						res.data.value.forEach(el => {
							this.cityDatas.push(el);
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//选择城市
			chooseCitys() {
				this.cityDatas = [];
				this.showCity = !this.showCity;
				this.getCityInfo();
			},
			chooseCity(index, id) {
				this.showCity = !this.showCity;
				this.info.userCity = this.cityDatas[index].name;
				this.ciytId = id;
				this.page = 1;
				// this.test.post('order/listManagers', {
				// 	search: this.value,
				// 	org_id: this.ciytId,
				// 	size: this.page,
				// 	pageSize: this.pageSize
				// }).then(res => {
				// 	console.log(res)
				// 	this.info.customer = res.data.value[0].realname
				// 	this.info.customerId = res.data.value[0].id
				// }).catch(err => {})
			},


			// 选择客户经理
			// chooseCustomer(e) {
			// 	this.page = 1;
			// 	this.more = true;
			// 	this.value = '';
			// 	this.man = [];
			// 	if (this.ciytId !== '') {
			// 		uni.showLoading({
			// 			title: '加载中...'
			// 		})
			// 		this.getCustomerInfo();
			// 		this.showCoutomer = !this.showCoutomer;
			// 	} else {
			// 		uni.showToast({
			// 			title: '请选择所在城市',
			// 			icon: 'none'
			// 		})
			// 	}
			// },
			// chooseCustomers(e, id) {
			// 	this.info.customerId = id;
			// 	this.info.customer = this.man[e].realname;
			// 	this.showCoutomer = !this.showCoutomer
			// },
			// 搜索客户经理
			// searchCustomer() {
			// 	this.page = 1;
			// 	if (this.value !== '' && this.value !== null) {
			// 		this.man = [];
			// 		this.getCustomerInfo();
			// 	} else {
			// 		this.page = 1;
			// 		this.value = '';
			// 		this.man = [];
			// 		this.getCustomerInfo();
			// 	}
			// },
			// //获取客户经理
			// getCustomerInfo() {

			// 	console.log(this.page, this.pageSize)
			// 	this.test.post('order/listManagers', {
			// 		search: this.value,
			// 		org_id: this.ciytId,
			// 		size: this.page,
			// 		pageSize: this.pageSize
			// 	}).then(res => {
			// 		uni.hideLoading();
			// 		console.log(res)

			// 		if (res.statusCode == 200 && res.data.errorCode == 0) {
			// 			console.log(res)
			// 			res.data.value.forEach(el => {

			// 				this.man.push(el)
			// 			})


			// 			if (res.data.value.length < 10) {
			// 				this.more = false;
			// 			} else if (res.data.value.length <= 0) {
			// 				this.more = false;
			// 				uni.showToast({
			// 					title: '没有更多了',
			// 					icon: "none"
			// 				})
			// 			}
			// 		}
			// 	}).catch(err => {
			// 		uni.hideLoading();
			// 		uni.showToast({
			// 			title: '加载失败',
			// 			icon: 'none'
			// 		})
			// 		console.log(err)
			// 	})
			// },
			// 点击加载更多
			Smore() {
				this.page += 1;
				this.getCustomerInfo()
				uni.showLoading({
					title: '加载中...'
				})
			},
			mores() {
				uni.showLoading({
					title: '加载中...'
				})
				this.Cpage += 1;
				this.getCompanyInfo()
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 下一步
			goPositive() {

				const that = this;
				const _this = this.info;
				// console.log(_this.userName)
				if (_this.user !== '' && _this.user !== null) {
					if (_this.company !== '' && _this.company !== null) {
						if (_this.userCity !== '' && _this.userCity !== null) {
							if (_this.userName !== '' && _this.userName !== null) {
								if (_this.userId !== '' && _this.userId !== null) {
									if (_this.userId.length == 18) {
										if (_this.userPhoneNum !== '' && _this.userPhoneNum !== null) {
											// 判断手机号码
											if (!/^1[3456789]\d{9}$/.test(_this.userPhoneNum)) {
												return uni.showToast({
													"title": '请填写正确的手机号码',
													"icon": "none",
													position:'bottom',
												})
											} else
												// if (_this.customer !== '' && _this.customer !== null) {
												if (_this.newPwd1 !== '' && _this.newPwd1 !== null) {
													// console.log(_this.newPwd1.length, _this.userId.length)
													if (_this.newPwd1.length >= 6) {
														if (_this.newPwd1 === _this.newPwd2) {
															// console.log(this.checkUser)
															if (this.checkUser.length == 1) {
																// console.log(_this.user)
																if (this.checkUser[0] == '购油人') {
																	this.info.role = '1';

																} else if (this.checkUser[0] == '提油人') {
																	this.info.role = '2';
																} else {
																	this.info.role = '3';
																}
																// console.log(this.info.role)



																uni.setStorage({
																	key: 'register',
																	data: this.info,
																	success: function() {
																		if (that.checkUser[0] == '购油人') {
																			uni.navigateTo({
																				url: "positive/positive1?name=" + "register" + "&user=" + that.checkUser,
																				success: res => {

																				}
																			})
																		} else {
																			uni.navigateTo({
																				url: './uploadFace/uploadFace?name=' + "register" + "&user=" + that.checkUser + "&length=" +
																					that.checkUser.length,
																			})
																		}

																	}
																})

															} else if (this.checkUser.length == 2) {
																console.log(_this.user)
																if (this.checkUser[0] == '购油人' && this.checkUser[1] == '提油人' || this.checkUser[0] == '提油人' && this.checkUser[1] == '购油人') {
																	this.info.user='购油人,提油人'
																	this.info.role = '1,2';
																} else if (this.checkUser[0] == '购油人' && this.checkUser[1] == '发票领取人' || this.checkUser[0] == '发票领取人' && this.checkUser[1] == '购油人') {
																	this.info.user='购油人,发票领取人'
																	this.info.role = '1,3';
																} else if(this.checkUser[0] == '提油人' && this.checkUser[1] == '发票领取人' || this.checkUser[0] == '发票领取人' && this.checkUser[1] == '提油人'){
																		this.info.user='提油人,发票领取人'
																	this.info.role = '2,3';
																}
																console.log(this.info.role)
																uni.setStorage({
																	key: 'register',
																	data: this.info,
																	success: function() {
																		uni.navigateTo({
																			url: "./uploadFace/uploadFace?name=" + "register" + "&user=" + that.checkUser + "&length=" +
																				that.checkUser.length,
																			success: res => {

																			}
																		})
																	}
																})
															} else if (this.checkUser.length == 3) {
																console.log(_this.user)
																this.info.role = '1,2,3';
																console.log(this.info.role)
																uni.setStorage({
																	key: 'register',
																	data: this.info,
																	success: function() {
																		uni.navigateTo({
																			url: "./uploadFace/uploadFace?name=" + "register" + "&user=" + that.checkUser + "&length=" +
																				that.checkUser.length,
																			success: res => {

																			}
																		})
																	}
																})
															}


															// 判断密码是否一致	
														} else {
															return uni.showToast({
																title: '两次密码不一致',
																icon: 'none',
																position:'bottom',
															})
														}
													} else {
														return uni.showToast({
															title: '密码最小不能少于6位',
															icon: 'none',
															position:'bottom',
														})
													}
													// 判断密码	
												} else {
													return uni.showToast({
														title: '密码不能为空',
														icon: 'none',
														position:'bottom',
													})
												}
												// 判断是否选择客户经理
												// } else {
												// 	return uni.showToast({
												// 		title: '请选择客户经理',
												// 		icon: 'none'
												// 	})
												// }
												// 判断城市是否填写	

										} else {
											return uni.showToast({
												title: '手机号码不能为空',
												icon: 'none',
												position:'bottom',
											})
										}
										//判断身份证号码位数是否18位
									} else {
										return uni.showToast({
											title: '请填写18位身份证号码',
											icon: 'none',
											position:'bottom',
										})
									}
									//判断身份证号码
								} else {
									return uni.showToast({
										title: '身份证号码不能为空',
										icon: 'none',
										position:'bottom',
									})
								}
								//判断姓名是否填写
							} else {
								return uni.showToast({
									title: '姓名不能为空',
									icon: 'none',
									position:'bottom',
								})
							}
						} else {
							return uni.showToast({
								title: '所在城市不能为空',
								icon: 'none',
								position:'bottom',
							})
						}
						//判断公司是否选择
					} else {
						return uni.showToast({
							title: '请选择公司',
							icon: 'none',
							position:'bottom',
						})
					}
					//判断角色是否选择
				} else {
					return uni.showToast({
						title: '请选择角色',
						icon: 'none',
						position:'bottom',
					})
				}




			},

		},
		components: {
			infoText,
			infoImg,
			setPassword,
			mButton,
			// uniIcon,
			titles,

		},
		computed: {
			// scrollheight(){
			// 	return this.phoneHeight-44-44-25
			// }
		}

	}
</script>

<style scoped>
	.setpws {
		border-top: 1px solid #e5e5e5;
	}

	.footmodel {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		bottom: 0px;
		left: 0;
	}

	.footmodel .modelmains view {
		background-color: #fff;
		text-align: center;
		font-size: 18px;
		color: #616161;
	}

	.user-list {
		padding: 13px;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		display: flex;
		justify-content: center;
	}

	.footmodel .modelmains text {
		display: block;
		background-color: #fff;
		text-align: center;
		border-bottom: 1px solid #e5e5ee;
		font-size: 18px;
		color: #616161;
		padding: 13px;
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

	.search {
		width: 100%;
		justify-content: center;
		background-color: #fff;
		padding: 12px 15px;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
		margin-bottom: 1px;
		/* position: fixed;
		top: 69px;
		z-index: 1; */
	}

	.search_input {
		background-color: #e5e5e5;
		border-radius: 14px;
		width: 100%;
		padding: 4px 15px;

	}

	.customerCompany {
		background-color: #fff;
		padding: 10px 0 10px 15px;
		border-bottom: 1px solid #d6d6d6;
		font-size: 14px;
		color: #616161;
		line-height: 28px;
	}

	.companyCustomer {
		position: absolute;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.companyCustomerCity {
		position: absolute;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
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
		align-content: center;
		align-items: center;
		align-self: center;
		flex: 1;
	}

	.m-info-content text {
		width: 4rem;
	}

	.m-info-content .infoText {
		color: #616161;
		flex: 1;
	}

	.m-info-text {
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.m-info image {
		width: 12px;
		height: 12px;
		padding-right: 15px;
		margin-left: 10px;
	}

	.self_header_position {
		position: fixed;

		left: 0;
	}

	.scroll-Y {
		position: relative;
	}

	.choosemany {
		/* margin-top: 54px; */
		padding-top: 44px;
		background: #EFEFF4;
		position: relative;
		box-sizing: border-box;
	}
</style>
