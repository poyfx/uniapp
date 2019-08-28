<template>
	<view>
		<view class="flex  m-info" @tap="go">
			<view class="flex center m-info-content">
				<text>{{imgText}}</text>
				<input :type="type" :placeholder="placeholder" :value="value"  class="infoText" :disabled="disabled" />
				<!-- <text>{{text}}</text> -->
				<image src="../../static/img/right.png" mode="aspectFit"></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			imgText: String,
			text: String,
			type: String,
			placeholder: String,
			disabled: Boolean,
			value: String,
		},
		methods: {
			go() {
				this.$emit("editInfo");
				this.$emit("toApply");
				this.$emit("editAddress");
				this.$emit("toEditPsd");
				this.$emit("goOrderNumber");
				this.$emit("getTime");
				this.$emit("toStayOil");
				this.$emit("oilByCompany");
				this.$emit("chooseUser");
				this.$emit("chooseCustomer");
			}
		}
	}
</script>

<style>
	.m-info {
		padding: 12px 0;
		border-bottom: 1px solid #E5E5E5;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
	}

	.m-info-content {
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		align-self: center;
		flex: 1;
	}

	.m-info-content text {
		width: 80px;
	}

	.m-info-content .infoText {
		color: #666;
		flex: 1;
	}

	.m-info-text {
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.m-info image {
		width: 12px;
		height: 12px;
		padding-right: 15px;
		margin-left: 10px;
	}
</style>
