import Request from './request'
import {
	// successCode,
	tokenExpireCode
	// overtimeCode,
} from '@/test/index.js'
import {
	getNewTokenServe
} from '@/utils/api.js'

import {
	setTokenStorage,
	getTokenStorage,
	configHandle
} from '@/test/tool.js'

const test = new Request()
/**
 * jwt 无痛刷新token思路（如果不使用无痛刷新token,忽略此处注释）
 * 看了很多，有个问题一直得不到解决----‘多个接口请求，token失效，如何让获取token只获取一遍’、
 * 于是想到了闭包防抖......
 * 本方案并不是最佳方案，只是给你们提供一种思路。如果你有完美解决方案，可以分享一下
 */
const expireToken = [] // 储存过期的token

// 防抖闭包来一波
function getTokenDebounce() {
	let lock = false
	let success = false
	return async function() {
		if (!lock) {
			console.log(100)
			lock = true
			getNewTokenServe().then(res => {
				console.log('获取了新的token')
				console.log(res)
				console.log(101)
				if(res.data.errorCode == 0){
					setTokenStorage(res.data.value) // todo 储存token，可更换为自己的储存token逻
					success = true
				}
				lock = false
			}).catch(() => {
				success = false
				lock = false
			})
		}
		return new Promise(resolve => {
			// XXX 我只能想到通过轮询来看获取新的token是否结束，有好的方案可以说。一直看lock,直到请求失败或者成功
			const timer = setInterval(() => {
				if (!lock) {
					clearInterval(timer)
					if (success) {
						console.log("success")
						resolve('success')
					} else {
						console.log("fail")
						resolve('fail')
					}
				}
			}, 100) // 轮询时间可以自己看改成多少合适
		})
	}
}

test.setConfig((config) => { /* 设置全局配置 */
		//config.baseUrl = 'http://192.168.0.148:8080/api/bizcust/'
	config.baseUrl = 'http://dev.pjy.name:8170/api/bizcust/';//开发
	config.header = {
		...config.header,
		//'content-type': 'application/json;charset=UTF-8'
		'content-type': 'application/json;charset=UTF-8',
		"content-type": "multipart/form-data",
		"content-type": "application/x-www-form-urlencoded",
	}
	return config
})

test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	let token = '';
	try {
		let st = uni.getStorageSync('Token');
		if (st) {
			token = st
		}
	} catch (e) {
		console.log(e)
	}
	config.header = {
		...config.header,
		"Token": token
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
test.validateStatus = (statusCode) => {
	return statusCode === 200
}

test.interceptor.response((response) => { /* 请求之后拦截器 */
	console.log(response)
	if (response.data.errorCode !== 0) { // 服务端返回的状态码不等于200，则reject()
		console.log(102)
		return Promise.reject(response)
	}
	return response
}, (response) => { // 请求错误做点什么
	return response
})

// XXX 重新创建一个示例，可根据自身逻辑决定是否需要重新创建一个示例
const reReqest = new Request()
const refreshToken = getTokenDebounce()
reReqest.setConfig(config => {
	//config.baseUrl = 'http://192.168.0.148:8080/api/bizcust/' /* 根域名不同 */
		config.baseUrl = 'http://dev.pjy.name:8170/api/bizcust/';//开发
	return config
})

// 必须使用异步函数，注意
test.interceptor.response(async (response) => { /* 请求之后拦截器 */

	if (response.data.errorCode === tokenExpireCode) {
		console.log(response.config.header.Token)
		// jwt token 过期了
		expireToken.push(response.config.header.Token) // 把过期token 储存
		const currToken = getTokenStorage() // todo 获取token逻辑，可自定义
		if (expireToken.includes(currToken)) { // 本地储存的是过期token了，重新获取
			const getTokenResult = await refreshToken()
			console.log(getTokenResult)
			if (getTokenResult === 'success') { // 获取新的token成功
				console.log(response.config)
				const repeatRes = await reReqest.request(configHandle(response.config)) // XXX 可根据自身逻辑决定是否需要重新创建一个示例
				console.log('重新获取后的结果')
				console.log(repeatRes)
				if (repeatRes) {
					return response = repeatRes
				}
			}else{
				response.data.errorCode = -10002;
				response.data.message = '身份登录已过期,请重新登录'
			}
		} else {
			// 本地的是重新获取的token 直接使用就行了
			const repeatRes = await reReqest.request(configHandle(response.config))
			console.log('重新获取后的结果')
			console.log(repeatRes)
			if (repeatRes) {
				response = repeatRes
			}
		}
	}
	// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//   return Promise.reject(response)
	// }
	return response
}, (response) => { // 请求错误做点什么
	return response
})


const http = new Request()
// const refreshToken = getTokenDebounce()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest' /* 根域名不同 */
	config.header = {
		...config.header,
		a: 1,
		b: 2
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
		token: getTokenStorage()
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

// 必须使用异步函数，注意
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
	console.log(response)
	if (response.data.value === tokenExpireCode) {
		console.log(1)
		// jwt token 过期了
		expireToken.push(response.config.header.token) // 把过期token 储存
		const currToken = getTokenStorage() // todo 获取token逻辑，可自定义
		if (expireToken.includes(currToken)) { // 本地储存的是过期token了，重新获取
			const getTokenResult = await refreshToken()
			if (getTokenResult === 'success') { // 获取新的token成功
				const repeatRes = await reReqest.request(configHandle(response.config)) // XXX 可根据自身逻辑决定是否需要重新创建一个示例
				console.log('重新获取后的结果')
				console.log(repeatRes)
				if (repeatRes) {
					response = repeatRes
				}
			}
		} else {
			// 本地的是重新获取的token 直接使用就行了
			const repeatRes = await reReqest.request(configHandle(response.config))
			console.log('重新获取后的结果')
			console.log(repeatRes)
			if (repeatRes) {
				response = repeatRes
			}
		}
	}
	// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//   return Promise.reject(response)
	// }
	return response
}, (response) => { // 请求错误做点什么
	return response
})

export {
	http,
	test
}
