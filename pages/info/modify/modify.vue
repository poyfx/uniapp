<template>
	<view class="content">
		<view class="fget-num paddingLeft15">
			<setPassword :textValue="old" :placeholder="placeholder" v-model="oldpws"></setPassword>
			<setPassword :textValue="new1" :placeholder="newPlaceholder" v-model="newpws1"></setPassword>
			<setPassword class="new" :textValue="new2" :placeholder="newPlaceholder" v-model="newpws2"></setPassword>
		</view>
		<view class="mTop20">
			<mButton :value="value" class="mTop15" :type="type" @sureModify="sureModify"></mButton>
		</view>

	</view>


</template>

<script>
	import setPassword from '../../../components/setPassword/setPassword.vue'
	import mButton from '../../../components/m-button.vue'
	export default {
		data() {
			return {
				old: '旧密码',
				new1: '新密码',
				new2: '确认密码',
				newTextValue: '输入旧密码',
				placeholder: '输入新密码',
				newPlaceholder: '再次输入密码',
				value: '确认修改',
				type: 'primary',
				oldpws: '',
				newpws1: '',
				newpws2: ''
			}
		},
		methods: {
			sureModify() {
				const that = this;
				if (this.oldpws !== '' && this.oldpws !== null) {
					if (this.newpws1 !== '' && this.newpws1 !== null) {
						if (this.newpws1.length >= 6) {
							if (this.newpws1 == this.newpws2) {
								this.test.post('user/updatePwd', {
									oldPwd: this.oldpws,
									newPwd: this.newpws2
								}).then(res => {
									console.log(res)
									if (res.statusCode == 200 && res.data.errorCode == 0) {
										uni.showModal({
											title: "修改成功",
											content: '修改密码成功请重新登录',
											showCancel: false,
											success: function() {
												uni.reLaunch({
													url: "../../login/login"
												})
											}
										})
									} else if (res.data.errorCode == -10001 || res.data.errorCode == -10002 || res.data.errorCode == -10003) {
										uni.showModal({
											title: '提示',
											content: res.data.message,
											success: function(res) {
												if (res.confirm) {
													uni.reLaunch({
														url: '../../login/login'
													})
												} else {
													uni.reLaunch({
														url: '../../login/login'
													})
												}
											}
										})
									} else if (res.data.errorCode == -10000) {
										console.log(1)
									} else {
										uni.showToast({
											title: res.data.message,
											icon: "none",
											position: 'bottom',
											duration: 3000,
										})
									}
								}).catch(err => {
									console.log(err)
								})
							} else {
								uni.showToast({
									title: "两次密码不一致",
									icon: "none",
									position: 'bottom',
									duration: 3000,
								})
							}
						} else {
							uni.showToast({
								title: "密码长度不能小于6",
								icon: "none",
								position: 'bottom',
								duration: 3000,
							})
						}

					} else {
						uni.showToast({
							title: "请输入新密码",
							icon: "none",
							position: 'bottom',
							duration: 3000,
						})
					}
				} else {
					uni.showToast({
						title: '请输入旧密码',
						icon: "none",
						position: 'bottom',
						duration: 3000,
					})
				}
			}
		},
		components: {
			setPassword,
			mButton
		}
	}
</script>

<style>
	.new {
		border: none;
	}
</style>
