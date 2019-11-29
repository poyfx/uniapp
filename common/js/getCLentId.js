export function getClentId() {
	document.addEventListener("plusready", function() {
			// 扩展API加载完毕，现在可以正常调用扩展API  
			// 获取客户端标识信息  
			var cid = plus.push.getClientInfo().clientid;
			var count = 0;
			var getcid = setInterval(function() {
				cid = plus.push.getClientInfo().clientid;
				if (cid != "" && cid != null && cid != "null") {
					console.log("cid=" + cid + "&count=" + count);
					clearInterval(getcid);
				}
				count++;
			}, 20)
		})
	}
