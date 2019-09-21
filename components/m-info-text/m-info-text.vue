<template>
	<view>
		<view class="flex m-info" >
			<text >{{textValue}}</text>
			<input :type="type" :value="value" :placeholder="placeholder" @input="onInput" :disabled="disabled"/>
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
			disabled:Boolean,
		},
		methods: {
			onInput(e) {
				this.$emit('input', e.target.value)
				  // console.log(e.target.value)
			}
		}
	}
</script>

<style>
.m-info {
		padding: 12px 15px 12px 0;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.m-info-content {
		justify-content: flex-start;
	}

	.m-info text {
		width: 5rem;
		/* min-width: 70px;
		margin-right: 10px; */
	}
.m-info input{
	flex: 1;
	color: #616161;
}

</style>
