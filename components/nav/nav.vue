<template>
	<view>
		<view class="nav">
			<view class="navbar">
				<view @tap="order(role)">
					<image src="../../static/img/buy.png" alt />
					</image>
					<text>下单购油</text>
				</view>
				<view @tap="orderList(role)">
					<image src="../../static/img/query.png" alt />
					</image>
					<text>订单查询</text>
				</view>
				<view @tap="reserveOil(role)">
					<image src="../../static/img/appointment.png" alt />
					</image>
					<text>预约提油</text>
				</view>
				<view @tap="reserveOilList(role)">
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
		props: {
			role: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			order(role) {
				console.log(role.length)
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
					console.log(role.length)
					if (role.lenght > 1) {
						
						uni.navigateTo({
							url: '../../pages/order/order'
						})
					} else {
						console.log(role.length)
						if (role[0].code == 1) {
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
					if (role.length > 1) {
						uni.navigateTo({
							url: '../../pages/orderList/orderList'
						})
					} else {
						if (role[0].code == 1) {
							uni.navigateTo({
								url: '../../pages/orderList/orderList'
							})
						} else {
							uni.showToast({
								title: '权限不够，请在用户信息界面申请权限',
								icon: 'none'
							})
						}
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
					if (role.length > 1) {
						uni.navigateTo({
							url: '../../pages/reserveOil/reserveOil'
						})
					} else {
						if (role[0].code == 2) {
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
					if (role.length > 1) {
						console.log(role.length)
						uni.navigateTo({
							url: '../../pages/reserveOilList/reserveOilList'
						})
					} else {
							console.log(role.length)
						if (role[0].code == 2) {
							uni.navigateTo({
								url: '../../pages/reserveOilList/reserveOilList'
							})
						} else {
							uni.showToast({
								title: '权限不够，请在用户信息界面申请权限',
								icon: 'none'
							})
						}
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
