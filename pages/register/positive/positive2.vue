<template>
	<view class="content">
		<view class="step-box">
			<step :value="step.value1" ref="one" :actives="step.active"></step>
			<step :value="step.value2" ref="two" :actives="step.kong"></step>
			<step :value="step.value3" ref="three" :actives="step.kong1"></step>
		</view>
		<view class="fget-num">
			<view class="fget-ul">
				<text>{{info[num]}}</text>
				<text class="color-dff" @tap="all">点击上传</text>
			</view>
			<view class="positive">
				<image :src="src" class="idCard" mode="aspectFit"></image>
			</view>
			<view class="tellinfo">
				<text>{{tellinfo[num]}}</text>
			</view>
			<view class="flex  m-info" v-show="btn.stepThree">
				<view class="flex center m-info-content">
					<text>授权书有效期</text>
					<input placeholder="请选择,需与授权书的有效日期一致" v-show="times" @tap="changeTimes" disabled="true" style="width: 222px; height: 37.5px;"
					 v-model="inputs" />
					<view class="" v-show="!times">
						<view class="" @tap="changeTimes">
							{{days}}
						</view>
					</view>
					<w-picker mode="date" startYear="2019" endYear="2030" :defaultVal="[0,1,3]" :current="true" @confirm="onConfirm"
					 ref="date" themeColor="#f00">
					</w-picker>
				</view>
				<view class="flex m-info-text">
					<image src="../../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
				</view>

			</view>

		</view>
		<view class="mTop30 mB" v-show="btn.stepOne">
			<mButton :type="btn.type" :value="btn.value" @oneSide="oneSide"></mButton>
		</view>

		<view class="m-two-btn mTop30 mB"  v-show="btn.stepTwo">
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
	import three from '../../../static/img/information3x.png'
	import step from '../../../components/step/step'
	import mButton from '../../../components/m-button.vue'
	import tButton from '../../../components/twoButton/twoButton'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		formatDate
	} from "../../../common/js/date.js";
	import {
		mapState,
	} from 'vuex'
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
					commit: '提交',
					stepOne: true,
					stepTwo: false,
					stepThree: false,
				},
				info: [
					"上传身份证正面",
					"上传身份证反面",
					"上传授权委托书：",
				],
				tellinfo: ["正面示例", "反面示例", "授权书示例"],
				num: 0,
				count: 0,
				src: one,
				days: '2019-01-01',
				ifdays: false,
				times: true,
				idCardZ: '',
				idCardF: '',
				takeOil: '',
				register: '',
				img: [],
				inputs: '',
				name: '',
				mode: 'date', //时间
				// resultInfo: {
				// 	result: "2019-12-20 10:00:00"
				// }
			}
		},
		onLoad(option) {
			this.register = uni.getStorageSync('register');
			// this.day = formatDate(new Date());
			console.log(this.register)
			this.name = option.name;
		},
		methods: {
			all() {
				if (this.btn.stepOne == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							that.count = 1;
							console.log(res);
							that.img.push({
								name: 'id_fphoto',
								uri: res.tempFilePaths[0]
							})
							that.idCardZ = res.tempFilePaths;
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
							that.img.push({
								name: 'id_bphoto',
								uri: res.tempFilePaths[0]
							})
							that.idCardF = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
						}
					});
				} else if (this.btn.stepThree == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							console.log(res.tempFiles);
							that.count = 3;
							that.img.push({
								name: 'get_auth_photo',
								uri: res.tempFilePaths[0]
							})
							that.buyOil = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
						}
					});
				}

			},

			// 第一步下一步

			oneSide() {
				console.log(this.register.role)
				if (this.count == 1) {
					this.btn.stepOne = false;
					this.btn.stepTwo = true;
					this.num = 1;
					// this.count += 1;
					this.src = two;
					this.step.active = "step-ago",
						this.step.kong = "step-active"
				} else {
					return uni.showToast({
						title: '请上传身份证正面照',
						icon: 'none'
					})
				}

			},
			//第二步上一步
			lastStep() {
				this.btn.stepOne = true;
				this.btn.stepTwo = false;
				this.num = 0;
				this.count -= 1;
				this.src = one;
				this.active = "step-active",
					this.kong = ""
			},
			// 第二步下一步
			nextStep() {
				console.log(this.count)
				if (this.count == 2) {
					this.btn.stepTwo = false;
					this.btn.stepThree = true;
					this.btn.Dates = true;
					this.num = 2;
					// this.count += 1;
					this.src = three;
					this.step.active = "step-ago",
						this.step.kong = "step-ago"
					this.step.kong1 = "step-active"
				} else {
					return uni.showToast({
						title: '请上传身份证反面照',
						icon: 'none'
					})
				}

			},
			//第三步上一步
			threeStepLast() {
				this.btn.stepThree = false;
				this.btn.stepTwo = true;
				this.num = 1;
				this.count -= 1;
				this.src = two;
				this.step.active = "step-ago",
					this.step.kong = "step-active"
			},

			threeStepNext() {

				if (this.name == "register") {
					const imgs = this.img.map((value, index) => {
						return {
							name: value.name,
							uri: value.uri
						}
					})
					console.log(imgs)
					if (this.count == 3) {
						if (this.ifdays == true) {
							uni.uploadFile({
								url: 'http://dev.pjy.name:8180/api/bizcust/base/registCusmter',
								files: imgs,
								formData: {
									"username": this.register.userPhoneNum,
									"passwd": this.register.newPwd2,
									"role": this.register.role,
									"customer_id": this.register.companyId,
									"manager_id": this.register.customerId,
									"realname": this.register.userName,
									"id_card": this.register.userId,
									"phone": this.register.userPhoneNum,
									"city": this.register.userCity,

									"get_auth_exp": this.days
								},
								success: function(res) {
									// console.log(res)
									// console.log(res.data)
									// console.log(res.data.errorCode)
									// console.log(res.data.message)
									var data = JSON.parse(res.data)
									console.log(data)
									if (res.statusCode == 200) {
										if (data.errorCode == 10109) {
											uni.showToast({
												"title":data.message
											})
											uni.removeStorage({
												key: 'register'
											})
											uni.navigateTo({
												url: '../../login/login?val=' + data.value,
											});

										} else {
											uni.showToast({
												"title":data.message,
												"icon": 'none'
											});

										}
									}

								}
							})
						} else if (this.ifdays == false) {
							return uni.showToast({
								title: '请选择授权有效期',
								icon: 'none'
							})
						}
					} else {
						return uni.showToast({
							title: '请上传购油授权书',
							icon: 'none'
						})
					}
				} else if (this.name == "apply") {
					// console.log(this.register.role)
					const imgs = this.img.map((value, index) => {
						return {
							name: value.name,
							uri: value.uri
						}
					})
					if (this.count == 3) {
						const that = this;
						if (this.ifdays == true) {
							console.log(1)
							uni.uploadFile({
								url: 'http://dev.pjy.name:8180/api/bizcust/user/oil_authorize',
								files: imgs, //[this.idCardZ[0], this.idCardF[0], this.buyOil[0]]
								fileType: 'image',
								header:{
									"Token":this.Token,
									"Content-Type" : "multipart/form-data"
								},
								formData: {
									"role": 2,
									"buy_auth_exp": this.days,
								},
								success: function(res) {
									console.log(res)
									// console.log(res.data)
									// console.log(res.data.errorCode)
									// console.log(res.data.message)
									var data = JSON.parse(res.data)
									console.log(data)
									if (res.statusCode == 200) {
										if (data.errorCode == 10109) {
											uni.showToast({
												"title":data.message
											})
											uni.removeStorage({
												key: 'register'
											})
											uni.navigateTo({
												url: '../../../info/info?val=' + data.value,
											});

										} else {
											uni.showToast({
												"title":data.message,
												"icon": 'none'
											});

										}
									}

								}
									// if (res.statusCode == 200 && res.data.errorCode == 0) {
									// 	if (res.data.value == 1) {
									// 		uni.showToast({
									// 			title: '申请成功，待审批',
									// 			icon: 'none'
									// 		})
									// 	}
									// }
						
							})

						} else {
							return uni.showToast({
								title: '请选择授权有效期',
								icon: 'none'
							})
						}
					} else {
						return uni.showToast({
							title: '请上传购油授权书',
							icon: 'none'
						})
					}
				}

			},
			// 选择时间
			changeTimes() {
				this.times = false
				this.$refs.date.show();
			},
			onConfirm(val) {
				this.days = val.result;
				// this.resultInfo = val;
				this.ifdays = true
			},
		},
		computed: {
			...mapState(['Token'])
		},
		components: {
			step,
			mButton,
			tButton,
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
		width: 100px;
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
