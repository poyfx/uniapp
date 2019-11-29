import Request from './request'
const test = new Request();
test.setConfig((config) => { /* 设置全局配置 */
	let token = '';
	try {
		let st = uni.getStorageSync('Token');
		if (st) {
			token = st
		}
	} catch (e) {
		console.log(e)
	}
	config.baseUrl = 'http://192.168.0.148:8080/api/bizcust/' //本地测试
	//	config.baseUrl = 'http://dev.pjy.name:8170/api/bizcust/';//开发
	config.header = {
		...config.header,
		// 'Content-Type': 'application/json;charset=UTF-8',
		// "Content-Type": "multipart/form-data",
		// "Content-Type": "application/x-www-form-urlencoded",
		'content-type': 'application/json;charset=UTF-8'
		"Token": token
	}
	return config
})

test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	// console.log(1)
	// console.log(config.header)

	console.log(config, cancel);
	let token = '';
	try {
		let st = uni.getStorageSync('Token');
		// console.log(st)
		if (st) {

			return token = st
		}
	} catch (e) {
		console.log(e)
	}
	config.header = {
		...config.header,
		"Token": token


	}

	// if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	// 	cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	// }

	return config;
})
test.interceptor.response((response) => { /* 请求之后拦截器 */
	let tokenr = uni.getStorageSync('TokenR');

	console.log(response);
	if (response.data.errorCode == -10000) {

		test.post('base/refreshToken', {
			refresh_token: tokenr
		}).then(res => {
			if (res.statusCode == 200 && res.data.errorCode == 0) {
				uni.setStorage({
					key: 'Token',
					data: res.data.value
				})
			}
			console.log(res)

		}).catch(err => {
			console.log(err)
		})
	} else {
		return response;
	}

	// return response;
})

const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	//config.baseUrl = 'http://dev.pjy.name:8170/api/bizcust/'; /* 根域名不同 */
	config.baseUrl = 'http://192.168.0.148:8080/api/bizcust/' //本地测试
	config.header = {
		// 'Content-Type': 'application/json;charset=UTF-8',
		// "Content-Type": "application/x-www-form-urlencoded",
		//"Content-Type": "multipart/form-data",
		...config.header,
	}
	return config
})
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
	}

	// if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	// 	cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	// }

	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	console.log(response);
	return response;
})
export {
	http,
	test
};
