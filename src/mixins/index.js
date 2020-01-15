export default {
  data() {
    // 表单验证规则
    let validatorEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'));
      } else if (value.length < 4 || !/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(value)) {
        callback(new Error('邮箱格式错误'));
      } else {
        this.GET({
          api: `/user.php?op=regcheck&action=email&key=${value}`,
          alertErr: 'no',
          success: (data) => {
            if (data.status !== 200) {
              callback(new Error(data.status));
            } else {
              callback();
            }
          }
        })
      }
    }
    let validatorPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'));
      } else if (!/^1[0-9]{10}$/.test(value)) {
        callback(new Error('手机格式错误'));
      } else {
        this.GET({
          api: `/user.php?op=regcheck&action=mobile&key=${value}`,
          alertErr: 'no',
          success: (data) => {
            if (data.status !== 200) {
              callback(new Error(data.status));
            } else {
              callback();
            }
          }
        })
      }
    }
    let validatorRequire = (rule, value, callback) => {
      let ruleMsg = '';
      switch (rule.field) {
        case 'phoneCode':
          ruleMsg = '请输入验证码';
          break;
        case 'oldPwd':
          ruleMsg = '请输入原密码';
          break;
        case 'newSecurityCode':
          ruleMsg = '请输入新安全码';
          break;
      }
      if (!value) {
        callback(new Error(ruleMsg));
      } else {
        callback();
      }
    }
    return {
      customRule: {
        email: [{
          validator: validatorEmail,
          trigger: 'blur'
        }],
        phone: [{
          validator: validatorPhone,
          trigger: 'blur'
        }],
        phoneCode: [{
          validator: validatorRequire,
          trigger: 'blur'
        }],
        oldPwd: [{
          validator: validatorRequire,
          trigger: 'blur'
        }],
        newSecurityCode: [{
          validator: validatorRequire,
          trigger: 'blur'
        }]
      },
      isNeedLogin: 1,
      countdown: 60,
      timeDownTimeOut: null
    }
  },
  computed: {
    // 用户信息
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    //未读信息
    unreadMessagesCount() {
      return this.$store.state.user.unreadMessagesCount;
    },
    //头像
    userAvatar() {
      return this.$store.state.user.userAvatar;
    }
  },
  methods: {
    //路由跳转
    jump(to) {
      if (this.$router) {
        this.$router.push(to);
      }
    },
    //ajax请求
    GET(config) {
      let api = config.api || '';
      let reqData = config.data || {};
      $.ajax({
        type: "GET",
        url: '//api.bianyue.cn' + config.api,
        data: reqData,
        dataType: "jsonp",
        success: (data) => {
          if (data.status == '请先登录') {

            this.$store.commit('changeUserInfo', {
              userInfo: {}
            });
            if(config.noLoginCallback){
             config.noLoginCallback();
            }
            let routePath = this.$router.currentRoute.path; 
            let routePathName = this.$router.currentRoute.name;   
            if (routePath == '/vip/index' || routePath == '/vip/point' || routePath == '/payPoint' || routePath == '/pay'|| routePath == '/aboutus'|| location.href.indexOf('aboutus') !== -1 ||routePathName=='AboutUs' || routePathName == 'AgreementCopyright'|| routePathName == 'AgreementLinkTask' || routePathName == 'agreementLinkTask'|| routePathName == 'AgreementPay' || routePathName == 'AgreementPrivacy' || routePathName == 'AgreementUser'|| routePathName == '/AgreementVip'||routePathName=='PageNotice1') {
              return false;
            }    
            layer.msg('请先登录', {
              icon: '7',
              time: 3000
            }, () => {
              location.href = 'http://yun.bianyue.cn/login/';
            })
          }if (data.status == 200 || config.alertErr === 'no') {
            config.success ? config.success(data) : null;
          } else if (data.status.indexOf('如非本人操作，请及时修改密码') !== -1) {
            layer.msg(data.status, {
              icon: 2,
              time: 2000
            }, () => {
              window.location.reload();
            });
          } else {
            layer.msg(data.status, {
              icon: 2
            });
          }
        },
        error: (data) => {
          layer.msg(data, {
            icon: 2
          });
          config.error ? config.error(data) : null;
        }
      })
    },
    // 获取用户信息
    getUser(config) {
      let callback = config.callback;  
      let noLoginCallback=config.noLoginCallback;
      this.GET({
        api: '/user.php?op=info&action=init', 
        success: (data) => { 
          let userInfo = data.data;
          let userAvatar = `//api.bianyue.cn/uploadfile/user_avatar/origin/${userInfo.userid}.jpg?t=${new Date().getTime()}`
          userInfo.qqbind = data.qqbind;
          userInfo.wxbind = data.wxbind;
          this.$store.commit('changeUserInfo', {
            userInfo
          });
          if (!this.$store.state.user.userAvatar) {
            this.$store.commit('changeUserInfo', {
              userAvatar
            });
          } 
          if (callback) {
            callback();
          }
        },
        noLoginCallback:noLoginCallback||null
      })
    },
    setStorage(key, value) {
      localStorage.setItem(key, value);
    },
    getStorage(key) {
      return localStorage.getItem(key);
    },
    removeStorage(key) {
      localStorage.removeItem(key);
    },
    timeDownReady() {
      this.countdown = 60;
      clearTimeout(this.timeDownTimeOut);
      this.timeDownTimeOut = null;
    },
    timeDown(callback, callback2) {
      if (this.countdown <= 0) {
        callback();
        this.countdown = 60;
        return;
      } else {
        callback2(this.countdown);
        this.countdown--;
      }
      this.timeDownTimeOut = setTimeout(() => {
        this.timeDown(callback, callback2);
      }, 1000)
    }
  },

}
