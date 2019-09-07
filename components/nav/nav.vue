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
				buy_apply: false,
				get_apply: false,
				arr: ''
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
					console.log(role)
					role.forEach((el, index) => {
							if (el.code == 1) {
								this.buy_apply = true;
								this.arr = el
								console.log(el,index)
							}
					})
					console.log(this.arr)
					if (this.buy_apply) {
						console.log(this.arr.role_status)
						if (this.arr.role_status == 1 || this.arr.role_status == 2) {
							uni.navigateTo({
								url: '../../pages/order/order'
							})
						} else if (this.arr.role_status == -1) {
							uni.showToast({
								title: '审核中...待审核通过后请重新登录',
								icon: 'none'
							})
						} else {
							console.log(1)
							uni.showToast({
								title: '权限不够，请在用户信息界面申请权限',
								icon: 'none'
							})
						}
					} else {
						console.log(2)
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
					role.forEach(el => {
						if (el.code == 1) {
							this.buy_apply = true;
							this.arr = el
						}
					})
					if (this.buy_apply) {
						// if (this.arr.role_status == 1 || this.arr.role_status == 2) {
							uni.navigateTo({
								url: '../../pages/orderList/orderList'
							})
						// } else if (this.arr.role_status == -1) {
						// 	uni.showToast({
						// 		title: '审核中...待审核通过后请重新登录',
						// 		icon: 'none'
						// 	})
						// } else {
						// 	uni.showToast({
						// 		title: '权限不够，请在用户信息界面申请权限',
						// 		icon: 'none'
						// 	})
						// }
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
					role.forEach(el => {
						if (el.code == 2) {
							this.get_apply = true;
							this.arr = el
						}
					})
					if (this.get_apply) {
						if (this.arr.role_status == 1 || this.arr.role_status == 2) {
							uni.navigateTo({
								url: '../../pages/reserveOil/reserveOil'
							})
						} else if (this.arr.role_status == -1) {
							uni.showToast({
								title: '审核中...待审核通过后请重新登录',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '权限不够，请在用户信息界面申请权限',
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							title: '权限不够，请在用户信息界面申请权限',
							icon: 'none'
						})
					}
				}


			},
			reserveOilList(role) {
				role.forEach(el => {
					if (el.code == 2) {
						this.get_apply = true;
						this.arr = el;
					}
				})
				if (this.get_apply) {
					// if (this.arr.role_status == 1 || this.arr.role_status == 2) {
						uni.navigateTo({
							url: '../../pages/reserveOilList/reserveOilList'
						})
					// } else if (this.arr.role_status == -1) {
					// 	uni.showToast({
					// 		title: '审核中...待审核通过后请重新登录',
					// 		icon: 'none'
					// 	})
					// } else {
					// 	uni.showToast({
					// 		title: '权限不够，请在用户信息界面申请权限',
					// 		icon: 'none'
					// 	})
					// }
				} else {
					uni.showToast({
						title: '权限不够，请在用户信息界面申请权限',
						icon: 'none'
					})
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
