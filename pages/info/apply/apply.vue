<template>
	<view class="mTop15 bgcf">
		<view class="flex m-apply" @tap="GoBuyApply">
			<text>购油人权限</text>
			<view class="flex never" v-show="!buy">
				<text>未申请</text>
				<image src="../../../static/img/right.png" class="" mode="aspectFit" alt></image>
			</view>

			<view class="flex never" v-show="buy">
				<label class="radio">
					<radio value="r1" :checked="buy" />
				</label>
				<text>已拥有权限</text>
			</view>
		</view>
		<view class="flex m-apply" @tap="GoTakeApply">
			<text>提油人权限</text>
			<view class="flex never" v-show="!take">
				<text>未申请</text>
				<image src="../../../static/img/right.png" class="" mode="aspectFit" alt></image>
			</view>

			<view class="flex never" v-show="take">
				<label class="radio">
					<radio value="r1" :checked="take" />
				</label>
				<text>已拥有权限</text>
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
			}
		},
		onLoad() {
			this.getJurisdiction()

		},
		methods: {
			getJurisdiction() {
				this.test.post('user/query_user_role').then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.role = res.data.value;
						if (this.role.length == 2) {
							console.log(1)
							this.buy = true;
							this.take = true;
						} else if (this.role.length == 1) {
							if (this.role[0].role_id == 1) {
								console.log(2)
								this.buy = true
								this.take = false
							} else if (this.role[0].role_id == 2){
								console.log(3)
								this.take = true
								this.buy = false
							}
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},



			GoBuyApply() {
				if (this.buy !== true) {
					uni.navigateTo({
						url: '../../register/positive/positive1?name=' + "apply"
					})
				} else {
					uni.showToast({
						"title": "您已有权限",

					})
				}
			},
			GoTakeApply() {
				if (this.take !== true) {
					uni.navigateTo({
						url: '../../register/positive/positive2?name=' + "apply"
					})
				} else {
					uni.showToast({
						"title": "您已有权限",

					})
				}
			}
		},
		components: {
			infoText
		}
	}
</script>

<style>
	.m-apply {
		padding: 10px 10px;
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

	.never {
		justify-content: flex-end;
		align-content: center;
		align-items: center;
		align-self: center;

	}
</style>
