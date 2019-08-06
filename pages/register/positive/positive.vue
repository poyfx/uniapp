<template>
	<view class="content">
		<view class="step-box">
			<step :value="step.value1" ref="one" :actives="step.active"></step>
			<step :value="step.value2" ref="two" :actives="step.kong"></step>
			<step :value="step.value3" ref="three" :actives="step.kong1"></step>
			<step :value="step.value4" ref="three" :actives="step.kong2"></step>
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

			<view class="flex  m-info" v-show="btn.Dates">
				<view class="flex center m-info-content">
					<text>授权书有效期</text>
					<input placeholder="请选择,需与授权书的有效日期一致" v-show="times" @tap="changeTimes" disabled="true" style="width: 222px; height: 37.5px;" />
					<view class="" v-show="!times">
						<ruiDatePicker class="day" fields="day" start="2010-00-00" end="2030-12-31" :value="day" @change="bindChange"></ruiDatePicker>
					</view>

				</view>
				<view class="flex m-info-text">
					<image src="../../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
				</view>

			</view>
			<view class="flex  m-info" v-show="btn.dates">
				<view class="flex center m-info-content">
					<text>授权书有效期</text>
					<input placeholder="请选择,需与授权书的有效日期一致" v-show="times" @tap="changeTimes" disabled="true" style="width: 222px; height: 37.5px;" />
					<view class="" v-show="!times">
						<ruiDatePicker class="day" fields="day" start="2010-00-00" end="2030-12-31" :value="days" @change="bindChanges"></ruiDatePicker>
					</view>

				</view>
				<view class="flex m-info-text">
					<image src="../../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
				</view>

			</view>

		</view>

		<view class="mTop30" v-show="btn.stepOne">
			<mButton :type="btn.type" :value="btn.value" class="mTop30" @oneSide="oneSide"></mButton>
		</view>
		<view class="m-two-btn mTop30" v-show="btn.stepTwo">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @lastStep="lastStep" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @nextStep="nextStep" :content="btn.value"></tButton>
		</view>
		<view class="m-two-btn mTop30" v-show="btn.stepThree">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepLast="threeStepLast" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @threeStepNext="threeStepNext" :content="btn.value"></tButton>
		</view>
		<view class="m-two-btn mTop30" v-show="btn.stepFour">
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @fourStepLast="fourStepLast" :content="btn.content"></tButton>
			<tButton :type="btn.type" :disabled="btn.disabled" class="tButton" @fourStepNext="fourStepNext" :content="btn.commit"></tButton>
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
	import ruiDatePicker from '../../../rattenking-dtpicker/rattenking-dtpicker.vue'
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
					active: 'step-active',
					ago: 'step-ago',
					kong: '',
					kong1: '',
					kong2: ''
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
					stepFour: false,
					Dates: false,
					dates: false
				},
				info: [
					"上传身份证正面",
					"上传身份证反面",
					"上传授权委托书：",
					"上传授权委托书："
				],
				tellinfo: ["正面示例", "反面示例", "授权书示例"],
				num: 0,
				count: 0,
				src: one,
				day: '2019-01-01', //购油有效期
				days: '2019-01-01', //提油有效期
				ifday: false,
				ifdays: false,
				times: true,
				idCardZ: '',
				idCardF: '',
				buyOil: '',
				takeOil: '',
				register: '',
				img: []
				// photo: false
			}
		},
		onLoad() {
			this.register = uni.getStorageSync('register');

			console.log(this.register)
			this.day = formatDate(new Date());
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
							that.idCardZ = res.tempFilePaths;
							that.src = res.tempFiles[0].path;
							that.img.push({
								name: 'id_fphoto',
								uri: res.tempFilePaths[0]
							})
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
							that.img.push({
								name: 'id_bphoto',
								uri: res.tempFilePaths[0]
							})
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
							that.img.push({
								name: 'buy_auth_photo',
								uri: res.tempFilePaths[0]
							})
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
							that.img.push({
								name: 'get_auth_photo',
								uri: res.tempFilePaths[0]
							})
						}
					});
				}

			},


			// 第一步下一步
			oneSide() {
				console.log(this.count)
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
				this.step.active = "step-active",
					this.step.kong = ""
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
				this.btn.Dates = false;
				this.num = 1;
				this.count -= 1;
				this.src = two;
				this.step.active = "step-ago",
					this.step.kong = "step-active",
					this.step.kong1 = ''
			},
			// 第三步下一步
			threeStepNext() {
				console.log(this.register.role)
				console.log(this.count)
				if (this.count == 3) {
					if (this.ifday == true) {
						this.btn.stepThree = false;
						this.btn.stepFour = true;
						this.btn.Dates = false;
						this.btn.dates = true;
						this.num = 2;
						// this.count += 1;
						this.src = three;
						this.step.kong = "step-ago",
							this.step.kong1 = "step-ago"
						this.step.kong2 = "step-active"
					} else if (this.ifday == false) {
						return uni.showToast({
							title: '请选择授权有效期',
							icon: "none"
						})
					}

				} else {
					return uni.showToast({
						title: '请上传购油授权书',
						icon: 'none'
					})
				}

			},
			fourStepLast() {
				this.btn.stepFour = false;
				this.btn.stepThree = true;
				this.btn.Dates = true;
				this.btn.dates = false;
				this.num = 2;
				this.count -= 1;
				this.src = three;
				this.step.kong = "step-ago",
					this.step.kong1 = "step-active",
					this.step.kong2 = ''
			},
			fourStepNext() {
				const imgs = this.img.map((value, index) => {
					return {
						name: value.name,
						uri: value.uri
					}
				})
				if (this.count == 4) {
					if (this.ifdays == true) {
						uni.uploadFile({
							url: 'http://dev.pjy.name:8180/api/bizcust/base/registCusmter',
							files: imgs,
							// filePath: this.idCardZ[0],
							// name: 'file',
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
								"buy_auth_exp": this.day,
								"get_auth_exp": this.days
							},
							success: res => {
								console.log(res)
								if (res.statusCode == 200 && res.data.errorCode == 0) {
									if (res.data.value == 1) {
										uni.navigateTo({
											url: '../../login/login?val='+res.data.value,
										});
									} else {
										uni.uni.showToast({
											title: '用户已存在',
											icon: 'none'
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
						title: '请上传提油授权书',
						icon: 'none'
					})
				}
			},
			// 选择时间
			changeTimes() {
				this.times = false
			},
			bindChange(val) {
				this.day = val;
				this.ifday = true
			},
			bindChanges(val) {
				this.days = val;
				this.ifdays = true
			},

		},
		components: {
			step,
			mButton,
			tButton,
			ruiDatePicker
		},
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
