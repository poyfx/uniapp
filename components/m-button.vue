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
				this.$emit("toBuy");
				this.$emit("sureModify");
				this.$emit("search");
				this.$emit("tell");
			}
		}
	}
</script>

<style>
	.m-btn{
		width: 78%;
		box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
	}
</style>
