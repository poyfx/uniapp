<template>
	<view class="background">
		<view class="">
			<view class="ce mt300">
				<image class="startimg" :src="src" mode="aspectFit"></image>
			</view>
			<view class="p-bx">
				<view class="p-size">{{name}}</view>
				<view>version 1.0</view>
			</view>
		</view>
	</view>
</template>
<script>
	import logo from "../../static/img/logo.png"
	import {
		mapState,
		mapActions,
	} from 'vuex'
	export default {
		name: 'Start',
		data() {
			return {
				name: '安徽石油商户中心',
				src: logo
			}
		},
		onShow() {
			console.log(this.hasLogin)
			if (this.hasLogin == false) {
				const timer = setTimeout(function() {
					uni.navigateTo({
						url: '../login/login',
						success: function() {
							clearTimeout(timer)
						}
					})
				}, 2000)

			} else {
				const timer = setTimeout(function() {
					uni.switchTab({
						url: 'index',
						success: function() {
							clearTimeout(timer)
						}
					})
				}, 2000)
				 this.getNewInfo();
			};
			
		},
		methods: {
			
			//app退出再次进入时获取最新信息
			getNewInfo() {
			const that = this;
				this.test.post('user/get_base_data',{
					Token:this.Token
				}).then(res => {
					// console.log(res)
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

		},
		computed: {
			...mapState(["hasLogin", "userInfo", "roles",'Token'])
		},
	}
</script>
<style scoped>
	.background {
		/* background-color: #fff; */
		background:url('http://dev.pjy.name:8180/uploads/bizcust_main.png') no-repeat ;
		background-size:100% 100% ;
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
		/* box-shadow: 0 1px 3px rgba(0,0,0,0.14); */
		margin-top: 108px;
	}

	.p-bx {
		width: 130px;
		position: absolute;
		bottom: 20px;
		left: 50%;
		margin-left: -65px;
		text-align: center;
		color:#666666;
	}

	.p-size {
		font-size: 16px;
		margin-bottom: 6px;
	}
</style>
