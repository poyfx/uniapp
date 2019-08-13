<template>
	<view >
		<button class="m-btn" :type="type" :disabled="disabled" @tap="go">{{content}}</button>
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
				this.$emit("threeStepNext");
				this.$emit('fourStepLast');
				this.$emit('fourStepNext');
				this.$emit("sureBuy");
				this.$emit("invoiceSure");
				this.$emit("tell")
			},
		}
	}
</script>

<style>
.m-btn{
	background: #00A8FF;
}
</style>
