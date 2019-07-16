<template>
	<view >
		<text ref="one" class="stepNum" :class="actives" >{{value}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props:{
			value:String,
			actives:String,
		},
		methods: {
			
		}
	}
</script>

<style scope>
.stepNum{
	display: inline-block;
    width: 50px;
    height: 50px;
    font-size:12px; 
    margin: 14px 14px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: #CBCBCB;
}
 .step-active {
  background-color: #00a8ff;
}
.step-ago {
  background: #7eeab8;
}
.step-wait{
	background-color: #FD8E65;
}
</style>
