<template>
	<view class="content">
		<view class="fget-num paddingLeft15">
			<setPassword :textValue="pws.textValue" :placeholder="pws.placeholder" v-model="pws.setPasswords"></setPassword>
			<setPassword :textValue="pws.newTextValue" :placeholder="pws.newPlaceholder" v-model="pws.newPassword"></setPassword>
		</view>
		<view class="goNext">
			<mButton :value="value" :type="type" @sureModify="sureModify"></mButton>
		</view>

	</view>

</template>

<script>
	import setPassword from "../../../components/setPassword/setPassword"
	import mButton from '@/components/m-button.vue'
	export default {
		data() {
			return {
				pws: {
					textValue: '新密码',
					placeholder: '请输入密码',
					newTextValue: '确认密码',
					newPlaceholder: '再次输入密码',
					setPasswords: "",
					newPassword: '',
				},

				value: '确认修改',
				type: "primary",
				
				username: '', //获取短信验证码传过来的username
				message: '', //短信验证码
			}
		},
		methods: {
			sureModify() {
				console.log(this.pws.setPasswords)
				console.log(this.pws.setPasswords.length)

				if (this.pws.setPasswords !== '' && this.pws.setPasswords !== null) {
					if (this.pws.setPasswords.length > 5) {
						if (this.pws.newPassword == this.pws.setPasswords) {
							this.test.post('base/forgetPwd/update', {
								username: this.username,
								pswCode: this.message,
								newPwd: this.pws.newPassword
							}).then(res => {
								console.log(res)
								uni.showToast({
									"title": "修改成功",
								})
								setTimeout(function() {
									uni.navigateTo({
										url: '../login'
									})
								}, 1200)
							}).catch(err => {
								console.log(err)
							})
							// uni.request({
							// 	url:this.$https + 'user/forgetPwd/update',
							// 	data:{
							// 		username:this.username,
							// 		pswCode:this.message,
							// 		newPwd:this.newPassword
							// 	},
							// 	method:"GET",
							// 	header:{
							// 		"Content-Type": "application/x-www-form-urlencoded",
							// 	},
							// 	success:function(res){
							// 		uni.showToast({
							// 			"title":"修改成功",
							// 			"icon":"none",
							// 		})
							// 		setTimeout(function() {
							// 			uni.navigateTo({
							// 				url:'../login'
							// 			})
							// 		}, 1200)
							// 	}
							// })
						} else {
							return uni.showToast({
								"title": "两次密码不一致",
								"icon": 'none',
								position:'bottom',
							})
						}
					} else {
						uni.showToast({
							"title": "密码不能小于6位",
							"icon": "none",
							position:'bottom',
						})
					}
				} else {
					return uni.showToast({
						"title": "新密码不能为空",
						"icon": "none",
						position:'bottom',
					})
				}
			}
		},
		onLoad(option) {
			this.username = option.user;
			this.message = option.message
		},
		components: {
			setPassword,
			mButton
		}
	}
</script>

<style>
	.goNext {
		margin-top: 23px;
	}
</style>
