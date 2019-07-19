<template>
	<view class="content">
		<view class="fget-num paddingLeft15">
			<setPassword :textValue="textValue" :placeholder="placeholder" v-model="setPassword"></setPassword>
			<setPassword :textValue="newTextValue" :placeholder="newPlaceholder" v-model="newPassword"></setPassword>
		</view>
		<mButton :value="value" class="mTop15" :type="type" @sureModify="sureModify"></mButton>
	</view>

</template>

<script>
	import setPassword from "../../../components/setPassword/setPassword"
	import mButton from '../../../components/m-button.vue'
	export default {
		data() {
			return {
				textValue: '新密码',
				placeholder: '请输入密码',
				newTextValue: '确认新密码',
				newPlaceholder: '再次输入密码',
				value: '确认修改',
				type: "primary",
				setPassword: "",
				newPassword: '',
				username: '',
				message: '',
			}
		},
		methods: {
			sureModify() {
				console.log(this.setPassword.length)
				
				if (this.setPassword !== '' && this.setPassword !== null) {
					if (this.setPassword.length > 5) {
						if (this.newPassword == this.setPassword) {
							uni.request({
								url:this.$https + 'user/forgetPwd/update',
								data:{
									username:this.username,
									pswCode:this.message,
									newPwd:this.newPassword
								},
								method:"GET",
								header:{
									"Content-Type": "application/x-www-form-urlencoded",
								},
								success:function(res){
									uni.showToast({
										"title":"修改成功",
										"icon":"none",
									})
									setTimeout(function() {
										uni.navigateTo({
											url:'../login'
										})
									}, 1200)
								}
							})
						} else {
							return uni.showToast({
								"title": "两次密码不一致",
								"icon": 'none'
							})
						}
					}else{
						uni.showToast({
							"title":"密码不能小于6位",
							"icon":"none"
						})
					}
				} else {
					return uni.showToast({
						"title": "新密码不能为空",
						"icon": "none"
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
</style>
