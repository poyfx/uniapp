<template>
	<view class="home" style="position: absolute;width: 100%; height: 100%;">
		<view class="oilCode">
			<view class="oilCodeBox">
				<img src="../../../../static/img/code.png" alt />
			</view>
		</view>
		<view class="mContent bgcf otherOilCode ">
			<view>提油码发送他人代提</view>
			<input type="text" class="oilCodeInput" value="" />
			<view class="read ;">
				<label class="radio">
					<radio value="已阅读" :checked='checked' @tap="cancel" />
				</label>
				<!-- <input type="checkbox" class="check" value="已阅读" @click="check" :checked="checked" /> -->
				<text>已阅读</text>

				<text style="color: #009DFF; ;">免责条款</text>
			</view>

			<view class="nextBox">
				<button class="oilCodeBtn oilCodeBtnAll" v-show="checkes">发送</button>
				<button type="primary" class="oilCodeBtnAll" v-show="!checkes">发送</button>

			</view>
		</view>
	</view>
</template>

<script>
	import mButton from '../../../../components/m-button.vue'
	export default {
		data() {
			return {
				value: false,
				options: [{
					value: 1,
					label: "我同意"
				}],
				checkes: true,
				checked: false
			}
		},
		methods: {
			cancel() {
				this.checked = !this.checked;
				this.checkes = !this.checkes
			},
			send() {
				if (this.checkes == true) {
					// Toast("请阅读免责条款,勾选后方可发送");
					uni.showToast({
						title: "请阅读免责条款,勾选后方可发送",
						"icon": "none"
					})
				}
				if (this.checkes == false) {
					// Toast("发送成功");
					uni.showToast({
						title: '发送成功'
					})
				}
			}
		},
		components: {
			mButton
		},
	}
</script>

<style>
	.oilCode {
		width: 100%;
		display: flex;
		padding: 20px;
		justify-content: center;
		border-radius: 4px;
	}

	.oilCodeBox {
		width: 275px;
		height: 275px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.oilCodeBox>img {
		width: 245px;
		height: 245px;
	}

	.mint-cell-wrapper {
		border: 1px solid #e5e5e5;
	}

	.otherOilCode {
		border-radius: 8px 8px 0 0;
		height: 49.5%;
	}

	.otherOilCode .mint-cell {
		margin: 15px 0 10px 0;
	}

	.otherOilCode .check {
		width: 15px;
		height: 15px;
		margin: 0 10px;
		-webkit-appearance: radio;
		appearance: radio;
		vertical-align: middle;
		background: #26a2ff;
	}

	.otherOilCode span,
		{
		font-size: 12px;
	}

	.otherOilCode span {
		color: #666;
	}

	.oilCodeInput {
		border: 1px solid #e5e5e5;
		width: 90%;
		margin: 15px auto;
		padding: 11px 15px 12px;
		border-radius: 4px;
	}

	.oilCodeBtn {
		background: rgba(0, 0, 0, 0.2);
		color: #fff;
	}
	.oilCodeBtnAll{
		width: 95%;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
	}
	.read{
		padding-left: 18px;
	}
	.read text{
		font-size: 12px;
	}
</style>
