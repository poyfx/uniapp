<template>
	<view class="mTop15 bgcf">
		<view class="flex m-apply" @tap="GoBuyApply(item.status,item.name,index)" v-for="(item,index) in role" :key="item.id">
			<text>{{item.name}}</text>
			<view class="flex never good" v-if="item.status == 1">
				<image src="../../../static/img/good.png" mode=""></image>
				<text>审核通过</text>
			</view>
			<view class="flex never" v-else>
				<text v-if="item.status == 0">未申请</text>
				<text v-else-if="item.status == -1">等待后台审核</text>
				<text v-else-if="item.status == 9">审核不通过</text>
				<image src="../../../static/img/right.png" class="" mode="aspectFit" alt></image>
			</view>


		</view>

	</view>
</template>

<script>
	import infoText from '../../../components/m-info-text/m-info-text'
	export default {
		data() {
			return {
				buy: true,
				take: false,
				role: [],
				statusAll: '',
				userCode: ''
			}
		},
		onLoad(option) {
			this.getJurisdiction()
			this.userCode = option.userCode;

		},
		methods: {
			getJurisdiction() {
				this.test.post('user/query_user_role').then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.role = res.data.value;
						console.log(this.role)
						if (this.role.length == 2) {
							console.log(1)
							this.buy = true;
							this.take = true;
						} else if (this.role.length == 1) {
							if (this.role[0].role_id == 1) {
								console.log(2)
								this.buy = true
								this.take = false
							} else if (this.role[0].role_id == 2) {
								console.log(3)
								this.take = true
								this.buy = false
							}
						}
					} else if(res.data.errorCode == 10001 || res.data.errorCode == 10002 || res.data.errorCode == 10003){
						uni.showModal({
							title: '提示',
							content: res.data.message,
							success: function(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '../login/login'
									})
								} else {
									uni.reLaunch({
										url: '../login/login'
									})
								}
							}
						})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},



			GoBuyApply(stu, name, ind) {
				if (stu == 0) {
					uni.navigateTo({
						url: './uploadImg/uploadImg?name=' + "apply" + '&user=' + name + '&userCode=' + this.role[ind].code
					})
				} else if (stu == 1) {
					uni.showToast({
						"title": "您已有权限",
						icon: 'none'
					})
				} else if (stu == -1) {
					uni.showToast({
						"title": "审核中...",
						icon: 'none'
					})
				} else {
					uni.showToast({
						"title": "审核未通过",
						icon: 'none'
					})
				}
			},
		},
		components: {
			infoText
		}
	}
</script>

<style>
	.m-apply {
		padding: 12px 12px;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}



	.m-apply image {
		width: 12px;
		height: 12px;
		margin-left: 10px;
	}

	.m-apply .good image {
		width: 16px;
		height: 16px;
		margin-right: 4px;
	}

	.never {
		justify-content: flex-end;
		align-content: center;
		align-items: center;
		align-self: center;

	}
</style>
