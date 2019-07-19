<template>
	<view class="m-input-view">
		<input :focus="focus_" type="type" :value="value" @input="onInput" class="m-input" :placeholder="placeholder"
		 @focus="onFocus" @blur="onBlur" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				// console.log(e.target.value)
			}
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
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.m-input {
		width: 70%;
		border: 1px solid #e5e5e5;
		padding: 11px 15px;
		border-radius:4px 4px 0 0 ;
		font-size: 17px;
		border-bottom: none;
	}
</style>
