<template>
	<view >
		<titles :titles="titles"></titles>
		<view class="bgcf exemption">
			<view class="exemption_title">
				用户信息丢失、泄露免责声明：
			</view>
			<view class="exemption_content flex">
				<view class="flex">
					1、<text>用户自行承担注册账号及密码的保管责任，并就其账号及密码项下之一切活动负全部责任。</text>
				</view>
				<view class="flex">
					2、<text>用户应注意网络安全防护，定期更改密码、设置密码安全保护问题，防止账号密码泄露，保证个人信息安全。</text>
				</view>
				<view class="flex">
					3、<text>因用户账户丢失、泄露或提油码发送他人后给用户造成的损失，本平台不承担任何责任。</text>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titles:'免责条款',
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.exemption{
	width: 100%;
	position: absolute;
	margin-top:44px;
	top: 0;
	bottom: 0;
}
.exemption_title{
	padding: 20px 15px;
	font-size: 19px;
	color: #333;
}
.exemption_content{
	width: 100%;
	padding: 0 21px;
	flex-direction: column;
	color: #333;
}
.exemption_content>view{
	margin: 10px auto;
}
</style>
