<template>
	<view class="content">
		<view class="fget-num paddingLeft15">
			<infoImg :textContent="text.user" :disabled="text.disabled" :placeholder="text.userP"></infoImg>
			<infoImg :textContent="text.company" :disabled="text.disabled" :placeholder="text.companyP"></infoImg>
			<infoText :textValue="text.userName" :placeholder="text.userNameP"></infoText>
			<infoText :textValue="text.userId" :placeholder="text.userIdP"></infoText>
			<infoText :textValue="text.phoneNum" :placeholder="text.phoneNumP"></infoText>
			<infoText :textValue="text.city" :placeholder="text.cityP"></infoText>
			<infoText :textValue="text.customerName" :placeholder="text.customerNameP" class="noneB"></infoText>
			<setPassword :textValue="textValue" :placeholder="placeholder"></setPassword>
			<setPassword :textValue="newTextValue" :placeholder="newPlaceholder"></setPassword>
		</view>
		<view class="mTop20">
			<mButton :value="value" :type="type" @goPositive="goPositive"></mButton>
		</view>
		
	</view>
</template>

<script>
	import infoText from '../../components/m-info-text/m-info-text'
	import infoImg from '../../components/m-info-img/m-info-img'
	import setPassword from "../../components/setPassword/setPassword"
	import mButton from '../../components/m-button.vue'
	export default {
		data() {
			return {
				text: {
					user: '角色',
					userName: '姓名',
					userId: '身份证',
					company: '公司',
					phoneNum: '手机',
					city: '所在城市',
					customerName: '客户经理',
					disabled: true,
					userP: '请选择角色',
					companyP: '选择公司',
					userNameP: '姓名',
					userIdP: '身份证号码',
					phoneNumP: '电话号码',
					cityP: '所在城市',
					customerNameP: '请输入客户经理姓名'
				},
				textValue: '登录密码',
				newTextValue: '确认密码',
				placeholder: '请输入密码',
				newPlaceholder: '请在此输入密码',
				type: 'primary',
				value: '下一步',
				url: '../register/register'
			}
		},
		methods: {
			goPositive() {
				uni.navigateTo({
					url: "positive/positive"
				})
			},
			oilByCompany() {
				uni.navigateTo({
					url: '../order/oilByCompany/oilByCompany?address=' + this.url
				})
			}
		},
		components: {
			infoText,
			infoImg,
			setPassword,
			mButton
		},
		onLoad(option) {
			this.company = option.newaddress
		}
	}
</script>

<style scoped>
	.setpws {
		border-top: 1px solid #e5e5e5;
	}

</style>
