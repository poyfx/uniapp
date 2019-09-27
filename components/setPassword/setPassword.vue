<template>
	<view class="m-input-view" >
		<text>{{textValue}}</text>
		<!-- :focus="focus_" -->
		<input  :type="inputType" :value="value" @input="onInput" class="m-input" :placeholder="placeholder"
		 @focus="onFocus" @blur="onBlur" />
		 <image @tap="showname" v-if="show" :src="noSrc" class='m-eye' alt mode="aspectFit" ></image>
		 <image @tap="showname" v-if="!show" :src="showSrc" class='m-eye' alt  mode="aspectFit"></image>
	</view>
</template>
<script>
	import no from '../../static/img/nopwd.png'
	import show from '../../static/img/showpwd.png'
	export default {
		data() {
			return {
				show: true,
				inputType:'password',
				noSrc:no,
				showSrc:show
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
			},
			textValue:String,
		},
		methods: {
			clear() {
				this.$emit('input', '')
			},
			display() {
				this.showPassword = !this.showPassword
			},
			onFocus() {
				this.isFocus = false
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
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e5e5e5;
	}

	.m-input {
		width: 100%;
		padding: 11px 15px 11px 0;
		border: none;
		outline: none;
			flex: 1;
	}

	.m-eye {
		width: 24px;
		height:24px;
		position: absolute;
		right: 5%;
		z-index: 333;
	}
	.m-input-view text{
		width: 4rem;
	
		box-sizing: border-box;
		/* padding: 10px 10px 10px 0; */
	}
</style>
