<template>
	<view class="m-input-view">
		<!-- :focus="focus_" -->
		<input  :type="inputType" :value="value" @input="onInput" class="m-input" :placeholder="placeholder"
		 @focus="onFocus" @blur="onBlur" />
		<image src="../../static/img/nopwd.png" @tap="showname" class='m-eye' v-if="show" mode="aspectFit"></image>
		 <image src="../../static/img/showpwd.png" @tap="showname" class='m-eye' v-if="!show" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				inputType: 'password'
			}
		},
		props: {
			/**
			 * 输入类型
			 */
			type: String,
			/**
			 * 值
			 */
			value: String,
			/**
			 * 占位符
			 */
			placeholder: String,
			/**
			 * 是否显示清除按钮
			 */
			clearable: {
				type: [Boolean, String],
				default: false,
			}
		},
		methods: {
			clear() {
				this.$emit('input', '')
			},
			display() {
				this.showPassword = !this.showPassword
			},
			onFocus() {
				this.isFocus = true
			},
			onBlur() {
				this.$nextTick(() => {
					this.isFocus = false
				})
			},
			onInput(e) {
				this.$emit('input', e.target.value)
			},
			showname() {
				var me = this;
				if (this.show == false) {
					me.show = true;
					me.inputType = "password";
				} else {
					me.show = false;
					me.inputType = "text";
				}
			},

		},
		computed: {
			clearable_() {
				return String(this.clearable) !== 'false'
			},
			displayable_() {
				return String(this.displayable) !== 'false'
			},
			focus_() {
				return String(this.focus) !== 'false'
			}
		},
	}
</script>

<style scoped>
	.m-input-view {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.m-input {
		width: 70%;
		border: 1px solid #c3c3c3;
		padding: 10px 15px;
		border-radius: 0 0 4px 4px;
		font-size: 17px;
		line-height: 28px;
		outline: none;
	}

	.m-eye {
		width: 25px;
		height: 25px;
		position: absolute;
		right: 15%;
		z-index: 333;
		top: 50%;
		margin-top: -12px;
	}
</style>
