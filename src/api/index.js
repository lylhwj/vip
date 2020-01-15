import config from './config.js';
let base = {
  BASEURL: process.env.APIURL
}
export default {
  /**
   * 帮助中心
   */
  getHelp(params) {
    return config.get(`${base.BASEURL}/help_center/doc/list`, params);
  },
  getHelpDetail(id) {
    return config.get(`${base.BASEURL}/help_center/doc/list/${id}`);
  },
  // 手机绑定
  bindphone(params){
    return config.post(`${base.BASEURL}/oauth2/callback/mobile/bind`,params);
  },
  bindphone2(params) {
    return config.post(`${base.BASEURL}/user/bindMobile`, params);
  },
  // 判断是否需要验证码
  isCaptcha(params) {
    return config.post(`${base.BASEURL}/auth/captcha/is_show`, params);
  },
  // 判断手机是否注册过
  isRegister(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/mobile/unique/check`, params, mConfig);
  },
  // 第三方登录
  qqLogin() {
    return config.post(`${base.BASEURL}/oauth2/redirect/qq`);
  },
  qqLoginIsSuccess(params, mConfig) {
    return config.post(`${base.BASEURL}/oauth2/check_oauth_status`, params, mConfig);
  },
  wxLogin() {
    return config.post(`${base.BASEURL}/oauth2/redirect/weixinweb`);
  },
  wxLoginIsSuccess(params, mConfig) {
    return config.post(`${base.BASEURL}/oauth2/check_oauth_status`, params, mConfig);
  },
  // 注册
  regGetCode(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/mobile/code`, params, mConfig);
  },
  register(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/register/mobile`, params, mConfig);
  },
  // 登录
  login(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/login`, params, mConfig);
  },
  phoneGetCode(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/mobile/code`, params, mConfig);
  },
  phoneLogin(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/login/quick`, params, mConfig);
  },
  // 退出登录
  logout() {
    return config.post(`${base.BASEURL}/auth/logout`);
  },
  // 支付
  wxPay(params, mConfig) {
    return config.post(`${base.BASEURL}/pay/createOrder/weixinPC`, params, mConfig);
  },
  alipay(params, mConfig) {
    return config.post(`${base.BASEURL}/pay/createOrder/alipayOldPC`, params, mConfig);
  },
  isPaySuccess(params, mConfig){
    return config.post(`${base.BASEURL}/pay/queryOrderStatus`, params, mConfig); 
  }
}
