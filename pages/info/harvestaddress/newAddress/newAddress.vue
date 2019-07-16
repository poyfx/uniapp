<template>
	<view>
		<div class="content">
			<div class="fget-num">
				<mt-field label="收货人" placeholder="收货人姓名" type="text"></mt-field>
				<mt-field label="手机号" placeholder="输入手机号" type="tel"></mt-field>
				<mt-field label="城市" placeholder="请选择" type="text"></mt-field>
				<div class="fget-eara">
					<p class="first-li">详细地址</p>
					<p class="secend-in">
						<textarea type="text" cols="38" rows="3" autofocus placeholder="填写详细地址"></textarea>
						<b></b>
					</p>
				</div>

			</div>
			<div class="nextBox">
				<mt-button class="btn" type="primary" size="large">保存</mt-button>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
