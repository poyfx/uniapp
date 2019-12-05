<template>

	<view class="nav">
		<view class="navbar">
			<view @tap="order(role,1)">
				<image src="../../static/img/buy.png" alt />
				</image>
				<text>下单购油</text>
			</view>
			<view @tap="orderList(role,2)">
				<image src="../../static/img/query.png" alt />
				</image>
				<text>订单查询</text>
			</view>
			<view @tap="reserveOil(role,0,4)">
				<image src="../../static/img/appointment.png" alt />
				</image>
				<text>预约提油</text>
			</view>
			<view @tap="reserveOil(role,1,8)">
				<image src="../../static/img/scene.png" alt />
				</image>
				<text>现场提油</text>
			</view>

		</view>
		<view class="navbar">
			<view @tap="reserveOilList(role,16)">
				<image src="../../static/img/record.png" alt />
				</image>
				<text>提油记录</text>
			</view>

			<view @tap="invoice(role,32)">
				<image src="../../static/img/invoice.png" alt />
				</image>
				<text>领取发票</text>
			</view>
			<view @tap="integral(64)">
				<image src="../../static/img/integral.png" alt />
				</image>
				<text>积分商城</text>
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
			},
			lock: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				buy_apply: false,
				get_apply: false,
				get_invoice: false,
				arr: '',
			}
		},
		methods: {
			order(role, flag) {
				if (flag & this.lock) {
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
						// console.log(role)
						role.forEach((el, index) => {
							if (el.code == 1) {
								this.buy_apply = true;
								this.arr = el
								console.log(el, index)
							}
						})
						// console.log(this.arr)
						if (this.buy_apply) {
							if (this.arr.role_status == 1 || this.arr.role_status == 2) {
								uni.navigateTo({
									url: '../../pages/order/order'
								})
							} else if (this.arr.role_status == -1) {
								uni.showToast({
									title: '审核中...待审核通过后请重新登录',
									icon: 'none',
									position: 'bottom',
								})
							}
						} else {
							// console.log(2)
							uni.showToast({
								title: '权限不够，请在用户信息界面申请权限',
								icon: 'none',
								position: 'bottom',
							})
						}

					}

				} else {
					uni.showToast({
						title: '待开放，敬请期待',
						icon: 'none',
						position: 'bottom',
					})
				}
				// console.log(role.length)

			},
			orderList(role, flag) {
				if (flag & this.lock) {
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
								icon: 'none',
								position: 'bottom',
							})
						}
					}

				} else {
					uni.showToast({
						title: '待开放，敬请期待',
						icon: 'none',
						position: 'bottom',
					})
				}

			},
			// 预约提油
			reserveOil(role, type, flag) {
				if (flag & this.lock) {
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
									url: '../../pages/reserveOil/reserveOil?type=' + type
								})
							} else if (this.arr.role_status == -1) {
								uni.showToast({
									title: '审核中...待审核通过后请重新登录',
									icon: 'none',
									position: 'bottom',
								})
							} else {
								uni.showToast({
									title: '权限不够，请在用户信息界面申请权限',
									icon: 'none',
									position: 'bottom',
								})
							}
						} else {
							uni.showToast({
								title: '权限不够，请在用户信息界面申请权限',
								icon: 'none',
								position: 'bottom',
							})
						}
					}


				} else {
					uni.showToast({
						title: '待开放，敬请期待',
						icon: 'none',
						position: 'bottom',
					})
				}


			},
			
			reserveOilList(role, flag) {
				if (flag & this.lock) {
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
							icon: 'none',
							position: 'bottom',
						})
					}
				} else {
					uni.showToast({
						title: '待开放，敬请期待',
						icon: 'none',
						position: 'bottom',
					})
				}


			

			},
			// 现场提油
			invoice(role, flag) {
				if (flag & this.lock) {
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
						// console.log(role)
						role.forEach((el, index) => {
							if (el.code == 3) {
								this.get_invoice = true;
								this.arr = el
								console.log(el, index)
							}
						})
						// console.log(this.arr)
						if (this.get_invoice) {
							console.log(this.arr.role_status)
							if (this.arr.role_status == 1 || this.arr.role_status == 2) {
								uni.navigateTo({
									url: '../../pages/receiveInvoice/receiveInvoice'
								})
							} else if (this.arr.role_status == -1) {
								uni.showToast({
									title: '审核中...待审核通过后请重新登录',
									icon: 'none',
									position: 'bottom',
								})
							} else {
								// console.log(1)
								uni.showToast({
									title: '权限不够，请在用户信息界面申请权限',
									icon: 'none',
									position: 'bottom',
								})
							}
						} else {
							// console.log(2)
							uni.showToast({
								title: '权限不够，请在用户信息界面申请权限',
								icon: 'none',
								position: 'bottom',
							})
						}
					
					}
								
				} else {
					uni.showToast({
						title: '待开放，敬请期待',
						icon: 'none',
						position: 'bottom',
					})
				}
				console.log(role)
			
			},
			integral(flag) {
				if (flag & this.lock) {
					uni.showToast({
						title: '待开放，敬请期待',
						icon: 'none',
						position: 'bottom',
					})
				} else {
					uni.showToast({
						title: '待开放，敬请期待',
						icon: 'none',
						position: 'bottom',
					})
				}

			},
		},

	}
</script>

<style>

</style>
