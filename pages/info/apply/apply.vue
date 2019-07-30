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
				
			}
		},
		methods: {
			GoBuyApply() {
				if (this.buy !== true) {
					uni.navigateTo({
						url: '../../register/positive/positive'
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
						url: '../../register/positive/positive'
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
	.never{
		justify-content: flex-end;
		align-content: center;
		align-items: center;
		align-self: center;
		
	}
</style>
