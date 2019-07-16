<template>
	<button  class="m-btn" :type="type" :size="size" :disabled="disabled" @tap="go">{{value}}</button>
</template>

<script>
	export default {

		data() {
			return {
			}
		},
		props: {
			type: String,
			size: String,
			disabled: Boolean,
			value:String,
			
		},
		methods:{
			go(){
				this.$emit('goNext');
				this.$emit('goPositive');
				this.$emit("oneSide");
				this.$emit("handleLogin");
				this.$emit("nextTep");
				this.$emit("toBuy")
				this.$emit("sureModify")
			}
		}
	}
</script>

<style>
	.m-btn{
		width: 78%;
	}
</style>
