<template>
  <div>
    <div class="header">
      <div class="top_nav">
        <ul>
          <li>
            <a target="_blank" href="http://www.bianyue.cn/" class="nav1" title="边乐网">
              <i></i>
            </a>
          </li>
          <li>
            <a target="_blank" href="http://yun.bianyue.cn/lixian" class="nav2" title="边乐云">
              <i></i>
            </a>
          </li>
        </ul>
        <el-popover placement="right" trigger="hover">
          <div class="tip_nav_box">
            <dl>
              <dt>精彩相随</dt>
              <dd>
                <a target="_blank" class="tip_nav_1" href="http://yun.bianyue.cn/lixian">边乐云</a>
                <a target="_blank" class="tip_nav_2" href="http://www.bianyue.cn/">边乐网</a>
                <a target="_blank" class="tip_nav_3" href="http://news.bianyue.cn/">边乐新闻</a>
                <a target="_blank" class="tip_nav_4" href="http://man.bianyue.cn/">边乐男性</a>
              </dd>
            </dl>
            <dl>
              <dt>边乐</dt>
              <dd>
                <a target="_blank" class="tip_nav_5" href="http://yun.bianyue.cn/file/">文件</a>
                <a target="_blank" class="tip_nav_6" href="http://yun.bianyue.cn/lixian/">云下载</a>
                <a target="_blank" class="tip_nav_7" href="http://yun.bianyue.cn/photo/">相册</a>
                <a target="_blank" class="tip_nav_8" href="http://yun.bianyue.cn/contact/">通讯录</a>
                <a target="_blank" class="tip_nav_9" href="http://yun.bianyue.cn/mp3/">我听</a>
              </dd>
            </dl>
            <dl>
              <dt>设置</dt>
              <dd>
                <a target="_blank" class="tip_nav_10" href="http://vip.bianyue.cn/vip">VIP服务</a>
                <a target="_blank" class="tip_nav_11" href="http://vip.bianyue.cn/info">个人资料</a>
                <a target="_blank" class="tip_nav_12" href="http://vip.bianyue.cn/setting">安全设置</a>
              </dd>
            </dl>
          </div>
          <a href="javascript:;" slot="reference" class="tip_nav">
            <i class="nav4"></i>
          </a>
        </el-popover>
      </div> 
      <!-- 左侧 -->
      <div class="top_right">
        <div v-if="userInfo.userid" class="top_bar" @click.stop="togglePop">
          <div class="top_avatar JS_avatar" >
            <a href="javascript:;">
              <img :src="userAvatar">
            </a>
          </div>
          <div class="top_txt">
            <a href="javascript:;">
              <span>{{userInfo.mobile_all||userInfo.username}}</span>
            </a>
          </div>
        </div>
        <div v-else class="top_bar" @click.stop="openLogin">
          <div class="top_avatar JS_avatar">
            <a href="javascript:;">
              <img :src="userAvatar">
            </a>
          </div>
          <div class="top_txt">
            <a href="javascript:;">
              <span>登录</span>
            </a>
          </div>
        </div>
        <el-popover popper-class="w-popover" placement="top-start" v-if="userInfo.vip==0||!userInfo.vip" width="200" trigger="hover" content=" 您还不是会员，开通会员，尊享特权。 ">
          <router-link to="/vip/index" slot="reference" href="javascript:;" class="fr cvip cvip_gray">非会员</router-link>
        </el-popover>
        <router-link to="/vip/index" class="fr cvip cvip_orange" v-else-if="userInfo.vipcart_type==2">年V</router-link>
        <router-link to="/vip/index" class="fr cvip cvip_blue" v-else-if="userInfo.vipcart_type==1">月V</router-link>
        <router-link to="/vip/index" class="fr cvip cvip_gold" v-else-if="userInfo.vip==2">VIP</router-link>
        
        <el-tooltip class="item" effect="dark" :content="msgTip" placement="bottom-start">
          <a href="javascript:;" class="top_a" @click="openMsg">
            <i class="t_notice"></i>
            <em v-if="msgCount!==0">{{msgCount}}</em>
          </a>
        </el-tooltip>
        <!-- 系统通知 -->
        <el-tooltip class="item" effect="dark" content="帮助中心" placement="bottom-end"> 
          <a href="http://help.bianyue.cn/" class="top_a" target="_blank">
            <i class="t_service"></i>
          </a>
        </el-tooltip>
        <!-- 找客服 -->
        <a href="http://dhsf.bianyue.cn/" target="_blank" class="fl orange fd">净网2019 严打不良信息</a>
      </div>
      <!-- 右侧 -->
      <transition enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
        <div class="user_popup animated" v-if="isShowUserPop" >
          <i class="arrow"></i>
          <div class="user_info">
            <img class="fl user_avatar" :src="userAvatar" onerror="this.src='//api.bianyue.cn/nophoto.gif'">
            <div class="div1">
              <p class="mb10">
                <strong class="fn f20 vmid mr10">{{userInfo.nickname||userInfo.mobile_all}}</strong>
                <span rel="vip">
                  <a href="javascript:;" class="fr cvip cvip_gray" v-if="userInfo.vip==0||!userInfo.vip">非会员</a>
                  <a href="javascript:;" class="cvip cvip_orange" v-else-if="userInfo.vipcart_type==2">年V</a>
                  <a href="javascript:;" class="cvip cvip_blue" v-else-if="userInfo.vipcart_type==1">月V</a>
                  <a href="javascript:;" class="fr cvip cvip_gold" v-else-if="userInfo.vip==2">VIP</a>
                </span>
              </p>
              <p class="f16">ID:{{userInfo.userid}}</p>
            </div>
            <div class="div2">
              <router-link class="tip_nav_10" to="/vip/record?type=login">已登录
                <em rel="dev_num">{{userInfo.agent_num}}</em>个设备</router-link>
            </div>
          </div>
          <div class="user_operate fct">
            <a href="javascript:;" @click="goInfo">
              <i class="i_info"></i>个人资料</a>
            <a href="javascript:;" @click="goSetting">
              <i class="i_set"></i>设置</a>
          </div>
          <a class="user_quit" target="_top" href="javascript:;" @click="logout">退出</a>
        </div>
        <!-- 弹出框 -->
      </transition>
    </div>
    <div id="JS_message" class="disn">
      <Message v-if="messageAlert" :init="initMsg"></Message>
      <div style="height:530px;" v-else></div>
    </div> 
    <div id="JS_v_login" class="disn">
      <Login v-if="loginAlert" @isLogin="isLogin" @close="closeLogin"  @goBindPhone="goBindPhone"></Login>
      <div style="height:354px;" v-else></div>
    </div>
    <div id="JS_v_bind_phone" class="disn">
      <NeedBindPhone v-if="phoneAlert" :info="infoData"></NeedBindPhone>
      <div style="height:550px;" v-else></div>
    </div> 
    <Activity id="JS_activity"  class="disn"></Activity> 
  </div>
  <!-- 头部 -->
</template>

<script>
import Message from "@/components/Message.vue";
import Login from "@/components/Login.vue";
import NeedBindPhone from "@/components/NeedBindPhone.vue";
import Activity from "@/components/Activity.vue";
import api from '@/api/index';
export default {
  name: "Header",
  data() {
    return {
      loginAlert: false,
      phoneAlert: false,
      loginWarpper: null,
      messageAlert: false,
      initMsg: {},
      infoData: {}
    };
  },
  components: {
    Message: Message,
    Login: Login,
    NeedBindPhone: NeedBindPhone,
    Activity: Activity
  },
  computed: {
    isShowUserPop() {
      return this.$store.state.user.isShowUserPop;
    },
    msgCount() {
      return this.unreadMessagesCount < 99 ? this.unreadMessagesCount : 99;
    },
    msgTip() {
      return this.unreadMessagesCount == 0
        ? "您暂时没有系统通知"
        : `您有${this.unreadMessagesCount}条未读信息`;
    }
  },
  methods: {
    // 打开登陆页面
    openLogin() {
      this.loginAlert = true;
      this.loginWarpper = layer.open({
        type: 1,
        title: false, 
        anim: 2,
        skin: "w-layer",
        area: ["760px", ""], //宽高
        content: $("#JS_v_login"),
        cancel: () => {
          this.loginAlert = false;
        }
      });
    },
    // 关闭登录页面
    closeLogin() {
      this.loginAlert = false;
      layer.close(this.loginWarpper);
    },
    // 判断是否是登陆页面
    isLogin(data) {
      setTimeout(() => {
        $(".box-warpper .w-layer").css({
          top: "50%",
          "margin-top": -$(".w-layer").height() / 2
        });
      }, 0);
    },
    // 显示隐藏个人用户框
    togglePop() {
      this.$store.commit("changeUserInfo", {
        isShowUserPop: !this.isShowUserPop
      });
    },
    // 个人资料
    goInfo() {
      this.$store.commit("changeUserInfo", {
        isShowUserPop: false
      });
      this.jump("/info");
    },
    // 设置
    goSetting() {
      this.$store.commit("changeUserInfo", {
        isShowUserPop: false
      });
      this.jump("/setting");
    },
    // 打开系统信息
    openMsg() {
      this.messageAlert = true;
      layer.open({
        type: 1,
        title: "系统通知",
        anim: 2,
        area: ["700px", ""], //宽高
        content: $("#JS_message"),
        cancel: () => {
          this.messageAlert = false;
        }
      });
    },
    // 手机绑定
    goBindPhone(data) {
      this.infoData = data;
      this.phoneAlert = true;
      layer.open({
        type: 1,
        title: false,
        anim: 2,
        area: ["920px", ""], //宽高
        content: $("#JS_v_bind_phone"),
        cancel: () => {
          this.phoneAlert = false;
        }
      });
    },
    // 退出登录
    logout() {
      let domain = "bianyue.cn";
      layer.confirm(
        "确定退出登录?",
        {
          icon: 3
        },
        () => {
          api.logout().then(response => {
            layer.msg(
              "正在退出...",
              {
                time: 2000
              },
              () => {
                location.href = "http://yun.bianyue.cn";  
              }
            );
          });
        }
      );
    }
  },
  mounted() {
    $(window).resize(() => {
      $(".box-warpper .w-layer").css({
        top: "50%",
        "margin-top": 0
      });
    });
    $(".JS_avatar img").on("error", function() {
      this.src = "//api.bianyue.cn/nophoto.gif";
    });
  },
  created() {
    // 获取未读信息
    this.GET({
      api: `/user.php?op=info&action=duanxin`,
      success: data => {
        if (
          this.$router.currentRoute.query.pay !== "true"&&this.$router.currentRoute.query.pay !== "2"&&this.$router.currentRoute.query.pay !== "success" &&this.$router.currentRoute.query.type !== "mobile"&&
          !this.getStorage("yunActivity")
        ) {
          layer.open({
            type: 1,
            anim: 1,
            skin: "activity-layer",
            title: false,
            area: ["705px", "490px"], //宽高
            content: $("#JS_activity")
          });
        }
        this.initMsg = data;
        let unreadMessagesCount = data.total;
        this.$store.commit("changeUserInfo", {
          unreadMessagesCount
        });
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-popover {
  padding: 0;
}

.w-popover {
  padding: 15px;
}

.activity-layer {
  background-color: transparent;
  box-shadow: none;
}
.activity-layer .layui-layer-close2 {
  top: -20px;
  right: -15px;
}
</style>
