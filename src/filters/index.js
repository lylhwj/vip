export function timeStamp(time, type) {
  var date = new Date(time);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  if (type == 1) {
    return y + '年' + m + '月' + d + '日';
  }else if(type == 2) {
    return y + '-' + m + '-' + d;
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
