<template>
	<view>
		<view class="nav">
			<view class="navbar">
				<view @tap="order(role)" url="">
					<image src="../../static/img/buy.png" alt />
					</image>
					<text>下单购油</text>
				</view>
				<view @tap="orderList(role)" url="">
					<image src="../../static/img/query.png" alt />
					</image>
					<text>订单查询</text>
				</view>
				<view @tap="reserveOil(role)" url="../../pages/reserveOil/reserveOil">
					<image src="../../static/img/appointment.png" alt />
					</image>
					<text>预约提油</text>
				</view>
				<view @tap="reserveOilList(role)" url="../../pages/reserveOilList/reserveOilList">
					<image src="../../static/img/record.png" alt />
					</image>
					<text>提油记录</text>
				</view>
				<view @tap="integral">
					<image src="../../static/img/integral.png" alt />
					</image>
					<text>积分商城</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		props: ['role'],
		data() {
			return {

			}
		},
		methods: {

			order(role) {
				
				const token = uni.getStorageSync('Token');
				if (token == null || token == '' || token == undefined) {
					uni.showModal({
						title: '提示',
						content: '用户信息已失效，请重新登录',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '../login/login'
								})
							} else {
								uni.reLaunch({
									url: '../login/login'
								})
							};
						}
					})
				} else {
					if (role == 1 || role == 3) {
						uni.navigateTo({
							url: '../../pages/order/order'
						})
					} else {
						uni.showToast({
							title: '权限不够，请在用户信息界面申请权限',
							icon: 'none'
						})
					}
				}



			},
			orderList(role) {
				
				const token = uni.getStorageSync('Token');
				if (token == null || token == '' || token == undefined) {
					uni.showModal({
						title: '提示',
						content: '用户信息已失效，请重新登录',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '../login/login'
								})
							} else {
								uni.reLaunch({
									url: '../login/login'
								})
							};
						}
					})
				} else {
					if (role == 1 || role == 3) {
						uni.navigateTo({
							url: '../../pages/orderList/orderList',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '权限不够，请在用户信息界面申请权限',
							icon: 'none'
						})
					}
				}



			},
			reserveOil(role) {
				
				const token = uni.getStorageSync('Token');
				if (token == null || token == '' || token == undefined) {
					uni.showModal({
						title: '提示',
						content: '用户信息已失效，请重新登录',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '../login/login'
								})
							} else {
								uni.reLaunch({
									url: '../login/login'
								})
							};
						}
					})
				} else {
					console.log(role)
					if (role == 2 || role == 3) {
						uni.navigateTo({
							url: '../../pages/reserveOil/reserveOil'
						})
					} else {
						uni.showToast({
							title: '权限不够，请在用户信息界面申请权限',
							icon: 'none'
						})
					}
				}


			},
			reserveOilList(role) {
				
				const token = uni.getStorageSync('Token');
				if (token == null || token == '' || token == undefined) {
					uni.showModal({
						title: '提示',
						content: '用户信息已失效，请重新登录',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '../login/login'
								})
							} else {
								uni.reLaunch({
									url: '../login/login'
								})
							};
						}
					})
				} else {
					if (role == 2 || role == 3) {
						uni.navigateTo({
							url: '../../pages/reserveOilList/reserveOilList'
						})
					} else

					{
						uni.showToast({
							title: '权限不够，请在用户信息界面申请权限',
							icon: 'none'
						})
					}
				}


			},
			integral() {
				uni.showToast({
					title: '待开放，敬请期待',
					icon: 'none'
				})
			},
		},
		
	}
</script>

<style>

</style>
