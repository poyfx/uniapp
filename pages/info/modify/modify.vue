<template>
	<view class="content">
		<view class="fget-num paddingLeft15">
			<setPassword :textValue="old" :placeholder="placeholder" v-model="oldpws"></setPassword>
			<setPassword :textValue="new1" :placeholder="newPlaceholder" v-model="newpws1"></setPassword>
			<setPassword :textValue="new2" :placeholder="newPlaceholder" v-model="newpws2"></setPassword>
		</view>
		<mButton :value="value" class="mTop15" :type="type" @sureModify="sureModify"></mButton>
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
			new2:'确认密码',
			newTextValue:'输入旧密码',
			placeholder:'输入新密码',
			newPlaceholder:'再次输入密码',
			value:'确认修改',
			type:'primary',
			oldpws:'',
			newpws1:'',
			newpws2:''
			}
		},
		methods:{
		sureModify(){
			const that =this;
			if(this.oldpws !== '' && this.oldpws !== null){
				if(this.newpws1 !== '' && this.newpws1 !== null){
					if(this.newpws1 == this.newpws2 ){
						uni.request({
							url: that.$https +'user/updatePwd',
							method:"GET",
							data:{
								oldPwd :that.oldpws,
								newPwd:that.newpws2
							},
							success:function(res){
								console.log(res)
							}
						})
					}else{
						uni.showToast({
							title:"两次密码不一致",
							icon:"none"
						})
					}
				}else{
						uni.showToast({
							title:"请输入新密码",
							icon:"none"
						})
					}
			}else{
				uni.showToast({
					title:'请输入旧密码',
					icon:"none"
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
	
</style>
