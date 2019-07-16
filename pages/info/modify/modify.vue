<template>
	<view class="content">
		<view class="fget-num">
			<setPassword :textValue="old" :placeholder="placeholder" v-model="oldpws"></setPassword>
			<setPassword :textValue="new1" :placeholder="newPlaceholder" v-model="newpws1"></setPassword>
			<setPassword :textValue="new2" :placeholder="newPlaceholder" v-model="newpws2"></setPassword>
		</view>
		<mButton :value="value" class="mTop15" :type="type"></mButton>
	</view>
	

</template>

<script>
	import setPassword from '../../../components/setPassword/setPassword.vue'
	import mButton from '../../../components/m-button.vue'
	export default {
		data() {
			return {
			old:'旧密码',
			new1:'新密码',
			new2:'新密码',
			newTextValue:'输入旧密码',
			placeholder:'输入新密码',
			newPlaceholder:'再次输入密码',
			value:'确认修改',
			type:'primary',
			oldpws:'1111111',
			newpws1:'2222222',
			newpws2:'3333333'
			}
		},
		methods:{
		
		},
		components: {
			setPassword,
			mButton
		}
	}
</script>

<style>
	
</style>
