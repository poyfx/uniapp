<template>
	<view class="background">
		<view class="">
			<view class="ce mt300">
				<image class="startimg"  :src="src" mode="aspectFit"></image>
			</view>
			<view class="p-bx">
				<view class="p-size">{{name}}</view>
				<view>version {{version}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import logo from "../../static/img/logo.png"
	// import {
	// 	mapState,
	// 	mapActions,
	// } from 'vuex'
	export default {
		name: 'Start',
		data() {
			return {
				name: '安徽石油商户中心',
				src: logo,
				version: '',
				token: '',
			}
		},
		onShow() {
				
			//#ifdef APP-PLUS  
			this.version = plus.runtime.version
			//#endif
			console.log(this.hasLogin)
			const that = this;
			uni.getStorage({
			
				key: "TokenR",
				success: function(res) {
					console.log(res)
					that.token = res.data
					that.updateToken()
				},
				fail:function(err){
					const timer = setTimeout(function() {
							
						uni.navigateTo({
							url: '../login/login',
							success: function() {
								clearTimeout(timer)
							}
						})
					}, 2000)
				}
			})
			// try {
			//     const value = uni.getStorageSync('TokenR');
			//     if (value) {
			//         console.log(value);
			//     }
			// } catch (e) {
			//     // error
			// }
			
			// if (this.token == '' || this.token== null) {
			// 	const timer = setTimeout(function() {
			// 		uni.navigateTo({
			// 			url: '../login/login',
			// 			success: function() {
			// 				clearTimeout(timer)
			// 			}
			// 		})
			// 	}, 2000)

			// } else {
			// 	const timer = setTimeout(function() {
			// 		uni.switchTab({
			// 			url: 'index',
			// 			success: function() {
			// 				clearTimeout(timer)
			// 			}
			// 		})
			// 	}, 2000)
			// 	this.getNewInfo();
			// };

		},
		methods: {

			//app退出再次进入时获取最新信息
			getNewInfo() {
			
				const that = this;
				this.test.post('user/get_base_data', {
					Token: this.token
				}).then(res => {
					console.log(res)
					// debugger
					// uni.setStorageSync('userInfo',res.data.value)
					uni.setStorage({
						key: 'userInfo',
						data: res.data.value,
					});



				}).catch(err => {
					console.log(err)
				})
			},
			updateToken() {
			
				this.test.post('base/refreshToken', {
					refresh_token: this.token,
				}).then(res => {
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						const timer = setTimeout(function() {
							uni.switchTab({
								url: './index',
								success: function() {
									clearTimeout(timer)
								}
							})
						}, 2000)
						this.getNewInfo();
					} else {
						const timer = setTimeout(function() {
							uni.navigateTo({
								url: '../login/login',
								success: function() {
									clearTimeout(timer)
								}
							})
						}, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},

		},
		// computed: {
		// 	...mapState(["hasLogin", "userInfo", "roles"])
		// },
	}
</script>
<style scoped>
	.background {
		/* background-color: #fff; */
		background: url('http://dev.pjy.name:8170/uploads/bizcust_main.png') no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.startimg {
		width: 200px;
		height: 200px;
		box-shadow: 0 3px 6px rgba(0,0,0,0.14);
		margin-top: 108px;
		border-radius:38px ;
	}

	.p-bx {
		width: 100%;
		position: absolute;
		bottom: 20px;
		left: 0;

		text-align: center;
		color: #616161;
	}

	.p-bx view {
		width: 100%;
		font-size: 24upx;
	}

	.p-bx .p-size {
		font-size: 33upx;
		margin-bottom: 6px;
	}
</style>
