export function formatDate (secs) {
    var t = new Date(secs)
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    if (month < 10) { month = '0' + month }
    var date = t.getDate()
    if (date < 10) { date = '0' + date }
    var hour = t.getHours()
    if (hour < 10) { hour = '0' + hour }
    var minute = t.getMinutes()
    if (minute < 10) { minute = '0' + minute }
    var second = t.getSeconds()
    if (second < 10) { second = '0' + second }
    return year + '-' + month + '-' + date
}
// 年月日时分
export function formatDateMin (secs) {
    var t = new Date(secs)
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    if (month < 10) { month = '0' + month }
    var date = t.getDate()
    if (date < 10) { date = '0' + date }
    var hour = t.getHours()
    if (hour < 10) { hour = '0' + hour }
    var minute = t.getMinutes()
    if (minute < 10) { minute = '0' + minute }
    var second = t.getSeconds()
    if (second < 10) { second = '0' + second }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute 
}

export function formatSeconds(time){
	var middle,hour,second,result;
	result = [];
	hour = 0;
	middle = 0;
	second = 0
	if(time > 0){
		hour = Math.floor(time/(60*60));
		middle = Math.floor(time / 60) - (hour*60);
		second = Math.floor(time) - (hour*60*60) - (middle*60);
	}
	if(hour <= 9) hour = '0' +hour;
	if(middle<=9) middle = "0" + middle;
	if(second<=9) second = "0"  + second;
	
	
	result = hour + ':' + middle + ":" +second
	
	
	return result;
}