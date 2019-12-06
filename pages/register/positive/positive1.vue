<template>
	<!-- 上传三张图片 -->
	<view class="content">
		<view class="step-box">
			<step :value="step.value1" ref="one" :actives="step.active"></step>
			<step :value="step.value2" ref="two" :actives="step.kong"></step>
			<step :value="step.value3" ref="three" :actives="step.kong1"></step>
		</view>
		<form enctype="multipart/form-data" @reset="formReset">
			<view class="fget-num">
				<view class="fget-ul">
					<text v-if="num<2">上传身份证<text style="color: #FF0000;">{{info[num]}}</text> </text>
					<text v-else>上传<text style="color: #FF0000;">{{info[num]}}</text> 授权委托书</text>
					<text class="color-dff" @tap="all">点击上传</text>
				</view>
				<view class="positive">
					<image :src="src" class="idCard" mode="aspectFit"></image>
				</view>
				<view class="tellinfo" @tap="previewImage(num)" v-if="num<2">
					<text>{{tellinfo[num]}}</text>
				</view>
				<view class="tellinfo tellinfos" @tap="previewImage(num)" v-else>
					<text>{{tellinfo[num]}}</text>
				</view>
				<view class="flex  m-info" v-show="btn.stepThree">
					<view class="flex center m-info-content">
						<text>授权书有效期</text>
						<input placeholder="请选择" v-show="times" @tap="changeTimes" disabled="true" style="width: 222px; height: 37.5px;"
						 v-model="inputs" />
						<view class="" style="width: 178px;" v-show="!times">
							<view class="" v-show="!times">
								<view class="" @tap="changeTimes">
									{{day}}
								</view>
							</view>
							<w-picker mode="date" startYear="2019" endYear="2030" :defaultVal="[0,1,3]" :current="true" @confirm="onConfirm"
							 ref="date" themeColor="#00A8FF">
							</w-picker>
						</view>
					</view>
					<view class="flex m-info-text">
						<image src="../../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
					</view>
				</view>
			</view>
		</form>
		<view class="mTop30 mB" v-show="btn.stepOne">
			<mButton :type="btn.type" :value="btn.value" @oneSide="oneSide"></mButton>
		</view>

		<view class="m-two-btn mTop30 mB" v-show="btn.stepTwo">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @lastStep="lastStep" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @nextStep="nextStep" :content="btn.value"></tButton>
		</view>
		<view class="m-two-btn mTop30 mB" v-show="btn.stepThree">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepLast="threeStepLast" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepNext="threeStepNext" :content="btn.commit"></tButton>
		</view>
	</view>

</template>

<script>
	import one from '../../../static/img/positive3x.png'
	import two from '../../../static/img/otherside3x.png'
	import three from '../../../static/img/buyoil.jpg'
	import four from '../../../static/img/getoil.jpg'
	import five from '../../../static/img/getinvoice.jpg'
	import step from '../../../components/step/step'
	import mButton from '../../../components/m-button.vue'
	import tButton from '../../../components/twoButton/twoButton'
	import ruiDatePicker from '../../../rattenking-dtpicker/rattenking-dtpicker.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		mapState
	} from 'vuex'
	import {
		pathToBase64
	} from '../../../common/js/image-tools/index.js'
	import {
		formatDate
	} from "../../../common/js/date.js";
	export default {
		data() {
			return {
				step: {
					value1: '第一步',
					value2: '第二步',
					value3: '第三步',
					active: 'step-active',
					ago: 'step-ago',
					kong: '',
					kong1: '',
				},
				btn: {
					type: 'primary',
					value: '下一步',
					disabled: false,
					content: '上一步',
					commit: '注册',
					stepOne: true,
					stepTwo: false,
					stepThree: false,
				},
				info: [
					"正面",
					"反面",
				],
				tellinfo: ["正面示例", "反面示例", "授权书示例"],
				num: 0,
				count: 0,
				src: one,
				day: '2019-01-01',
				ifday: false,
				times: true,
				idCardZ: '',
				idCardF: '',
				buyOil: '',
				register: '',
				img: [],
				name: '',
				inputs: '',
				mode: 'date', //时间
				userCode: '',
				user: '', //申请角色
				clientID: '', //用户clientid
				faceimg: {
					name: 'face_photo',
					uri: '',
				},
				device:'',//设备型号
			}
		},
		onLoad(option) {
			this.user = option.user
			this.userCode = option.userCode;
			this.faceimg.uri = option.faceimg;

			console.log(this.faceimg)
			this.register = uni.getStorageSync('register');
			if (option.user == '发票领取人') {
				this.info.push(option.user.slice(0, 4))
			} else {
				this.info.push(option.user.slice(0, 2))
			}

			console.log(this.info)
			
			this.name = option.name
			console.log(this.register)
			this.getclientid();
			 this.device= uni.getStorageSync('device');
		},
		methods: {
			getclientid() {
				const that = this;
				uni.getStorage({
					key: 'clientid',
					success: function(res) {
						that.clientID = res.data;
						console.log(res)
					}
				})
			},
			all() {
				const ctx = uni.createCanvasContext('myCanvas')
				if (this.btn.stepOne == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						sizeType: ['compressed'],
						success: function(res) {
							that.count = 1;
							const photo = {
								name: 'id_fphoto',
								uri: res.tempFilePaths[0],
							}
						
							that.img.splice(0, 1, photo)
							that.src = res.tempFiles[0].path;
						}
					});
				} else if (this.btn.stepTwo == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							console.log(res.tempFiles);
							that.count = 2;
							const photo = {
								name: 'id_bphoto',
								uri: res.tempFilePaths[0]
							}
						
							that.img.splice(1, 1, photo)
							that.src = res.tempFiles[0].path;
						}
					});
				} else if (this.btn.stepThree == true) {
					if (this.name == 'register') {
						const that = this;
						if (this.register.user == '购油人') {
							uni.chooseImage({
								count: 1,
								success: function(res) {
									that.count = 3;
									const photo = {
										name: 'buy_auth_photo',
										uri: res.tempFilePaths[0]
									}
									that.img.splice(2, 1, photo)
									that.src = res.tempFiles[0].path;
								}
							});
						} else if (this.register.user == '提油人') {
							uni.chooseImage({
								count: 1,
								success: function(res) {
									that.count = 3;
									const photo = {
										name: 'get_auth_photo',
										uri: res.tempFilePaths[0]
									}
									// that.img.push({
									// 	name: 'get_auth_photo',
									// 	uri: res.tempFilePaths[0]
									// })
									that.img.splice(2, 1, photo)
									that.src = res.tempFiles[0].path;
								}
							});
						} else {
							uni.chooseImage({
								count: 1,
								success: function(res) {
									that.count = 3;
									const photo = {
										name: 'bill_auth_photo',
										uri: res.tempFilePaths[0]
									}
									// that.img.push({
									// 	name: 'bill_auth_photo',
									// 	uri: res.tempFilePaths[0]
									// })
									that.img.splice(2, 1, photo)
									that.src = res.tempFiles[0].path;
								}
							});
						}
					} else {
						const that = this;
						if (this.userCode == 1) {
							uni.chooseImage({
								count: 1,
								success: function(res) {
									that.count = 3;
									const photo = {
										name: 'buy_auth_photo',
										uri: res.tempFilePaths[0]
									}
									that.img.splice(2, 1, photo)
									that.src = res.tempFiles[0].path;
								}
							});
						} else if (this.userCode == 2) {
							uni.chooseImage({
								count: 1,
								success: function(res) {
									that.count = 3;
									const photo = {
										name: 'get_auth_photo',
										uri: res.tempFilePaths[0]
									}
									// that.img.push({
									// 	name: 'get_auth_photo',
									// 	uri: res.tempFilePaths[0]
									// })
									that.img.splice(2, 1, photo)
									that.src = res.tempFiles[0].path;
								}
							});
						} else {
							uni.chooseImage({
								count: 1,
								success: function(res) {
									that.count = 3;
									const photo = {
										name: 'bill_auth_photo',
										uri: res.tempFilePaths[0]
									}
									// that.img.push({
									// 	name: 'bill_auth_photo',
									// 	uri: res.tempFilePaths[0]
									// })
									that.img.splice(2, 1, photo)
									that.src = res.tempFiles[0].path;
								}
							});
						}
					}


				}

			},

			// 第一步下一步

			oneSide() {

				if (this.img.length == 1) {
					console.log(1)
					this.btn.stepOne = false;
					this.btn.stepTwo = true;
					this.num = 1;

					this.src = two;
					this.step.active = "step-ago";
					this.step.kong = "step-active";
				} else if (this.img.length > 1) {
					console.log(2)
					this.btn.stepOne = false;
					this.btn.stepTwo = true;
					this.num = 1;

					this.src = this.img[1].uri;
					this.step.active = "step-ago";
					this.step.kong = "step-active";
				} else {
					return uni.showToast({
						title: '请上传身份证正面照',
						icon: 'none',
						position: 'bottom',
						duration: 3000,
					})
				}
			},
			//第二步上一步
			lastStep() {

				this.btn.stepOne = true;
				this.btn.stepTwo = false;
				this.num = 0;

				this.active = "step-active";
				this.kong = "";
				this.src = this.img[0].uri;
			},
			// 第二步下一步
			nextStep() {
				console.log(this.count)

				if (this.img.length == 2) {
					this.btn.stepTwo = false;
					this.btn.stepThree = true;
					this.btn.Dates = true;
					this.num = 2;
					switch (this.register.user) {
						case '购油人':
							this.src = three;
							break;
						case '提油人':
							this.src = four;
							break;
						case '发票领取人':
							this.src = five;
							break;
						default:
							break;
					}


					this.step.active = "step-ago";
					this.step.kong = "step-ago";
					this.step.kong1 = "step-active";
				} else if (this.img.length > 2) {
					this.btn.stepTwo = false;
					this.btn.stepThree = true;
					this.btn.Dates = true;
					this.num = 2;

					this.src = this.img[2].uri;
					this.step.active = "step-ago";
					this.step.kong = "step-ago";
					this.step.kong1 = "step-active";
				} else {
					return uni.showToast({
						title: '请上传身份证反面照',
						icon: 'none',
						position: 'bottom',
						duration: 3000,
					})
				}
			},
			//第三步上一步
			threeStepLast() {
				this.btn.stepThree = false;
				this.btn.stepTwo = true;
				this.num = 1;

				this.step.active = "step-ago";
				this.step.kong = "step-active";
				this.src = this.img[1].uri;
			},

			threeStepNext() {
				if (this.name == "register") {
					console.log(this.register.role)
					if (this.register.user == '购油人') {
						this.img
					} else {
						this.img.push(this.faceimg)
					}
					console.log(10)
					const imgs = this.img.map((value, index) => {
						return {
							name: value.name,
							uri: value.uri
						}
					})
					console.log(imgs)
					if (this.img.length >= 3) {
						const that = this;
						console.log(this.register.companyId, this.register.customerId)
						if (this.ifday == true) {
							console.log(typeof this.register.role)
							if (this.register.user == '购油人') {
								console.log(this.register.role)
								uni.uploadFile({
									//注册地址
									url:this.$api + 'base/regist',
									files: imgs,
									formData: {
										"username": this.register.userPhoneNum,
										"passwd": this.register.newPwd2,
										"roles": this.register.role,
										"customer_id": this.register.companyId,
										// "manager_id": this.register.customerId,
										"realname": this.register.userName,
										"id_card": this.register.userId,
										"phone": this.register.userPhoneNum,
										"city": this.register.userCity,
										"buy_auth_exp": this.day,
										"client_id": this.clientID,
										"device":this.device,
									},
									success: function(res) {
										var data = JSON.parse(res.data)
										//	var data = res.data
										console.log(res)
										if (res.statusCode == 200) {
											if (data.errorCode == 0) {
												uni.showToast({
													"title": '注册已提交，审核成功后即可登录使用',
													icon: 'none',
													position: 'bottom',
													duration: 3000,
												})
												uni.removeStorage({
													key: 'register'
												})
												uni.navigateTo({
													url: '../../login/login?val=' + data.value,
												});

											} else {
												uni.showToast({
													"title": data.message,
													"icon": 'none',
													position: 'bottom',
													duration: 3000,
												});

											}
										}

									}
								})
							} else if (this.register.user == '提油人') {
								uni.uploadFile({
									//注册地址
									
									url:this.$api + 'base/regist',
									files: imgs, //[this.idCardZ[0], this.idCardF[0], this.buyOil[0]]
									formData: {
										"username": this.register.userPhoneNum,
										"passwd": this.register.newPwd2,
										"roles": this.register.role,
										"customer_id": this.register.companyId,
										// "manager_id": this.register.customerId,
										"realname": this.register.userName,
										"id_card": this.register.userId,
										"phone": this.register.userPhoneNum,
										"city": this.register.userCity,
										"get_auth_exp": this.day,
										"client_id": this.clientID,
										"device":this.device,
									},
									success: function(res) {
										//	var data = res.data
										var data = JSON.parse(res.data)
										console.log(data, res)
										if (res.statusCode == 200) {
											if (data.errorCode == 0) {
												uni.showToast({
													"title": '注册已提交，审核成功后即可登录使用',
													icon: 'none',
													position: 'bottom',
													duration: 3000,
												})
												uni.removeStorage({
													key: 'register'
												})
												uni.navigateTo({
													url: '../../login/login?val=' + data.value,
												});

											} else {
												uni.showToast({
													"title": data.message,
													"icon": 'none',
													position: 'bottom',
													duration: 3000,
												});

											}
										}

									}
								})
							} else {
								uni.uploadFile({
									//注册地址
									
									url:this.$api + 'base/regist',
									files: imgs, //[this.idCardZ[0], this.idCardF[0], this.buyOil[0]]
									formData: {
										"username": this.register.userPhoneNum,
										"passwd": this.register.newPwd2,
										"roles": this.register.role,
										"customer_id": this.register.companyId,
										// "manager_id": this.register.customerId,
										"realname": this.register.userName,
										"id_card": this.register.userId,
										"phone": this.register.userPhoneNum,
										"city": this.register.userCity,
										"bill_auth_exp": this.day,
										"client_id": this.clientID,
										"device":this.device,
									},
									success: function(res) {
										//var data = res.data
										var data = JSON.parse(res.data)
										console.log(data)
										if (res.statusCode == 200) {
											if (data.errorCode == 0) {
												uni.showToast({
													"title": '注册已提交，审核成功后即可登录使用',
													icon: 'none',
													position: 'bottom',
													duration: 3000,
												})
												uni.removeStorage({
													key: 'register'
												})
												uni.navigateTo({
													url: '../../login/login?val=' + data.value,
												});

											} else {
												uni.showToast({
													"title": data.message,
													"icon": 'none',
													position: 'bottom',
													duration: 3000,
												});

											}
										}

									}
								})
							}


						} else if (this.ifday == false) {
							console.log(this.ifday)
							return uni.showToast({
								title: '请选择授权有效期',
								icon: 'none',
								position: 'bottom',
								duration: 3000,
							})
						}
					} else {
						return uni.showToast({
							title: '请上传购油授权书',
							icon: 'none',
							position: 'bottom',
							duration: 3000,
						})
					}
					//申请提油人权限
				}
				
			},
			// 选择时间
			changeTimes() {
				this.times = false;
				this.$refs.date.show();
			},
			onConfirm(val) {
				this.day = val.result;
				this.ifday = true
			},
			// 预览图片
			previewImage(no) {
				console.log(this.src, three)
				if (no >= 2) {
					uni.previewImage({
						current: no,
						urls: [three],
					})
				} else {
					return;
				}

			},
		},
		computed: {
			...mapState(["Token"])
		},
		components: {
			step,
			mButton,
			tButton,
			ruiDatePicker,
			wPicker
		}
	}
</script>

<style>
	.idCard {
		width: 100%;
	}

	.m-info {
		padding: 10px 10px;
		border-top: 1px solid #E5E5E5;
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

	}

	.m-info-content text {
		width: 6em;
		font-size: 15px;
		margin-right: 5px;
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

		margin-left: 10px;
	}
</style>
