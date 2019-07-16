<template>
	<view >
		<button :type="type" :disabled="disabled" @tap="go">{{content}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			type:String,
			content:String,
			disabled:Boolean
		},
		methods: {
			go(){
				this.$emit("lastStep");
				this.$emit("nextStep");
				this.$emit("threeStepLast");
				this.$emit("sureBuy")
			},
		}
	}
</script>

<style>

</style>
