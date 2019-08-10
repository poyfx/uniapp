<template>
	<view class="content">
		<view class="fget-num paddingLeft15">
			<infoImg :imgText="text.user" :disabled="text.disabled" :placeholder="text.userP" v-model="info.user" @chooseUser="chooseUser"></infoImg>
			<infoImg :imgText="text.company" :disabled="text.disabled" :placeholder="text.companyP" @oilByCompany="oilByCompany"
			 v-model="info.company"></infoImg>
			<infoText :textValue="text.userName" :placeholder="text.userNameP" v-model="info.userName"></infoText>
			<infoText :textValue="text.userId" :placeholder="text.userIdP" v-model="info.userId"></infoText>
			<infoText :textValue="text.phoneNum" :placeholder="text.phoneNumP" v-model="info.userPhoneNum"></infoText>
			<infoText :textValue="text.city" :placeholder="text.cityP" v-model="info.userCity"></infoText>
			<infoImg :imgText="text.customerName" :placeholder="text.customerNameP" :disabled="text.disabled" class="noneB"
			 v-model="info.customer" @chooseCustomer="chooseCustomer"></infoImg>
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
					<view class="modelmain">
						<text>请选择角色</text>
						<view @tap="buyAndCarry" id='购油人'>购油人</view>
						<view @tap="buyAndCarry" id='提油人'>提油人</view>
						<view @tap="buyAndCarry" id='购油人和提油人'>购油人和提油人</view>
					</view>
					<view class="modelfooter">
						<view @tap="chooseUsersShow">取消</view>
					</view>
				</view>
			</transition>
		</view>
		<!-- 公司 -->
		<view v-show="showCompany" class="companyCustomer">
			<view class="flex title">
				<image src="../../static/img/back.png" mode="aspectFit" @tap="showCompany = !showCompany"></image>
				<text>选择公司</text>
			</view>
			<view class="search flex">
				<input type="text" value="" placeholder="搜索" @input="searchCompany" v-model="inputValue" />
			</view>
			<view class="content " style="margin:50px 0 49px;">
				<view class="customerCompany" @tap="chooseCompany(index,item.id)" v-for="(item,index) in datas" :key="item.id">
					<view>{{item.id}}</view>
					<view>{{item.name}}</view>
					<view>{{item.addr}}</view>
				</view>
			</view>
			<view class="loading" @tap="mores" v-show="Cmore">
				<view>
					<image src="/../static/img/loading.png" mode="aspectFit" style="width: 8px ;height: 8px;"></image>&nbsp; 点击加载更多...
				</view>
			</view>
		</view>
		<!-- 客户经理 -->
		<view v-show="showCoutomer" class="companyCustomer">
			<view class="flex title">
				<image src="../../static/img/back.png" mode="aspectFit" @tap="showCoutomer = !showCoutomer"></image>
				<text>选择客户经理</text>
			</view>
			<view class="search flex">
				<input type="text" value="" placeholder="搜索" v-model="value" @input="searchCustomer" />
			</view>
			<view class="content" style="margin:50px 0 49px;">
				<view class="customerCompany" @tap="chooseCustomers(index,item.id)" v-for="(item,index) in datas" :key="item.id">
					<view>{{item.realname}}</view>
					<view>{{item.phone}}</view>
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
	import infoImg from '../../components/m-info-img/m-info-img'
	import setPassword from "../../components/setPassword/setPassword"
	import mButton from '../../components/m-button.vue'
	export default {
		data() {
			return {
				text: {
					user: '角色',
					userName: '姓名',
					userId: '身份证',
					company: '公司',
					phoneNum: '手机',
					city: '所在城市',
					customerName: '客户经理',
					disabled: true,
					userP: '请选择角色',
					companyP: '选择公司',
					userNameP: '姓名',
					userIdP: '身份证号码',
					phoneNumP: '电话号码',
					cityP: '所在城市',
					customerNameP: '请选择客户经理',
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
				showCompany: false,
				showCoutomer: false,
				users: false, //角色选择显示隐藏
				value: "",
				datas: [],
				inputValue: "",
				Cpage: 1,
				page: 1,
				pageSize: 10,
				Cmore: true,
				more: true
			}
		},

		methods: {
			//点击角色
			chooseUser() {
				this.users = !this.users;
			},
			userNameBlur(e) {
				console.log(e)
			},
			// 下一步
			goPositive() {

				const _this = this.info
				console.log(_this.userName)
				if (_this.user !== '' && _this.user !== null) {
					if (_this.company !== '' && _this.company !== null) {
						if (_this.userName !== '' && _this.userName !== null) {
							if (_this.userId !== '' && _this.userId !== null) {
								if (_this.userId.length == 18) {
									if (_this.userPhoneNum !== '' && _this.userPhoneNum !== null) {
										// 判断手机号码
										if (!/^1[3456789]\d{9}$/.test(_this.userPhoneNum)) {
											return uni.showToast({
												"title": '请填写正确的手机号码',
												"icon": "none"
											})
										} else if (_this.userCity !== '' && _this.userCity !== null) {
											if (_this.customer !== '' && _this.customer !== null) {
												if (_this.newPwd1 !== '' && _this.newPwd1 !== null) {
													console.log(_this.newPwd1.length, _this.userId.length)
													if (_this.newPwd1.length >= 6) {
														if (_this.newPwd1 === _this.newPwd2) {
															console.log(_this.user)
															if (_this.user == '购油人') {
																this.info.role = 1;
																uni.setStorage({
																	key: 'register',
																	data: this.info,
																	success: function() {
																		uni.navigateTo({
																			url: "positive/positive1?name=" + "register",
																			success: res => {

																			}
																		})
																	}
																})

															} else if (_this.user == '购油人和提油人') {
																this.info.role = 3;
																uni.setStorage({
																	key: 'register',
																	data: this.info,
																	success: function() {
																		uni.navigateTo({
																			url: "positive/positive?name=" + "register",
																			success: res => {
																
																			}
																		})
																	}
																})
															} else if (_this.user == '提油人') {
																this.info.role = 2;
																uni.setStorage({
																	key: 'register',
																	data: this.info,
																	success: function() {
																		uni.navigateTo({
																			url: "positive/positive2?name=" + "register",
																			success: res => {
																
																			}
																		})
																	}
																})
															}


															// 判断密码是否一致	
														} else {
															return uni.showToast({
																title: '两次密码不一致'
															})
														}
													} else {
														return uni.showToast({
															title: '密码最小不能少于6位',
															icon: 'none'
														})
													}
													// 判断密码	
												} else {
													return uni.showToast({
														title: '密码不能为空',
														icon: 'none'
													})
												}
												// 判断是否选择客户经理
											} else {
												return uni.showToast({
													title: '请选择客户经理',
													icon: 'none'
												})
											}
											// 判断城市是否填写	
										} else {
											return uni.showToast({
												title: '所在城市不能为空',
												icon: 'none'
											})
										}
									} else {
										return uni.showToast({
											title: '手机号码不能为空',
											icon: 'none'
										})
									}
									//判断身份证号码位数是否18位
								} else {
									return uni.showToast({
										title: '请填写18位身份证号码',
										icon: 'none'
									})
								}
								//判断身份证号码
							} else {
								return uni.showToast({
									title: '身份证号码不能为空',
									icon: 'none'
								})
							}
							//判断姓名是否填写
						} else {
							return uni.showToast({
								title: '姓名不能为空',
								icon: 'none'
							})
						}
						//判断公司是否选择
					} else {
						return uni.showToast({
							title: '请选择公司',
							icon: 'none'
						})
					}
					//判断角色是否选择
				} else {
					return uni.showToast({
						title: '请选择角色',
						icon: 'none'
					})
				}




			},
			//选择公司
			oilByCompany() {
				this.getCompanyInfo()
				this.showCompany = !this.showCompany;
			},
			// 选中公司
			chooseCompany(e, id) {
				this.info.companyId = id;
				this.info.company = this.datas[e].addr
				this.showCompany = !this.showCompany
			},
			//公司输入框搜索
			searchCompany() {
				this.Cpage = 1
				if (this.inputValue !== '' && this.inputValue !== null) {
					this.getCompanyInfo()
					// 					this.test.post('base/listCustCompany', {
					// 						search: this.inputValue,
					// 						page: this.Cpage,
					// 						pageSize: this.pageSize,
					// 					}).then(res => {
					// 						console.log(res)
					// 
					// 						if (res.statusCode == 200 && res.data.errorCode == 0) {
					// 							console.log(res.data.value.length)
					// 							if (res.data.value.length < 10) {
					// 								this.Cmore = false
					// 							}
					// 							this.datas = res.data.value;
					// 							if (res.data.value.length === 0) {
					// 								uni.showToast({
					// 									title: '没有更多了',
					// 									icon: 'none'
					// 								})
					// 							}
					// 						} else {
					// 
					// 						}
					// 					}).catch(err => {
					// 						console.log(err)
					// 					})
				} else if (this.inputValue == '' && this.inputValue == null) {
					this.getCompanyInfo()
				}
			},
			// 获取公司信息
			getCompanyInfo() {
				console.log(this.Cpage, this.pageSize)
				this.test.post('base/listCustCompany', {
					search: this.inputValue,
					page: this.Cpage,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						console.log(res.data.value.length)
						this.datas = res.data.value;
						// if (res.data.value.length == 0) {} else

						if (res.data.value.length < 10 && res.data.value.length > 0) {
							this.Cmore = false;
							uni.showToast({
								title: '没有更多了',
								icon: "none"
							})
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},


			//角色选择
			buyAndCarry(e) {
				console.log(e)
				this.info.user = e.target.id;
				this.users = !this.users;
			},
			// 取消
			chooseUsersShow() {
				this.users = !this.users
			},
			// 选择客户经理
			chooseCustomer(e) {
				this.getCustomerInfo();
				this.showCoutomer = !this.showCoutomer;

			},
			chooseCustomers(e, id) {
				this.info.customerId = id;
				this.info.customer = this.datas[e].realname;
				this.showCoutomer = !this.showCoutomer
			},
			// 搜索客户经理
			searchCustomer() {
				this.page = 1;
				if (this.value !== '' && this.value !== null) {
					this.getCustomerInfo();
					// 					this.test.post('base/listCustManager', {
					// 						search: this.value,
					// 						page: this.page,
					// 						pageSize: this.pageSize,
					// 					}).then(res => {
					// 						console.log(res)
					// 						if (res.statusCode == 200 && res.data.errorCode == 0) {
					// 							// console.log(res.data.value.length)
					// 							this.datas = res.data.value;
					// 							if (res.data.value.length === 0) {
					// 								uni.showToast({
					// 									title: '没有更多了',
					// 									icon: 'none'
					// 								})
					// 							}
					// 						} else {
					// 
					// 						}
					// 					}).catch(err => {
					// 						console.log(err)
					// 					})
				} else if (this.inputValue == '' && this.inputValue == null) {
					this.getCompanyInf()
				}
			},
			//获取客户经理
			getCustomerInfo() {
				console.log(this.page, this.pageSize)
				this.test.post('base/listCustManager', {
					search: this.value,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)

					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.datas = res.data.value;
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
				}).catch(err => {
					console.log(err)
				})
			},
			// 点击加载更多
			Smore() {
				this.page += 1;
				this.getCustomerInfo()
			},
			mores() {
				this.Cpage += 1;
				this.getCompanyInfo()
			},
		},
		components: {
			infoText,
			infoImg,
			setPassword,
			mButton
		},

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

	.search {
		width: 100%;
		justify-content: center;
		background-color: #fff;
		padding: 12px 15px;
		box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.16);
		position: fixed;
	}

	.search input {
		background-color: #e5e5e5;
		border-radius: 14px;
		width: 100%;
		padding: 4px 15px;

	}

	.customerCompany {
		background-color: #fff;
		padding: 10px 0 20px 15px;
		border-bottom: 1px solid #d6d6d6;
		font-size: 14px;
		color: #666;
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
</style>
