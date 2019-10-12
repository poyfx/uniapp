<template>
	<view class="">
		<view class="self_header_bar">
			<view class="top_view"></view>
		</view>
		<view class="title_content">
			<view class="flex title">
				<view style="font-size:40upx">首页</view>
				<view class="right" @tap="message">
					<image src="../../static/img/message.png" mode="aspectFit"></image>
					<text class="dot" v-show="dots">
						<!-- 消息红点 -->
					</text>
				</view>
			</view>
		</view>
		<view class="mContent">


			<!-- 轮播图 -->
			<banner :img="img"></banner>
			<!-- 导航 -->
			<navs :role='roles'></navs>
			<!-- 天气 -->
			<view class="sy-weather">
				<view class="weather-left">
					<view class="sy-times">
						<text>{{week}}</text>
						<text>{{dates}}</text>
					</view>
					<text class="temperature">{{temperature}}℃</text>
				</view>
				<view class="weather-right">
					<text class="r-weather">{{weather}}</text>
					<text class="r-city">{{city}}</text>
				</view>
			</view>
			<!-- 客户经理 -->
			<view class="main">


				<view class="myManager">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					 :circular="circular" indicator-active-color="#65C6F8">
						<swiper-item v-for="(item,index) in myManagerBox" :key="index">

							<text class="line"></text>
							<text class="title-p">我的客户经理</text>
							<view class="managerNum flex">
								<view class="call">
									<view class="manager">{{item.manager_name}}</view>
									<view class="">
										{{item.phone}}
									</view>
								</view>

								<view class=" ">
									<text class="numberBtn" @click="callPhone(item.phone,item.manager_name)">通话</text>
								</view>
							</view>


						</swiper-item>

					</swiper>
				</view>
			</view>



			<!-- 当前油价 -->
			<view class="oilPrices">
				<view class="flex index-title">
					<view class="">
						<text class="line"></text>
						<text class="title-p">当前油品批发价</text>
					</view>
					<text class="paddingRight15">{{date}}</text>
				</view>
				<view class="priceLi">
					<view class="flex titles">
						<text>油品名称</text>
						<text>价格(元/吨)</text>
						<text class="paddingRight19">涨跌幅</text>
					</view>
				</view>
				<view class="priceLi">
					<view class="nowPrice">
						<text class="oilName">0#柴油</text>
						<view class="oilPrice">
							<text :class="gain.diesel_0>0?s:j">{{datas.diesel_0}}</text>
						</view>

						<text class="paddingLeft10" :class="gain.diesel_0>0?s:j">{{gain.diesel_0}}%</text>
					</view>
				</view>
				<view class="priceLi">
					<view class="nowPrice">
						<text class="oilName">-10#柴油</text>
						<view class="oilPrice">
							<text :class="gain.diesel_10>0?s:j">{{datas.diesel_10}}</text>
						</view>

						<text class="paddingLeft10" :class="gain.diesel_10>0?s:j">{{gain.diesel_10}}%</text>
					</view>
				</view>
				<view class="priceLi">
					<view class="nowPrice">
						<text class="oilName">92#国六</text>
						<view class="oilPrice">
							<text :class="gain.gas_92>0?s:j">{{datas.gas_92}}</text>
						</view>

						<text class="paddingLeft10" :class="gain.gas_92>0?s:j">{{gain.gas_92}}%</text>
					</view>
				</view>
				<view class="priceLi">
					<view class="nowPrice">
						<text class="oilName">95#国六</text>
						<view class="oilPrice">
							<text :class="gain.gas_95>0?s:j">{{datas.gas_95}}</text>
						</view>

						<text class="paddingLeft10" :class="gain.gas_95>0?s:j">{{gain.gas_95}}%</text>
					</view>
				</view>
				<view class="priceLiNo">
					<view class="nowPrice">
						<text class="oilName">98#国六</text>
						<view class="oilPrice">
							<text :class="gain.gas_98>0?s:j">{{datas.gas_98}}</text>
						</view>
						<text class="paddingLeft10" :class="gain.gas_98>0?s:j">{{gain.gas_98}}%</text>
					</view>
				</view>
			</view>

			<!-- 地炼价格行情 -->
			<!-- <view class="oilPrices">
			<view class="flex index-title">
				<view class="">
					<text class="line"></text>
					<text class="title-p">地炼价格行情</text>
				</view>
				<text  class="paddingRight15">{{date}}</text>
			</view>
			<view class="priceLi">
				<view class="flex titles">
					<text>油品名称</text>
					<text>价格(元/吨)</text>
					<text class="paddingRight19">涨跌幅</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>0#柴油</text>
					<view class="">
						<text>{{datas.oilPrice.diesel_0}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>

			<view class="priceLiNo">
				<view class="nowPrice">
					<text>92#国六</text>
					<view class="">
						<text>{{datas.oilPrice.diesel_0}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
		</view>
 -->
			<!-- 国际原油价格 -->
			<!-- <view class="oilPrices">
			<view class="flex index-title">
				<view class="">
					<text class="line"></text>
					<text class="title-p">国际原油价格</text>
				</view>
				<text class="paddingRight15">{{date}}</text>
			</view>
			<view class="priceLi">
				<view class="flex titles">
					<text>油品名称</text>
					<text>价格(元/吨)</text>
					<text class="paddingRight19">涨跌幅</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>0#柴油</text>
					<view class="">
						<text>{{datas.oilPrize.diesel_0}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>

			<view class="priceLiNo">
				<view class="nowPrice">
					<text>92#国六</text>
					<view class="">
						<text>{{datas.oilPrice.diesel_0}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
		</view> -->

		</view>

		<view class="index_model" v-show="modelshow" @touchstart.self.prevent="closeModel()">
			<view class="model bgcf">
				<view class="close" @tap="closeModel()">
					<uni-icons type="closeempty" size="28" color="#000000"></uni-icons>
				</view>

				<view class="model_title">
					<text>对账函</text>
				</view>
				<view class="model_content">
					<text>你收到了一封新的<text style="color: #00A8FF;">对账函</text>信息，请前往查看并核实</text>
				</view>
				<view class="model_btn">
					<button @tap="setAccount()">查看</button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import banner from '../../components/banner/banner'
	import navs from '../../components/nav/nav'
	import {
		mapState,
		mapActions
	} from 'vuex'
	var $api = "http://192.168.0.156:8080/api/bizcust/";
	export default {
		data() {
			return {
				title: '',
				// managerTel: "",
				// myManager: '',
				datas: [], //油价
				gain: [],
				img: [],
				// role:'',
				address: '',
				city: '',
				district: '',
				adcode: '', //城市编码
				cityInfo: '', //城市信息
				weather: '', //天气
				dates: '', //日期  不含年份
				date: '', //日期
				week: '', //星期
				temperature: '', //温度
				s: 's', //油价颜色样式升
				j: 'j', //油价颜色样式降
				autoplay: false,
				indicatorDots: true,
				interval: 2000,
				duration: 500,
				circular: true,
				myManagerBox: {},
				modelshow: false,
				dots: false,
			}
		},
		onShow() {
			this.getlocation();

			this.getDate();
			console.log(this.hasLogin)
			this.getInfo();
			this.setLetter();
			this.setNotice();
			this.setDot();
		},
		methods: {
			
			// 获取首页信息
			getInfo() {
				const that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						// console.log(res)
						let price = res.data.oilPrice; //获取当前油价油价
						that.datas = price.oilPrice;
						that.gain = price.oilAmplitude;
						that.myManagerBox = res.data.managers;
						if (that.myManagerBox.length < 2) {
							that.indicatorDots = false
						} else {
							that.indicatorDots = true
						}
						// let managerInfo = res.data.user;
						// that.myManager = managerInfo.manager_name; //客户经理信息
						// that.managerTel = managerInfo.manager_phone;
						let images = res.data.banners; //banner图
						that.img = images;

					}
				})

			},
			//对账函及公告是否有未读消息
			setDot() {

				this.test.post('user/count_letter_notice').then(res => {
					console.log(res)
					if (res.data.value == 0) {
						this.dots = false
					} else {
						this.dots = true
					}

				}).catch(err => {
					console.log(err)
				})
			},
			//处理对账函
			setLetter() {
				// const that = this;
				this.test.post('user/get_letter').then(res => {
					console.log(res)
					if (res.statusCode && res.data.errorCode == 0) {
						if (res.data.valu == null || res.data.valu == '') {
							return
						} else {
							if (res.data.value.confirm_type == 0) {
								this.modelshow = true;
							}
						}

					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							position: 'bottom'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			setAccount() {
				uni.navigateTo({
					url: './letter/account/account'
				})
			},
			//关闭对账函
			closeModel() {
				this.modelshow = false;
				// console.log(event.target)
			},
			//处理公告
			setNotice() {
				this.test.post('user/list_notices').then(res => {
					console.log(res)
					if (res.statusCode && res.data.errorCode == 0) {
						if (res.data.valu == null || res.data.valu == '') {
							return
						} else {
							if (res.data.value.confirm_type == 0) {
								this.modelshow = true;
							}
						}

					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							position: 'bottom'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},

			// 打电话
			callPhone(phoneNumber, name) {
				uni.showModal({
					title: "呼叫客户经理-" + name,
					confirmText: '呼叫',
					content: phoneNumber,
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: phoneNumber
							})
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// 获取地址
			getlocation() {
				const that = this;
				uni.request({
					url: "https://restapi.amap.com/v3/ip?parameters",
					header: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					data: {
						key: 'b5066e0a9a2a996397e9172fc67fdf40',
					},
					success: res => {
						that.city = res.data.city;
						that.adcode = res.data.adcode;
						// that.getAdcode();
						that.getWeather();
					}
				})

				// 				uni.getLocation({
				// 					type: 'wgs84',
				// 					geocode: true,
				// 					success: function(res) {
				// 						console.log(res)
				// 						const longitude = res.longitude;
				// 						const latitude = res.latitude;
				// 						that.city = res.address.city;
				// 						that.address = res.address.city + res.address.district;
				// 						that.district = res.address.district;
				// 						that.getAdcode();
				// 					},
				// 
				// 				});
			},
			// getAdcode() {
			// 	const that = this
			// 	console.log(that.city)
			// 	uni.request({
			// 		//行政区域查询
			// 		url: 'https://restapi.amap.com/v3/config/district?parameters',
			// 		header: {
			// 			'Content-Type': 'application/json;charset=UTF-8'
			// 		},
			// 		data: {
			// 			key: 'b5066e0a9a2a996397e9172fc67fdf40',
			// 			keywords:that.city,
			// 			subdistrict: 1
			// 		},
			// 		methods: 'GET',
			// 		success: function(res) {
			// 			console.log(res)
			// 			res.data.districts.forEach(res => {
			// 				console.log(res)
			// 				that.cityInfo = res
			// 				console.log(that.cityInfo)
			// 			})
			// 			if (res.statusCode == 200 && res.data.status == 1) {
			// 				for (let i = 0; i < that.cityInfo.districts.length; i++) {
			// 					// if (that.district == that.cityInfo.districts[i].name) {
			// 					// 	that.adcode = that.cityInfo.districts[i].adcode
			// 					// 	that.district = 
			// 					// 	that.getWeather()
			// 					// }
			// 				}
			// 			}
			// 			
			// 		}
			// 	})
			// },
			getWeather() {
				const that = this;
				uni.request({
					url: 'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
					header: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					data: {
						key: 'b5066e0a9a2a996397e9172fc67fdf40',
						city: that.adcode,
						extensions: "base"
					},
					methods: 'GET',
					success: function(res) {
						res.data.lives.forEach(res => {
							that.temperature = res.temperature; //天气摄氏度
							that.weather = res.weather; //天气
						})
					}
				})
			},
			getDate() {
				const date = new Date()
				const weeks = date.getDay()
				const month = date.getMonth() + 1
				const year = date.getFullYear()
				const day = date.getDate()
				this.date = year + '-' + month + '-' + day
				this.dates = month + '月' + day + '日'

				switch (weeks) {
					case 0:
						return this.week = '星期天';
						break;
					case 1:
						return this.week = '星期一';
						break;
					case 2:
						return this.week = '星期二';
						break;
					case 3:
						return this.week = '星期三';
						break;
					case 4:
						return this.week = '星期四';
						break;
					case 5:
						return this.week = '星期五';
						break;
					case 6:
						return this.week = '星期六';
						break;
				};
			},
			//对账函
			message() {
				uni.navigateTo({
					url: './letter/letter'
				})
			},
		},
		computed: {
			...mapState(["hasLogin", "userInfo", "roles", 'Token'])
		},
		components: {
			banner,
			navs
		}
	}
</script>

<style>
	.nowPrice {
		display: flex;
		justify-content: space-between;

	}

	.nowPrice:first-child>text {
		width: 4rem;
	}

	.index-title {
		justify-content: space-between;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	/* 天气样式 */
	.sy-weather {
		width: 100%;
		display: flex;
		background: #fff;
		margin: 10px 0 10px 0;
		border-radius: 0.25rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
	}

	.weather-left {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.sy-times {
		display: flex;
		justify-content: center;
		padding: 9px 0 8px 0;
	}

	.sy-times text {
		font-size: 24upx;
		padding: 0 4px;
	}

	.temperature {
		font-size: 80upx;
		padding-bottom: 9px;
		font-weight: 100;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.weather-right {
		display: flex;
		width: 50%;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.weather-right text {
		font-size: 40upx;
	}

	.r-weather {
		padding-bottom: 10px;
	}

	.oilName,
	.oilPrice {
		flex: 1;
	}

	.swiper {
		height: 100px;
	}

	.title {
		width: 100%;
		height: 44px;
		padding: 7px 3px;
		box-sizing: border-box;
		/* background-color: black; */
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
		align-content: center;
		align-items: center;
		align-self: center;
		background-color: rgba(255, 255, 255, 1);
		justify-content: center;
		position: fixed;
		z-index: 998;
	}

	.title .right {
		width: 25px;
		height: 25px;
		margin-right: 5px;
		position: absolute;
		right: 10px;

	}

	.title .right image {
		width: 25px;
		height: 25px;
	}

	.title view {
		font-size: 16px;
	}

	.title view:last-child {
		font-size: 14px;
		position: absolute;
		right: 8px;
	}

	.dot {
		background-color: red;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		position: absolute;
		right: 0px;
		top: 2px;
	}

	.index_model {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.model {
		width: 300px;
		height: 178px;
		position: relative;
		top: 50%;
		margin: -89px auto 0;
		padding: 15px 20px 20px;
		z-index: 9999;
	}

	.model_title {
		text-align: center;
	}

	.model_title text {

		color: #424242;
		font-size: 1.1rem;
	}

	.model_content {
		width: 100%;
		margin: 15px 0 20px;
	}

	.model_btn {
		width: 100%;
		position: absolute;
		bottom: 15px;
		left: 0;
	}

	.model_btn button {
		width: 11em;
		background-color: #00A8FF;
		border-radius: 1.2rem;
		color: #fff;
	}

	.close {
		position: absolute;
		right: 6px;
		top: 5px;
	}
</style>
