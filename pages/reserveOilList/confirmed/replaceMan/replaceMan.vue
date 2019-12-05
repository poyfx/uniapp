<template>
	<view class="replace_info bgcf">
		<view class="replace_info_img_content">
			<view class="replace_info_img" v-show="!showimg" @tap="uploadphoto">
				<uni-icons type="plusempty" size="100" color="#999999"></uni-icons>

			</view>
			<view class="replace_info_img" v-show="showimg" @tap="uploadphoto">
				<image :src="src" mode="aspectFit"></image>
			</view>
			<text @tap="takephoto">查看头像示例</text>
		</view>
		<view class="replace_info_content">
			<view class="replace_info_list flex">
				<text>姓名</text>
				<input type="text" placeholder="真实姓名" v-model="repace_name" />
			</view>
			<view class="replace_info_list flex">
				<text>身份证</text>
				<input type="text" placeholder="身份证号码" v-model="repace_ID" />
			</view>
			<view class="replace_info_list flex">
				<text>手机号</text>
				<input type="text" placeholder="手机号码" v-model="repace_phone" />
			</view>
			<view class="read ;">
				<label class="radio">
					<radio value="已阅读" :checked='checked' @tap="cancel" />
				</label>
				<text>已阅读</text>
				<text style="color: #009DFF; ;" @tap="exemption">《{{type}}免责条款》</text>
			</view>
		</view>
		<view class="replace_info_btn_content">
			<button class="oilCodeBtn oilCodeBtnAll" v-show="checkes" @tap="send">发送</button>
			<button type="primary" class="oilCodeBtnAll m-btn" v-show="!checkes" @tap="send">发送</button>
		</view>
	</view>
</template>

<script>
	import example from '@/static/img/example_people.png'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				showimg: false,
				src: '',
				checked: false,
				checkes: true,
				repace_name: '',
				repace_ID: '',
				repace_phone: '',
				num: '', //提油数量,
				orderNumber: '', //订单编号
				oil_type: '', //油品类型
				Token: '',
				id: '', //订单ID
				name: '', //区分进入页面
				type:'',//免责条款名字
			}
		},
		onLoad(option) {
			this.num = option.number;
			this.orderNumber = option.no;
			this.oil_type = option.type;
			this.id = option.id;
			this.name = option.name,
			this.getToken();
			if(this.name !== "invoice"){
				return this.type = '代提油'
			}
			return this.type = '代领发票'
		},
		methods: {
			getToken() {
				const that = this;
				uni.getStorage({
					key: 'Token',
					success(res) {
						that.Token = res.data;
					}
				})
			},
			cancel() {
				this.checked = !this.checked;
				this.checkes = !this.checkes
			},
			takephoto() {
				uni.previewImage({
					urls: [example],
				})
			},
			uploadphoto() {
				const that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						console.log(res)
						that.src = res.tempFilePaths[0]
						that.showimg = true;
					},
					fail() {
						console.log(res)
					}
				})
			},
			exemption() {
				
				uni.navigateTo({
					url: '../exemption/exemption?name='+this.type
				})
			},
			send() {

				if (this.checkes == true) {
					// Toast("请阅读免责条款,勾选后方可发送");
					return uni.showToast({
						title: "请阅读免责条款,勾选后方可发送",
						icon: "none",
						position: 'bottom',
					})
				} else {

					if (this.src !== '') {
						if (this.repace_name !== '') {
							if (this.repace_ID !== '') {
								if (this.repace_ID.length == 18) {
									if (this.repace_phone !== '') {
										if (!/^1[3456789]\d{9}$/.test(this.repace_phone)) {
											return uni.showToast({
												"title": '手机号输入有误，请输入11位阿拉伯数字',
												"icon": "none",
												position: 'bottom',
											})
										} else {
											
											// 预约提油
											if (this.name !== 'invoice') {
												var _url = 'http://dev.pjy.name:8170/api/bizcust/'
											//	var _url = 'http://192.168.0.156:9494/api/bizcust/'
												uni.uploadFile({
													url: _url + 'reserve/instead_get_oil',
													filePath: this.src,
													name: 'exp_photo',
													formData: {
														'no': this.orderNumber,
														'name': this.repace_name,
														'phone': this.repace_phone,
														'id_card': this.repace_ID,
														'oil_type': this.oil_type,
														'num': this.num,
														'id': this.id
													},
													header: {
														Token: this.Token
													},
													success(res) {

														var data = JSON.parse(res.data)
														console.log(data)
														if (res.statusCode == 200 && data.errorCode == 0) {
															uni.showToast({
																title: '发送成功',
																position: 'bottom',
																success() {
																	var timer = setInterval(function() {
																		clearInterval(timer)
																		uni.hideToast();
																		uni.navigateBack({
																			delta:2
																		})
																		// uni.navigateTo({
																		// 	url: '../../reserveOilList'
																		// })
																	}, 1500)

																}
															})
														}else if(res.errorCode==-1){
															uni.showToast({
																title: data.message,
																icon: 'none',
																position:'bottom'
															})
														} else {
															uni.showToast({
																title: data.message,
																icon: 'none',
																position:'bottom'
															})
														}
													},

												})

											}else{
												//发票领取
													var _url = 'http://dev.pjy.name:8170/api/bizcust/'
												//	var _url = 'http://192.168.0.156:8080/api/bizcust/'
													const that = this;
												uni.uploadFile({
												
													url: _url + 'order/bizcust_invoice',
													filePath: this.src,
													name: 'face_photo',
													formData: {
														'no': this.orderNumber,
														'name': this.repace_name,
														'phone': this.repace_phone,
														'id_card': this.repace_ID,
													},
													header: {
														Token: this.Token
													},
													success(res) {
												
														var data = JSON.parse(res.data)
														console.log(data)
														if (res.statusCode == 200 && data.errorCode == 0) {
															uni.showToast({
																title: '发送成功',
																position: 'bottom',
																success() {
																	var timer = setInterval(function() {
																		clearInterval(timer)
																		uni.hideToast();
																		uni.navigateBack({
																			delta:2
																		})
																		// ({
																		// 	url:'../../../receiveInvoice/receiveIntaile/receiveIntaile?id='+that.id+'&no='+that.orderNumber
																		// })
																	}, 1500)
												
																}
															})
														} else if(res.errorCode==-1){
															uni.showToast({
																title: data.message,
																icon: 'none',
																position:'bottom'
															})
														}else {
															uni.showToast({
																title: data.message,
																icon: 'none',
																position:'bottom'
															})
														}
													},
												
												})
										
											}


										}
									} else {
										return uni.showToast({
											title: "请填写手机号码",
											"icon": "none"
										})
									}
								} else {
									uni.showToast({
										title: "身份证号有误，请输入18位身份证号",
										icon: 'none',
										position: 'bottom',
									});

								}

							} else {
								uni.showToast({
									title: '请填写替代人的身份证号码',
									icon: 'none',
									position: 'bottom',
								})
							}
						} else {
							uni.showToast({
								title: '请填写替代人的真实姓名',
								icon: 'none',
								position: 'bottom',
							})
						}

					} else {
						uni.showToast({
							title: '请上传替代人的真实照片',
							icon: 'none',
							position: 'bottom',
						})
					}


				}


			}
		},
	}
</script>

<style>
	.replace_info {
		height: 100vh;
	}

	.replace_info_img_content {
		width: 100%;
		padding: 20px 0;
		text-align: center;
	}

	.replace_info_img {
		width: 400upx;
		height: 400upx;
		margin: 0px auto 15px;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
	}

	.replace_info_img image {
		width: 200px;
		height: 200px;
	}

	.replace_info_img_content text {
		color: #00A8FF;
		font-size: 0.8rem;
	}

	.replace_info_content {
		width: 100%;
		padding: 0 15px 0 16px;
	}

	.replace_info_list {
		margin: 10px 0;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}

	.replace_info_list text {
		width: 3.5em;
		font-size: 1rem;
		margin-right: 15px;
	}

	.replace_info_list input {
		border: 1px solid #D9D9D9;
		border-radius: 0.2rem;
		flex: 1;
		padding: 10px 0 10px 15px;
	}

	.read text {
		font-size: 0.8rem;
	}

	.replace_info_btn_content {
		margin: 45px 0 15px 0;
	}


	.oilCodeBtnAll {
		width: 90%;
		background-color: #00A8FF;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
	}

	.oilCodeBtn {
		background: rgba(0, 0, 0, 0.2);
		color: #fff;

	}
</style>
