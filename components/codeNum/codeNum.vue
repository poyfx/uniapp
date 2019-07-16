<template>
	<view class="f-get-code-num">
		<text class="f-get-code-numtitle">验证码</text>
		<input type="text" placeholder="请输入验证码" :value="value" class="getCodeInput" />
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			value: String
		},
		methods: {

		}
	}
</script>

<style>
	.f-get-code-num{
		display: flex;
		align-content: center;
		align-items: center;
		align-self: center;
		background-color: #fff;
		border-bottom: 1px solid #e5e5e5;
		padding: 15px 0;
	}

	.f-get-code-numtitle {
		padding: 0 10px;
	}

	.getCodeInput {
		flex: 1;
		margin-left: 18upx;
	}
	
</style>
