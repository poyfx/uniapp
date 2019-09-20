<template>
	<view class="mContent">
		<!-- 轮播图 -->
		<banner :img="img" ></banner>
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
				<text class="line"></text>
				<text class="title-p">我的客户经理</text>
				<view class="managerNum flex">
					<view class="call">
						<view class="manager">{{myManager}}</view>
						<view class="">
							{{managerTel}}
						</view>
					</view>

					<view class=" ">
						<text class="numberBtn" @click="callPhone(managerTel)">通话</text>
					</view>
				</view>
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
				<view class="nowPrice" >
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
					<view  class="oilPrice">
						<text :class="gain.diesel_10>0?s:j">{{datas.diesel_10}}</text>
					</view>

					<text class="paddingLeft10" :class="gain.diesel_10>0?s:j">{{gain.diesel_10}}%</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text  class="oilName">92#国六</text>
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
</template>

<script>
	import banner from '../../components/banner/banner'
	import navs from '../../components/nav/nav'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				title: '',
				managerTel: "",
				myManager: '',
				datas: [],//油价
				 gain:[],
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
				s:'s',
				j:'j'
			}
		},
		onShow() {
			this.getlocation();
			
			this.getDate();
			console.log(this.hasLogin)
			this.getInfo();
		},
		onLoad() {
			
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
						let managerInfo = res.data.user;
						that.myManager = managerInfo.manager_name; //客户经理信息
						that.managerTel = managerInfo.manager_phone;
						let images = res.data.banners; //banner图
						that.img = images;
						
					}
				})

			},
			// 打电话
			callPhone(phoneNumber) {
				uni.showModal({
					title: "呼叫客户经理-" + this.myManager,
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
					url:"https://restapi.amap.com/v3/ip?parameters",
					header: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					data:{
						key: 'b5066e0a9a2a996397e9172fc67fdf40',
					},
					success:res=>{
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
							that.temperature = res.temperature;//天气摄氏度
							that.weather = res.weather;//天气
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
			}
		},
		computed: {
			...mapState(["hasLogin", "userInfo","roles",'Token'])
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
	.nowPrice:first-child>text{
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
		border-radius: 8px;
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
		text-shadow: 0 1px 2px rgba(0,0,0,0.3);
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
	.oilName,.oilPrice{
		flex: 1;
	}
</style>
