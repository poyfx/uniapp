<template>
	<view>
		<text>clientid:{{clientid}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clientid:''
			}
		},
		onLoad() {
			this.getClientIdd()
		},
		methods: {
			getClientIdd(){
				const that = this;
				uni.getStorage({
					key:'clientid',
					success:function(res){
						console.log(res.data)
						that.clientid = res.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
