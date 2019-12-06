<template>
	<view class="content">
		<view class="step-box">
			<view>
				<text class="stepNum" ref="one" :class="step.active">{{step.value1}}</text>
			</view>
			<view>
				<text class="stepNum" ref="two" :class="step.kong">{{step.value2}}</text>
			</view>
			<view>
				<text class="stepNum" ref="three" :class="step.kong1">{{step.value3}}</text>
			</view>
			<view>
				<text class="stepNum" ref="four" :class="step.kong2">{{step.value4}}</text>
			</view>
			<view>
				<text class="stepNum" ref="five" :class="step.kong3">{{step.value5}}</text>
			</view>


		</view>

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
			<view class="flex  m-info" v-show="btn.Dates">
				<view class="flex center m-info-content">
					<text>授权书有效期</text>
					<input placeholder="请选择" v-show="times" @tap="changeTimes" disabled="true" style="width: 222px; height: 37.5px;" />
					<view class="" v-show="!times">
						<!-- <ruiDatePicker class="day" fields="day" start="2010-00-00" end="2030-12-31" :value="day" @change="bindChange"></ruiDatePicker> -->
						<view class="" style="width: 178px;" v-show="!times">
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

			<view class="flex  m-info" v-show="btn.dates">
				<view class="flex center m-info-content">
					<text>授权书有效期</text>
					<input placeholder="请选择" v-show="apply_one" @tap="changeTime" disabled="true" style="width: 222px; height: 37.5px;" />
					<view class="" style="width: 178px;" v-show="!apply_one">
						<!-- <ruiDatePicker class="day" fields="day" start="2010-00-00" end="2030-12-31" :value="days" @change="bindChanges"></ruiDatePicker> -->
						<view class="" v-show="!apply_one  ">
							<view class="" @tap="changeTime">
								{{days}}
							</view>
						</view>
						<w-picker mode="date" startYear="2019" endYear="2030" :defaultVal="[0,1,3]" :current="true" @confirm="onConfirms"
						 ref="date1" themeColor="#00A8FF">
						</w-picker>
					</view>

				</view>
				<view class="flex m-info-text">
					<image src="../../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
				</view>

			</view>

			<view class="flex  m-info" v-show="btn.voiceDates">
				<view class="flex center m-info-content">
					<text>授权书有效期</text>
					<input placeholder="请选择" v-show="apply_two" @tap="voiceDates" disabled="true" style="width: 222px; height: 37.5px;" />
					<view class="" style="width: 178px;" v-show="!apply_two">
						<view class="" v-show="!apply_two  ">
							<view class="" @tap="voiceDates">
								{{voiceDate}}
							</view>
						</view>
						<w-picker mode="date" startYear="2019" endYear="2030" :defaultVal="[0,1,3]" :current="true" @confirm="voicedates"
						 ref="date2" themeColor="#00A8FF">
						</w-picker>
					</view>

				</view>
				<view class="flex m-info-text">
					<image src="../../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
				</view>

			</view>

		</view>

		<view class="mTop30 mB" v-show="btn.stepOne">
			<mButton :type="btn.type" :value="btn.value" class="mTop30" @oneSide="oneSide"></mButton>
		</view>
		<view class="m-two-btn mTop30 mB" v-show="btn.stepTwo">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @lastStep="lastStep" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @nextStep="nextStep" :content="btn.value"></tButton>
		</view>
		<view class="m-two-btn mTop30 mB" v-show="btn.stepThree">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepLast="threeStepLast" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepNext="threeStepNext" :content="btn.value"></tButton>
		</view>
		<view class="m-two-btn mTop30 mB" v-show="btn.stepFour">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepLast="fourStepLast" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepNext="fourStepNext" :content="btn.value"></tButton>
		</view>
		<view class="m-two-btn mTop30 mB" v-show="btn.stepFive">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @fiveStepLast="fiveStepLast" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @fiveStepNext="fiveStepNext" :content="btn.commit"></tButton>
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
		formatDate
	} from "../../../common/js/date.js";
	export default {
		data() {
			return {
				step: {
					value1: '第一步',
					value2: '第二步',
					value3: '第三步',
					value4: '第四步',
					value5: '第五步',
					active: 'step-active',
					ago: 'step-ago',
					kong: '',
					kong1: '',
					kong2: '',
					kong3: ''
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
					stepFour: false,
					stepFive: false,
					Dates: false,
					dates: false,
					voiceDates: false
				},
				info: [
					"正面",
					"反面",
					"购油",
					"提油",
					"发票领取"
				],
				tellinfo: ["正面示例", "反面示例", "授权书示例", "授权书示例", "授权书示例"],
				num: 0,
				count: 0,
				src: one,

				ifday: false,
				ifdays: false,
				ifvoiceDate: false,
				times: true,
				apply_one: true,
				apply_two: true,
				idCardZ: '',
				idCardF: '',
				buyOil: '',
				takeOil: '',
				register: '',
				img: [],
				mode: 'date', //时间
				day: '2019-01-01', //购油有效期
				days: '2019-01-01', //提油有效期
				voiceDate: '2019-01-01', //领取发票时间
				clientID: '',
				faceimg: {
					name: 'face_photo',
					uri: '',
				},
			}
		},
		onLoad(option) {
			this.faceimg.uri = option.faceimg;
			this.register = uni.getStorageSync('register');
			if(this.register.user !== '购油人,提油人,发票领取人'){
	
				this.register.user = '购油人,提油人,发票领取人'
			}
			console.log(this.register)
			this.getclientid();
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
				if (this.btn.stepOne == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							that.count = 1;
							console.log(res.tempFiles[0].path);
							that.idCardZ = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
							
							const photo = {
								name: 'id_fphoto',
								uri: res.tempFilePaths[0]
							};
							that.img.splice(0, 1, photo);
						}

					});


				} else if (this.btn.stepTwo == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							console.log(res.tempFiles);
							that.count = 2;
							that.idCardF = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
							
							const photo = {
								name: 'id_bphoto',
								uri: res.tempFilePaths[0]
							};
							that.img.splice(1, 1, photo)
						}
					});
				} else if (this.btn.stepThree == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							console.log(res.tempFiles);
							that.count = 3;
							that.buyOil = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
							
							const photo = {
								name: 'buy_auth_photo',
								uri: res.tempFilePaths[0]
							}
							that.img.splice(2, 1, photo)
						}
					});
				} else if (this.btn.stepFour == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							console.log(res.tempFiles);
							that.count = 4;
							that.takeOil = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
							
							const photo = {
								name: 'get_auth_photo',
								uri: res.tempFilePaths[0]
							}
							that.img.splice(3, 1, photo)
						}
					});
				} else if (this.btn.stepFive == true) {
					const that = this;
					uni.chooseImage({
						count: 1,
						success: function(res) {
							console.log(res.tempFiles);
							that.count = 5;
							that.takeOil = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
							
							const photo = {
								name: 'bill_auth_photo',
								uri: res.tempFilePaths[0]
							}
							that.img.splice(4, 1, photo)
						}
					});
				}

			},


			// 第一步下一步
			oneSide() {
				console.log(this.register)
				console.log(this.register.role)
				console.log(this.img)
				if (this.img.length == 1) {
					console.log(1)
					this.btn.stepOne = false;
					this.btn.stepTwo = true;
					this.num = 1;
					// this.count += 1;
					this.src = two;
					this.step.active = "step-ago",
						this.step.kong = "step-active"
				} else if (this.img.length > 1) {
					console.log(2)
					this.btn.stepOne = false;
					this.btn.stepTwo = true;
					this.num = 1;
					// this.count += 1;
					this.src = this.img[1].uri;
					this.step.active = "step-ago",
						this.step.kong = "step-active"
				} else {
					return uni.showToast({
						title: '请上传身份证正面照',
						icon: 'none',
						position:'bottom',
					})
				}

			},
			//第二步上一步
			lastStep() {
				console.log(this.img[0].uri)
				this.src = this.img[0].uri
				this.btn.stepOne = true;
				this.btn.stepTwo = false;
				this.num = 0;
				// this.count -= 1;
				// this.src = one;
				this.step.active = "step-active";
				this.step.kong = ""
			},
			// 第二步下一步
			nextStep() {
				console.log(this.count)
				if (this.img.length == 2) {
					this.btn.stepTwo = false;
					this.btn.stepThree = true;
					this.btn.Dates = true;
					this.num = 2;
					// this.count += 1;
					this.src = three;
					this.step.active = "step-ago",
						this.step.kong = "step-ago"
					this.step.kong1 = "step-active"
				} else if (this.img.length > 2) {
					this.btn.stepTwo = false;
					this.btn.stepThree = true;
					this.btn.Dates = true;
					this.num = 2;
					// this.count += 1;
					this.src = this.img[2].uri;
					this.step.active = "step-ago",
						this.step.kong = "step-ago"
					this.step.kong1 = "step-active"
				} else {
					return uni.showToast({
						title: '请上传身份证反面照',
						icon: 'none',
						position:'bottom',
					})
				}
			},
			//第三步上一步
			threeStepLast() {
				this.btn.stepThree = false;
				this.btn.stepTwo = true;
				this.btn.Dates = false;
				this.num = 1;
				// this.count -= 1;
				this.src = this.img[1].uri;
				this.step.active = "step-ago";
				this.step.kong = "step-active";
				this.step.kong1 = '';
			},
			// 第三步下一步
			threeStepNext() {
				console.log(this.register.role)
				console.log(this.count)
				if (this.img.length == 3) {
					if (this.ifday == true) {
						this.btn.stepThree = false;
						this.btn.stepFour = true;
						this.btn.Dates = false;
						this.btn.dates = true;
						this.num = 3;
						// this.count += 1;
						this.src = four;
						this.step.kong = "step-ago",
							this.step.kong1 = "step-ago"
						this.step.kong2 = "step-active"
					} else if (this.ifday == false) {
						return uni.showToast({
							title: '请选择授权有效期',
							icon: "none",
							position:'bottom',
						})
					}

				} else if (this.img.length > 3) {
					this.btn.stepThree = false;
					this.btn.stepFour = true;
					this.btn.Dates = false;
					this.btn.dates = true;
					this.num = 3;
					// this.count += 1;
					this.src = this.img[3].uri;
					this.step.kong = "step-ago",
						this.step.kong1 = "step-ago"
					this.step.kong2 = "step-active"
				} else {
					return uni.showToast({
						title: '请上传购油授权书',
						icon: 'none',
						position:'bottom',
					})
				}

			},
			fourStepLast() {
				this.btn.stepFour = false;
				this.btn.stepThree = true;
				this.btn.Dates = true;
				this.btn.dates = false;
				this.num = 2;
				// this.count -= 1;
				this.src = this.img[2].uri;
				this.step.kong = "step-ago",
					this.step.kong1 = "step-active",
					this.step.kong2 = ''
			},
			fourStepNext() {
				console.log(this.img.length)
				if (this.img.length == 4) {
					if (this.ifdays == true) {
						this.btn.stepFour = false;
						this.btn.stepFive = true;
						this.btn.dates = false;
						this.btn.voiceDates = true;
						this.num = 4;
						// this.count += 1;
						this.src = five;
						this.step.kong1 = "step-ago",
							this.step.kong2 = "step-ago"
						this.step.kong3 = "step-active"
					} else if (this.ifdays == false) {
						return uni.showToast({
							title: '请选择授权有效期',
							icon: "none",
							position:'bottom',
						})
					}

				} else if (this.img.length > 4) {
					this.btn.stepFour = false;
					this.btn.stepFive = true;
					this.btn.dates = false;
					this.btn.voiceDates = true;
					this.num = 4;
					// this.count += 1;
					this.src = this.img[4].uri;
					this.step.kong1 = "step-ago",
						this.step.kong2 = "step-ago"
					this.step.kong3 = "step-active"
				} else {
					return uni.showToast({
						title: '请上传提油授权书',
						icon: 'none',
						position:'bottom',
					})
				}

			},
			fiveStepLast() {
				this.btn.stepFive = false;
				this.btn.stepFour = true;
				this.btn.dates = true;
				this.btn.voiceDates = false;
				this.num = 3;
				// this.count -= 1;
				this.src = this.img[3].uri;
				this.step.kong1 = "step-ago";
				this.step.kong2 = "step-active";
				this.step.kong3 = '';

			},
			fiveStepNext() {
				this.img.push(this.faceimg)

				const imgs = this.img.map((value, index) => {
					return {
						name: value.name,
						uri: value.uri
					}
				})
				console.log(imgs)
				 var _url = this.$api+'base/regist'
				if (this.img.length >= 5) {
					if (this.ifvoiceDate == true) {
						console.log(this.register.role)
						uni.uploadFile({
							url: _url,
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
								"get_auth_exp": this.days,
								"bill_auth_exp": this.voiceDate,
								"client_id": this.clientID,
							},
							success: function(res) {
								var data = JSON.parse(res.data)
								//var data = res.data
								console.log(data)
								if (res.statusCode == 200) {
									if (data.errorCode == 0) {
										uni.showToast({
											"title": '注册已提交，审核成功后即可登录使用',
											icon: 'none',
											position:'bottom',
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
											position:'bottom',
										});

									}
								}
							}
						})
					} else if (this.ifvoiceDate == false) {
						return uni.showToast({
							title: '请选择授权有效期',
							icon: 'none',
							position:'bottom',
						})
					}
				} else {
					return uni.showToast({
						title: '请上传提油授权书',
						icon: 'none',
						position:'bottom',
					})
				}
			},
			// 选择时间
			changeTimes() {
				this.times = false;
				this.$refs.date.show();
			},
			changeTime() {
				this.apply_one = false;
				this.$refs.date1.show();
			},
			onConfirm(val) {
				console.log(val)
				this.day = val.result;
				this.ifday = true
			},
			onConfirms(val) {
				this.days = val.result;
				this.ifdays = true
			},
			voiceDates() {
				this.apply_two = false;
				this.$refs.date2.show();
			},
			voicedates(val) {
				this.voiceDate = val.result;
				this.ifvoiceDate = true
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
		components: {
			step,
			mButton,
			tButton,
			ruiDatePicker,
			wPicker
		},
	}
</script>

<style scoped>
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

	.stepNum {
		display: inline-block;
		width: 45px;
		height: 45px;
		font-size: 12px;
		margin: 10px 10px;
		border-radius: 50%;
		text-align: center;
		line-height: 45px;
		color: #fff;
		background-color: #CBCBCB;
	}

	.step-active {
		background-color: #00a8ff;
	}

	.step-ago {
		background: #7eeab8;
	}

	.step-wait {
		background-color: #FD8E65;
	}
</style>
