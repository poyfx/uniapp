<template>
	<view class="mTop15" >
		<!-- <view class="step-box">
			<step :value="value1" ref="one" :actives="active"></step>
		</view> -->
		<form enctype="multipart/form-data" @reset="formReset">
			<view class="fget-num">
				<view class="fget-ul">
					<text>上传<text style="color: #FF0000;"></text> 授权委托书</text>
					<text class="color-dff" @tap="all">点击上传</text>
				</view>
				<view class="positive">
					<image :src="src" class="idCard" mode="aspectFit"></image>
				</view>
				<view class="tellinfo">
					<text>授权书示例</text>
				</view>
				<view class="flex  m-info">
					<view class="flex center m-info-content">
						<text style="width: 6rem;">授权书有效期</text>
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
						<image src="../../../../static/img/right.png" mode="aspectFit" style="width: 12px; height: 12px;"></image>
					</view>
				</view>
			</view>
		</form>
		<view class="mTop15 mB10">
			<button type="primary" @tap="commit" class="commit">提交</button>
		</view>
	</view>
</template>

<script>
	import three from '@/static/img/information3x.png'
	import step from '@/components/step/step'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				// value1: '第一步',
				// active: 'step-active',
				times: true,
				day: '1970-01-01',
				dayIs: false,
				src: three,
				inputs: '',
				img: '',
				userCode: '',
				name: '',
				Token: '',
				faceimg: {
					name: 'face_photo',
					uri: '',
				},
				customer_id:''//公司id
			};
		},
		onLoad(option) {
			this.faceimg.uri = option.faceimg;
			this.userCode = option.userCode;
			this.customer_id = option.customer_id
			const that = this;
			uni.getStorage({
				key: 'Token',
				success: res => {
					that.Token = res.data;
				}
			})
		},
		methods: {
			all() {
				const that = this;
				// if(){
				// 	
				// }
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: function(res) {
						that.img = [];
						console.log(res)
						that.src = res.tempFilePaths[0];
						// that.img = res.tempFilePaths[0];
						var upname
						if (that.userCode == 1) {
							upname = "buy_auth_photo"
						} else if (that.userCode == 2) {
							upname = "get_auth_photo"
						} else {
							upname = "bill_auth_photo"
						}

						const photo = {
							name: upname,
							uri: res.tempFilePaths[0]
						};

						that.img.push(photo)
						console.log(that.img)
					}
				})
			},
			commit() {
				var $api = "http://dev.pjy.name:8170/api/bizcust/";
			//	var $api = "http://192.168.0.156:9494/api/bizcust/";
				if (this.img !== '' && this.img !== null) {
					if (this.dayIs) {
						if (this.userCode == 1) {
							// this.img.push(this.faceimg)
							const imgs = this.img.map((value, index) => {
								return {
									name: value.name,
									uri: value.uri
								}
							});
							console.log(imgs)
							uni.uploadFile({ //$api+
								url: $api + 'user/oil_authorize',
								files: imgs,
								// filePath: this.img,
								// name: this.name,
								header: {
									Token: this.Token
								},
								formData: {
									"roles": this.userCode,
									"buy_auth_exp": this.day,
									"customer_id":this.customer_id,
								},
								success: function(res) {
									console.log(res)
									var data = JSON.parse(res.data)
									if (res.statusCode == 200 && data.errorCode == 0) {
										uni.showToast({
											title: '申请成功，待管理员确认',
											icon: 'none',
											position: 'bottom',
											duration: 1500,
										})
										setTimeout(function() {
											uni.hideToast();
											uni.switchTab({
												url: '../../info'
											})
										}, 1500)
									} else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											position: 'bottom',
											duration: 3000,
										})
									}
								},
								fail: err => {
									console.log(err)
								}
							})
						} else if (this.userCode == 2) {
							this.img.push(this.faceimg)
							const imgs = this.img.map((value, index) => {
								return {
									name: value.name,
									uri: value.uri
								}
							});
							uni.uploadFile({
								url: $api + 'user/oil_authorize',
								files: imgs,
								name: this.name,
								header: {
									Token: this.Token
								},
								formData: {
									"roles": this.userCode,
									"get_auth_exp": this.day,
										"customer_id":this.customer_id,
								},
								success: function(res) {
									console.log(res)
									var data = JSON.parse(res.data)
									if (res.statusCode == 200 && data.errorCode == 0) {
										uni.showToast({
											title: '申请成功，待管理员确认',
											icon: 'none',
											position: 'bottom',
											duration: 1500,
										})
										setTimeout(function() {
											uni.hideToast();
											uni.switchTab({
												url: '../../info'
											})
										}, 1500)
									} else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											position: 'bottom',
											duration: 3000,
										})
									}
								},
								fail: err => {
									console.log(err)
								}
							})
						} else {
							 this.img.push(this.faceimg)
							const imgs = this.img.map((value, index) => {
								return {
									name: value.name,
									uri: value.uri
								}
							});
							imgs.forEach(el=>{
								console.log(el)
							})
							console.log(imgs)
							uni.uploadFile({
								url: $api + 'user/oil_authorize',
								files: imgs,
								name: this.name,
								header: {
									Token: this.Token
								},
								formData: {
									"roles": this.userCode,
									"bill_auth_exp": this.day,
										"customer_id":this.customer_id,
								},
								success: function(res) {
									var data = JSON.parse(res.data)
									console.log(data)
									if (res.statusCode == 200 && data.errorCode == 0) {
										uni.showToast({
											title: '申请成功，待管理员确认',
											icon: 'none',
											position: 'bottom',
											duration: 3000,
										})
										setTimeout(function() {
											uni.hideToast();
											uni.switchTab({
												url: '../../info'
											})
										}, 1500)

									} else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											position: 'bottom',
											duration: 3000,
										})
									}
								},
								fail: err => {
									console.log(err)
								}
							})
						}
					} else {
						uni.showToast({
							title: '请选择授权书的有效时间',
							icon: 'none',
							position: 'bottom',
							duration: 3000,
						})
					}
				} else {
					uni.showToast({
						title: '上传图片不能为空',
						icon: 'none',
						position: 'bottom',
						duration: 3000,
					})
				}
			},
			changeTimes() {
				this.times = false;
				this.$refs.date.show()
			},
			onConfirm(val) {
				this.day = val.result;
				this.dayIs = true;
			}
		},
		components: {
			wPicker,
			step
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

	.commit {
		width: 90%;
		margin: 0 auto;
		background-color: #00A8ff;
	}
</style>
