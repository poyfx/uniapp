<template>
	<view class="m-input-view" >
		<text>{{textValue}}</text>
		<input :focus="focus_" :type="inputType" :value="value" @input="onInput" class="m-input" :placeholder="placeholder"
		 @focus="onFocus" @blur="onBlur" />
		 <image @tap="showname" v-if="show" src="../../static/img/nopwd.png" class='m-eye' alt ></image>
		 <image @tap="showname" v-if="!show" src="../../static/img/showpwd.png" class='m-eye' alt ></image>
		<!-- <img @click="showname" v-if="show" src="../../static/img/nopwd.png" class='m-eye' alt />
		<img @click="showname" v-if="!show" src="../../static/img/showpwd.png" class='m-eye' alt /> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show: true,
				inputType:'password',
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
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid #e5e5e5;
	}

	.m-input {
		width: 70%;
		padding: 11px 15px;
		border: none;
		outline: none;
	}

	.m-eye {
		width: 24px;
		height:24px;
		position: absolute;
		right: 5%;
		z-index: 333;
	}
	.m-input-view text{
		width: 93px;
		padding: 10px 10px 10px 0;
	}
</style>
