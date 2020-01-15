var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
  if (location.href.indexOf('aboutus') !== -1 || location.href.indexOf('aboutUs') !== -1 || location.href.indexOf('Agreementuser') !== -1 || location.href.indexOf('AgreementPrivacy') !== -1 || location.href.indexOf('agreementLinkTask') !== -1) {

  } else {
    window.location.href = "http://yun.bianyue.cn/myapp";
  }
}
