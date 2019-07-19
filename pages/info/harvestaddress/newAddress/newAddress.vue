<template>
	<view>
		<view class="content">
			<view class="fget-num paddingLeft15">
				<infoText  :placeholder="info.nameP" :textValue="info.name"></infoText>
				<infoText  :placeholder="info.phoneNumP" :textValue="info.phoneNum"></infoText>
				<infoText  :placeholder="info.zipP" :textValue="info.zip"></infoText>
				<view class="fget-eara">
					<view class="first-li">详细地址</view>
					<view class="secend-in">
						<textarea type="text" cols="38" rows="3" auto-height  placeholder="填写详细地址"></textarea>
						<b></b>
					</view>
				</view>

			</view>
			<view class="nextBox">
				<mButton :value="btn.value" :type="btn.type"></mButton>
				<!-- <mt-button class="btn" type="primary" size="large">保存</mt-button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import infoText from '../../../../components/m-info-text/m-info-text'
	import mButton from '../../../../components/m-button.vue'
	export default {
		data() {
			return {
				info:{
					name:'收货人',
					nameP:'收货人姓名',
					phoneNum:'手机号',
					phoneNumP:'输入手机号',
					zip:'邮政编码',
					zipP:'输入邮政编码'
					
				},
				btn:{
					value:'保存',
					type:'primary'
				},
			}
		},
		methods: {

		},
		components: {
			infoText,
			mButton
		},
	}
</script>

<style>

</style>
