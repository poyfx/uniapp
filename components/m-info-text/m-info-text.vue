<template>
	<view>
		<view class="flex m-info" >
			<text >{{textValue}}</text>
			<input :type="type" :value="value" :placeholder="placeholder" :disabled="disabled"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			textValue:String,
			type:String,
			value:String,
			placeholder:String,
			disabled:Boolean
		},
		methods: {
			
		}
	}
</script>

<style>
.m-info {
		padding: 10px 15px 10px 0;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.m-info-content {
		justify-content: flex-start;
	}

	.m-info text {
		min-width: 70px;
		margin-right: 10px;
	}
.m-info input{
	flex: 1;
}

</style>
