<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <Left page="setting"></Left>
      <div class="view_box1">
        <div class="view_box2">
          <div class="main_top with_btmline">
            <div class="left_mtop">
              <div class="fl nav_sup">
                <a class="hover">安全设置</a>
              </div>
            </div>
          </div>
          <div class="view_scorll">
            <div class="wrap_accnout">
              <div class="safe_list">
                <ul>
                  <li>
                    <div class="box">
                      <i class="icon_safe isf_login"></i>
                      <div class="title">
                        <strong>登录密码</strong>
                        <!-- <i class="txt_status">(弱密码)</i> -->
                      </div>
                      <p class="desc">请设置8位以上数字及字母组合的密码,并定期更换</p>
                      <div class="side">
                        <a href="javascript:;" class="button btn_stroke" @click="goPwdModify">修改</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="box">
                      <i class="icon_safe isf_safe"></i>
                      <div class="title">
                        <strong>安全码</strong>
                      </div>
                      <p class="desc">设置安全码可用于密码找回（首次设置旧安全码留空）</p>
                      <div class="side">
                        <a href="javascript:;" class="button btn_stroke" @click="goSecurityCode">设置</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="box">
                      <i class="icon_safe isf_phone"></i>
                      <div class="title">
                        <strong>手机绑定</strong>
                        <i class="txt_status" v-if="userInfo.mobilecheck==1">已绑定手机：
                          <b>{{userInfo.mobile}}</b>
                        </i>
                      </div>
                      <p class="desc">绑定手机后可以用于登录边乐云账号、重置密码或其它安全验证等</p>
                      <div class="side">
                        <a href="javascript:;" class="button btn_stroke" v-if="userInfo.mobilecheck==1" @click="goUnbindPhone">解绑</a>
                        <a href="javascript:;" class="button btn_stroke" v-else @click="goBindPhone">绑定</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="box">
                      <i class="icon_safe isf_email"></i>
                      <div class="title">
                        <strong>邮箱</strong>
                        <i class="txt_status" v-if="userInfo.email">已绑定邮箱：
                          <b>{{userInfo.email}}</b>
                        </i>
                      </div>
                      <p class="desc">绑定邮箱后可以用于登录边乐云账号、重置密码或其它安全验证等</p>
                      <div class="side">
                        <a href="javascript:;" class="button btn_stroke" v-if="userInfo.email" @click="goUnbindEmail">解绑</a>
                        <a href="javascript:;" class="button btn_stroke" v-else @click="goBindEmail">绑定</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="box">
                      <i class="icon_safe isf_weixin"></i>
                      <div class="title">
                        <strong>微信</strong>
                      </div>
                      <p class="desc">绑定微信后可以用于登录边乐云账号、重置密码或其它安全验证等</p>
                      <div class="side"> 
                        <a href="javascript:;" class="button btn_stroke" v-if="userInfo.wxbind" @click="goUnbindWx">解绑</a>
                        <a href="//api.bianyue.cn/weixinlogin.php?op=login&action=init&from=//vip.bianyue.cn/setting/" target="_blank" class="button btn_stroke" v-else>绑定</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="box">
                      <i class="icon_safe isf_qq"></i>
                      <div class="title">
                        <strong>QQ</strong>
                      </div>
                      <p class="desc">绑定QQ后可以用于登录边乐云账号、重置密码或其它安全验证等</p>
                      <div class="side">
                        <a href="javascript:;" class="button btn_stroke" v-if="userInfo.qqbind" @click="goUnbindQQ">解绑</a>
                        <a href="//api.bianyue.cn/qqlogin.php?op=index&from=//vip.bianyue.cn/setting" target="_blank" class="button btn_stroke" v-else>绑定</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 帐号安全 -->
          </div>
          <!-- 滚动部分 -->
        </div>
      </div>
    </div>
    <div id="JS_pwd_alert" class="disn">
      <ModifyPwd v-if="isAlert" @success="success"></ModifyPwd>
      <div style="height:305px;" v-else></div>
    </div>
    <div id="JS_security_code_alert" class="disn">
      <SecurityCode v-if="isAlert" @success="success"></SecurityCode>
      <div style="height:208px;" v-else></div>
    </div>
    <div id="JS_phone_alert" class="disn">
      <BindPhone v-if="isAlert" @success="success"></BindPhone>
      <div style="height:209px;" v-else></div>
    </div>
    <div id="JS_unbind_phone_alert" class="disn">
      <UnbindPhone v-if="isAlert" @success="success" :phone="userInfo.mobile"></UnbindPhone>
      <div style="height:209px;" v-else></div>
    </div>
    <div id="JS_bind_email" class="disn">
      <BindEmail v-if="isAlert" @success="success"></BindEmail>
      <div style="height:174px;" v-else></div>
    </div>
    <div id="JS_unbind_email" class="disn">
      <UnbindEmail v-if="isAlert" @success="success" :email="userInfo.email"></UnbindEmail>
      <div style="height:174px;" v-else></div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Left from '@/components/Left.vue';
  import ModifyPwd from '@/components/ModifyPwd.vue';
  import BindPhone from '@/components/BindPhone.vue';
  import UnbindPhone from '@/components/UnbindPhone.vue';
  import SecurityCode from '@/components/SecurityCode.vue';
  import BindEmail from '@/components/BindEmail.vue';
  import UnbindEmail from '@/components/UnbindEmail.vue';
  export default {
    name: 'Setting',
    data() {
      return {
        isAlert: false 
      }
    },
    components: {
      Header: Header,
      Left: Left,
      ModifyPwd: ModifyPwd,
      BindPhone: BindPhone,
      UnbindPhone: UnbindPhone,
      SecurityCode: SecurityCode,
      BindEmail: BindEmail,
      UnbindEmail: UnbindEmail,
    },
    methods: {
      // 密码修改
      goPwdModify() {
        this.isAlert = true;
        layer.open({
          type: 1,
          anim:2,
          title: '密码修改',
          area: ['450px', ''], //宽高
          content: $("#JS_pwd_alert"),
          cancel: () => {
            this.isAlert = false;
          }
        })
      },
      // 绑定手机号
      goBindPhone() {
        this.isAlert = true;
        layer.open({
          type: 1,
          anim:2,
          title: '手机绑定',
          area: ['450px', ''], //宽高
          content: $("#JS_phone_alert"),
          cancel: () => {
            this.isAlert = false;
          }
        })
      },
      // 解绑手机号
      goUnbindPhone() {
        this.isAlert = true;
        layer.open({
          type: 1,
          anim:2,
          title: '手机解绑',
          area: ['450px', ''], //宽高
          content: $("#JS_unbind_phone_alert"),
          cancel: () => {
            this.isAlert = false;
          }
        })
      },
      // 设置安全码
      goSecurityCode() {
        this.isAlert = true;
        layer.open({
          type: 1,
          anim:2,
          title: '设置安全码',
          area: ['450px', ''], //宽高
          content: $("#JS_security_code_alert"),
          cancel: () => {
            this.isAlert = false;
          }
        })
      },
      // 邮箱绑定
      goBindEmail() {
        this.isAlert = true;
        layer.open({
          type: 1,
          anim:2,
          title: '邮箱绑定',
          area: ['450px', ''], //宽高
          content: $("#JS_bind_email"),
          cancel: () => {
            this.isAlert = false;
            this.getUser({});
          }
        })
      },
      // 邮箱解绑
      goUnbindEmail() {
        this.isAlert = true;
        layer.open({
          type: 1,
          anim:2,
          title: '邮箱解绑',
          area: ['450px', ''], //宽高
          content: $("#JS_unbind_email"),
          cancel: () => {
            this.isAlert = false;
            this.getUser({});
          }
        })
      },
      // 微信解绑
      goUnbindWx() {
        layer.confirm('确定要解绑微信吗？', {
          icon: 3,
          yes: () => {
            this.GET({
              api: '/weixinlogin.php?op=login&action=weixin_unbind',
              success: (data) => {
                layer.msg('解绑成功', {
                  icon: 1,
                  time: 2000
                }, () => {
                  this.getUser({});
                })
              }
            })
          }
        })
      },
      // qq解绑
      goUnbindQQ() {
        layer.confirm('确定要解绑QQ吗？', {
          icon: 3,
          yes: () => {
            this.GET({
              api: '/qqlogin.php?op=login&action=qq_unbind',
              success: (data) => {
                layer.msg('解绑成功', {
                  icon: 1,
                  time: 2000
                }, () => {
                  this.getUser({});
                })
              }
            })
          }
        })
      },
      // 所有成功回调
      success(status) {
        if (status) {
          layer.closeAll();
          this.isAlert = false; 
          this.getUser({});
        }
      }
    },
    mounted() {
      let type=this.$router.currentRoute.query.type||null;
      if(type=='mobile'){
        this.goBindPhone();
      }
    },
    created() {
      document.getElementsByTagName("title")[0].innerHTML = '安全设置_边乐云';
      this.getUser({}); //重新获取用户信息 
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
