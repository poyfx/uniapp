<template>
	<view>
		<view class="home mTop15">
			<view class="fget-num">
				<mt-field label="手机号" placeholder="请填写手机号" type="tel" v-model="newphone"></mt-field>
			</view>
			<view class="nextBox">
				<mt-button type="primary" size="large" class="btn" @click.native="goUrl">保存</mt-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newphone: ''
			}
		},
		methods: {
			goUrl() {
				uni.switchTab({
					url:'../info?phone='+this.newphone,
					})
			}
		},
		onLoad(option) {
			this.newphone = JSON.parse(option.phone)
		console.log(JSON.parse(option.phone))	
		}
	}
</script>

<style>

</style>
