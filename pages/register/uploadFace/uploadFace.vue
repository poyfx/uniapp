<template>
	<view class="uploadFace_box">

		<view class="self_header_bar">
			<view class="top_view"></view>
		</view>
		<view class="title_content">
			<view class="self_header_title flex">
				<view class="leftBtn" @tap="back">
					<uni-icons type="arrowleft" size="27"></uni-icons>
				</view>
				<view>{{title}}</view>
				<view class="playagain" v-show="playagains" @tap="startshot">
					重拍
				</view>
			</view>
		</view>



		<view class="uploadFace" :style="{height:scrollheight+'px'}">

			<view class="uploadFace_title">
				<text>拍摄时，请将镜头对准您的脸，按提示操作</text>
			</view>
			<view class="uploadFace_image">
				<image :src="src" mode="aspectFit" @tap="seeExample(1)"></image>
			</view>
			<view class="uploadFace_examplebtn">
				<button type="primary" @tap="seeExample(2)">查看图片示例</button>
			</view>
			<view class="uploadFace_example flex">
				<view class="uploadFace_example_box flex">
					<image src="../../../static/img/example_no_g.png" mode="aspectFit"></image>
					<text>不能戴眼镜</text>
				</view>
				<view class="uploadFace_example_box flex">
					<image src="../../../static/img/example_no_l.png" mode="aspectFit"></image>
					<text>不能遮罩脸部</text>
				</view>
				<view class="uploadFace_example_box flex">
					<image src="../../../static/img/example_no_m.png" mode="aspectFit"></image>
					<text>光线不要太暗</text>
				</view>

			</view>
			<view class="uploadFace_btn " v-show="!playagains">
				<button type="primary" @tap="startshot">开始拍摄</button>

			</view>
			<view class="uploadFace_btn " v-show="playagains">
				<button type="primary" @tap="commit">提交</button>
			</view>
		</view>

	</view>


</template>

<script>
	import example from '../../../static/img/example_people.png'
	import one from '@/static/img/example.png'
	export default {
		data() {
			return {
				title: '人脸识别',
				src: one,
				playagains: false,
				checkUser: '',
				name: '',
				length: '', //选择几个权限
				phoneHeight: '',
				scrollheight: '',
				user: '', //申请对应权限
				userCode: '', //对应权限的id
				upimg: false, //是否上传了图片
				example: example,
				customer_id: '' //公司id
			}
		},
		onLoad(option) {
			this.checkUser = option.user;
			this.name = option.name;
			this.length = option.length;
			this.user = option.user;
			this.userCode = option.userCode;
			this.customer_id = option.customer_id;
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
					that.scrollheight = that.phoneHeight - 44 - 35
				}
			});

		},
		methods: {
			seeExample(val) {

				if (val == 2) {
					uni.previewImage({
						urls: [this.example],
					})
				} else {
					uni.previewImage({
						urls: [this.src],
					})
				}

			},
			startshot() {
				const that = this;

				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: (chooseImageRes) => {
						console.log(chooseImageRes)
						that.src = chooseImageRes.tempFilePaths[0];
						that.playagains = true;
						that.upimg = true;
					}
				});
				// debugger
				// //#ifdef APP-PLUS  
				// var cmr = plus.camera.getCamera(1);
				// var el = cmr.supportedImageResolutions[0];
				// var fmt = cmr.supportedImageFormats[0];
				// console.log(fmt)
				// cmr.captureImage(function(path) {
				// 	that.playagains = true;
				// 	that.upimg = true;
				// 	console.log(path)
				// 	that.src = path;
				// 	that.cutImage()
				// }, function(err) {
				// 	console.log(err)
				// }, {
				// 	resolution: el,
				// 	format: fmt
				// });
				// //#endif

			},
			cutImage() {
				const that = this;
				var timestamp = new Date().getTime();
				console.log(timestamp)
				//#ifdef APP-PLUS  
				plus.zip.compressImage({
						src: that.src,
						dst: '_docs' + timestamp + '/a.jpg',
						quality: 50
					},
					function(res) {
						// console.log(res)
						that.src = res.target;
					},
					function(error) {
						console.log(error);
					});
				//#endif
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			commit() {
				var _url =this.$api+ 'base/detection_face'
				const that = this
				if (this.upimg == true) {

					uni.uploadFile({
						url: _url, //仅为示例，非真实的接口地址
						filePath: that.src,
						name: 'face_photo',
						success: (res) => {

							let datas = JSON.parse(res.data);
							console.log(datas);
							if (datas.errorCode == 0 && res.statusCode == 200) {
								console.log(1)
								if (this.name == 'apply') {
									uni.navigateTo({
										url: '../../info/apply/uploadImg/uploadImg?name=' + "apply" + '&user=' + that.user + '&userCode=' + that.userCode +"&faceimg=" + that.src+'&customer_id=' + this.customer_id,
									})
								} else {
									console.log(this.src)
									console.log(2)
									if (that.length == 1) {
										uni.navigateTo({
											url: '../positive/positive1?name=' + "register" + "&user=" + that.checkUser + "&faceimg=" + that.src 
												
										})


									} else if (that.length == 2) {
										uni.navigateTo({
											url: "../positive/positive2?name=" + "register" + "&user=" + that.checkUser + "&faceimg=" + that.src,
											success: res => {

											}
										})


									} else if (that.length == 3) {
										uni.navigateTo({
											url: "../positive/positive?name=" + "register" + "&user=" + that.checkUser + "&faceimg=" + that.src,
											success: res => {

											}
										})
									}

								}
							} else {
								console.log(JSON.parse(res.data))
								let datas = JSON.parse(res.data)
								uni.showToast({
									title: datas.message,
									icon: 'none',
									position: 'bottom'
								})
							}
						},
						fail: (err) => {
							console.log(err)
						}
					});


				} else {
					uni.showToast({
						title: '请先拍张自拍照',
						icon: 'none',
						position: 'bottom',
					})
				}


			},

		},

		components: {

		}
	}
</script>

<style>
	.uploadFace_box {
		width: 100%;
		height: 100Vh;
		background-color: #FFFFFF;
	}

	.uploadFace {
		width: 100%;
		height: 100%;
		background: #fff;
		padding: 0 0 15px 0;
	}

	.uploadFace_title {
		width: 100%;
		padding: 40px 0 24px;
		font-size: 14px;
		text-align: center;
	}

	.uploadFace_title text {
		font-size: 0.8rem;
	}

	.uploadFace_image {
		widows: 100%;
		text-align: center;
		margin-bottom: 16px;

	}

	.uploadFace_image image {
		width: 242px;
		height: 200px;
		border: 1px dashed #666;
	}

	.uploadFace_examplebtn {
		width: 100%;
		margin-bottom: 24px;
	}

	.uploadFace_examplebtn button {
		width: 9rem;
		height: 2rem;
		background: #fff;
		color: #00A8FF;
		border: 1px solid #00A8FF;
		border-radius: 4px;
		line-height: 2rem;
		font-size: 0.8rem;
	}

	.uploadFace_example {
		width: 100%;
	}

	.uploadFace_example_box {
		flex-direction: column;
		justify-content: center;
		text-align: center;
		margin: 0 auto 56px;
	}

	.uploadFace_example_box image {
		width: 4.8rem;
		height: 4.8rem;
		/* border: 1px dashed #666; */
	}

	.uploadFace_example_box text {
		font-size: 0.6rem;
		margin-top: 8px;
		color: #9e9e9e;
	}

	.uploadFace_btn {
		width: 100%;
		margin-bottom: 15px;
	}

	.uploadFace_btn button {
		width: 90%;
		margin: 0 auto;
		background: #00A8FF;
		border-radius: 4px;
		z-index: 999;
	}

	.crop {
		width: 100%;
		height: 100%;
		background: #000;
		position: absolute;
		top: 0;
		left: 0;
	}

	.m-two-btn button {
		width: 6em;
		background: #00A8FF;
		border-radius: 4px;
		z-index: 999;
	}

	.playagain {
		font-size: 0.7em;
		height: 20px;
		position: absolute;
		right: 15px;
		top: 50%;
		margin-top: -10px;
		color: #616161;
	}
</style>
