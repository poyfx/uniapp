<template>
	<view class="mTop15  apply">
		<view class="apply_manycompany bgcf" v-for="(items,index) in role" :key="index">
			<view class="company_name flex">
				<text>{{items[0].customer_name}}</text>
			</view> 
			<view class="" v-for="item in items" :key="item.id">
				
				<view class="flex m-apply" @tap="GoBuyApply(item.role_status,item.name,index ,item.code,item.customer_id)">
					<text>{{item.name}}</text>
					<view class="flex never good" v-if="item.role_status == 1">
						<image src="../../../static/img/good.png" mode=""></image>
						<text>已拥有权限</text>
					</view>
					<view class="flex never" v-else>
						<text v-if="item.role_status == 0">未申请</text>
						<text v-else-if="item.role_status == 2">已过期，请重申</text>
						<text v-else-if="item.role_status == -1">已申请，审核中</text>
						<text v-else-if="item.role_status == 9">不通过，请重申</text>
						<image src="../../../static/img/right.png" class="" mode="aspectFit" alt></image>
					</view>

				</view>
			</view>
		</view>



		<!-- <view class="flex m-apply" @tap="GoBuyApply(item.role_status,item.name,index)" v-for="(item,index) in role" :key="item.id">
			<text>{{item.name}}</text>
			<view class="flex never good" v-if="item.role_status == 1">
				<image src="../../../static/img/good.png" mode=""></image>
				<text>已拥有权限</text>
			</view>
			<view class="flex never" v-else>
				<text v-if="item.role_status == 0">未申请</text>
				<text v-else-if="item.role_status == 2">已过期，请重申</text>
				<text v-else-if="item.role_status == -1">已申请，审核中</text>
				<text v-else-if="item.role_status == 9">不通过，请重申</text>
				<image src="../../../static/img/right.png" class="" mode="aspectFit" alt></image>
			</view>


		</view> -->
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
				company: [],
				statusAll: '',
				userCode: '',
				customer_id: '',
			}
		},
		onLoad(option) {

			this.userCode = option.userCode;
			this.customer_id = option.customer_id
			this.getJurisdiction()
		},
		methods: {
			getJurisdiction() {
				const that = this;
				var _url = 'http://192.168.0.156:9494/api/bizcust/'
				this.test.post('user/list_user_role', {
					customer_id: this.customer_id
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.company = res.data.value;
						this.company.map(el => {
							that.role.push(el)
						})
						console.log(this.role)
						// if (this.role.length == 2) {
						// 	console.log(1)
						// 	this.buy = true;
						// 	this.take = true;
						// } else if (this.role.length == 1) {
						// 	if (this.role[0].role_id == 1) {
						// 		console.log(2)
						// 		this.buy = true
						// 		this.take = false
						// 	} else if (this.role[0].role_id == 2) {
						// 		console.log(3)
						// 		this.take = true
						// 		this.buy = false
						// 	}
						// }
					} else if (res.data.errorCode == 10001 || res.data.errorCode == 10002 || res.data.errorCode == 10003) {
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
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none",
							position: 'bottom'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},



			GoBuyApply(stu, name, ind,code,customer_id) {
				if (stu == 0 || stu == 2 || stu == 9) {
					console.log(code)
					if (code == 1) {
						uni.navigateTo({
							url: './uploadImg/uploadImg?name=' + "apply" + '&user=' + name + '&userCode=' + code +'&customer_id='+customer_id
						})
					} else {
						uni.navigateTo({
							url: '../../register/uploadFace/uploadFace?name=' + "apply" + '&user=' + name + '&userCode=' + code+'&customer_id='+customer_id
						})
					}


				} else if (stu == 1) {
					uni.showToast({
						"title": "您已有权限",
						icon: 'none',
						position: 'bottom',
					})
				} else if (stu == -1) {
					uni.showToast({
						"title": "审核中...",
						icon: 'none',
						position: 'bottom',
					})
				} else {
					uni.showToast({
						"title": "审核未通过",
						icon: 'none',
						position: 'bottom',
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
	.apply_manycompany{
		margin-bottom: 10px;
	}
	.company_name{
		align-content: center;
		align-items: center;
		justify-content: center;
		padding: 12px 12px;
		border-bottom: 1px solid #E5E5E5;
	}
	.apply {
		width: 100%;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
	}

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
