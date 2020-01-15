<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <Left page="DataReport"></Left>
      <div class="view_box1">
        <div class="view_box2">
          <div class="main_top with_btmline">
            <div class="left_mtop">
              <div class="fl nav_sup">
                <a class="hover">数据报告</a>
              </div>
            </div>
          </div>
          <div class="view_scorll pad30_lr">
            <p class="w970 mt30 tip_data">
              <i class="el-icon-bell"></i>2018-8-8：我司已对安全进行升级，对更多违法字眼屏蔽，并将相关涉及违法的用户账号永久封号。</p>
            <div class="w970">
              <div class="fl user_head2">
                <img @click="modifyImg" :src="userAvatar" onerror="this.src='//api.bianyue.cn/nophoto.gif'">
                <a href="javascript:;">修改</a>
              </div>
              <div class="mt30 data_timebar">
                <p class="fl">注册时间
                  <span class="">{{userInfo.regdate*1000,1|timeStamp}}</span>
                </p>
                <p>已使用
                  <span class="fd f16">{{userInfo.used}}天</span>
                </p>
                <p class="fr">VIP剩余
                  <span class="fd f16">{{userInfo.Surplus}}天</span>
                </p>
              </div>
            </div>
            <div class="clear0"></div>
            <ul class="data_list">
              <li>
                <p class="title">用户信息</p>
                <div class="pad15 gray">
                  <a href="javascript:;" class="fr cvip cvip_gray" v-if="userInfo.vip==0||!userInfo.vip">非会员</a>
                  <a href="javascript:;" class="cvip cvip_orange" v-else-if="userInfo.vipcart_type==2">年V</a>
                  <a href="javascript:;" class="cvip cvip_blue" v-else-if="userInfo.vipcart_type==1">月V</a>
                  <a href="javascript:;" class="fr cvip cvip_gold" v-else-if="userInfo.vip==2">VIP</a>
                  
                  <p class="mt20 mb6">UID：{{userInfo.userid}}</p>
                  <p>手机号码：{{userInfo.mobile_all}}</p>
                  <p class="mt20" v-if="vipType!==3">VIP状态：{{userInfo.overduedate*1000,1|timeStamp}}到期</p>
                  <p class="mt20" v-else>VIP状态：您还不是VIP会员</p>
                  <p class="fct mt15">
                    <a href="javascript:;" class="w100 button btn_stroke" v-if="vipType!==3" @click="openPay(3,50,500,'wx')">
                      <span>续费VIP</span>
                    </a>
                    <a href="javascript:;" class="w100 button btn_stroke" v-else @click="openPay(3,50,500,'wx')">
                      <span>立即开通</span>
                    </a>
                  </p>
                </div>
              </li>
              <li>
                <p class="title">账户积分</p>
                <div class="pad15 gray fct">
                  <div class="orange">
                    <img src="@/assets/icon_jifen.png" width="34" alt="">
                    <p>{{userInfo.point}}</p>
                  </div>
                  <p class="mt20">
                    <a href="javascript:;" class="button btn_stroke w100 mr10" @click="openPay(3,50,500,'point')">
                      <span>积分兑换VIP</span>
                    </a>
                    <a href="javascript:;" class="button w100 btn_stroke" @click="jump('/vip/point')">
                      <span>积分充值</span>
                    </a>
                  </p>
                </div>
              </li>
              <li>
                <p class="title">登入信息</p>
                <div class="pad15 gray">
                  <p class="mt20">登录次数：{{userInfo.loginnum}}次</p>
                  <p class="mt30 mb6">最后登录时间：{{userInfo.lastdate*1000,1|timeStamp}}</p>
                  <p>最后登录IP：{{userInfo.lastip}}</p>
                </div>
              </li>
            </ul>
            <div class="w970 data_meg">
              <table>
                <tr>
                  <th colspan="2">短消息
                    <a href="javascript:;" class="fr fn f14 gray" @click="openMsg">+查看更多</a>
                  </th>
                </tr>
                <tr v-if="msgData.length==0">
                  <td class="fct" v-if="!initLoading">暂无消息</td>
                  <td class="fct" v-else v-loading="initLoading">&nbsp;</td>
                </tr>
                <tr v-for="(msg,index) in msgData" :key="index">
                  <td>
                    <span :class="[msg.dxtype==0?'meg_type1':'meg_type2']"></span>
                  </td>
                  <td>
                    <span>{{msg.typeName}}</span>
                    <span class="gray">{{msg.time*1000|timeStamp}}</span>
                   <p class="f13 gray">
              <a href="javascript:;">
                <span :class="{red:msg.dxstatus==0}">[{{msg.status}}]</span>{{msg.title|remove}}</a> <el-button style="font-size:12px;"  v-if="msg.title.indexOf('【去赠送】')!==-1" type="primary" size="mini" @click="go(msg.url)" icon="el-icon-d-arrow-right">去赠送</el-button><el-button style="font-size:12px;"  v-if="msg.title.indexOf('【去兑换】')!==-1" type="primary" size="mini" @click="go(msg.url)" icon="el-icon-d-arrow-right">去兑换</el-button><el-button style="font-size:12px;" v-if="msg.title.indexOf('【去绑定】')!==-1" type="primary" size="mini" @click="go(msg.url)" icon="el-icon-d-arrow-right">去绑定</el-button>
            </p>
                  </td>
                </tr>
              </table>
            </div>
            <div class="w970 mt30 fct list_space">
              <ul>
                <li>
                  <p class="f18">文件空间</p>
                  <p class="f16 blue mt20">
                    <el-button type="primary" plain icon="el-icon-plus" class="f20 fl" @click="dilatation(0)">增加容量</el-button>
                    <span class="fr">剩余：{{fileData.keyong}}</span>
                  </p>
                  <el-progress type="circle" :percentage="parseInt(fileData.baifenbi)||0" color="#54b82a" class="mt30"></el-progress>
                  <p class="gray f16 mt30">总容量：{{fileData.allsize}}</p>
                </li>
                <li>
                  <p class="f18">相册空间</p>
                  <p class="f16 blue mt20">
                    <el-button type="primary" plain icon="el-icon-plus" class="f20 fl" @click="dilatation(1)">增加容量</el-button>
                    <span class="fr">剩余：{{photoData.keyong}}</span>
                  </p>
                  <el-progress type="circle" :percentage="parseInt(photoData.baifenbi)||0" color="#0688ff" class="mt30"></el-progress>
                  <p class="gray f16 mt30">总容量：{{photoData.allsize}}</p>
                </li>
                <li>
                  <p class="f18">云下载空间</p>
                  <p class="f16 blue mt20">
                    <el-button type="primary" plain icon="el-icon-plus" class="f20 fl" @click="dilatation(2)">增加容量</el-button>
                    <span class="fr">剩余：{{panData.keyong}}</span>
                  </p>
                  <el-progress type="circle" :percentage="parseInt(panData.baifenbi)||0" color="#fe8254" class="mt30"></el-progress>
                  <p class="gray f16 mt30">总容量：{{panData.allsize}}</p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 滚动部分 -->
        </div>
      </div>
    </div>
    <div id="JS_upload_alert" class="disn">
      <Upload v-if="uploadAlert" @off="success" @crop-upload-success="updateImg"></Upload>
      <div style="height:510px;" v-else></div>
    </div>
    <div id="JS_dilatation_file_alert" class="disn">
      <el-alert title="(兑换比例：1积分 = 1MB)" type="error">
      </el-alert>
      <div class="fct pad15 mt20">
        使用：
        <el-input-number v-model="filePointNum" :min="1" :max="parseInt(userInfo.point)"></el-input-number> 积分可兑换空间：
        <span class="red f18">{{filePointNum}}MB</span>
        <p class="mt20">
          <el-button type="primary" @click="exchange(0)">马上兑换</el-button>
        </p>
      </div>
    </div>
    <div id="JS_dilatation_photo_alert" class="disn">
      <el-alert title="(兑换比例：1积分 = 1MB)" type="error">
      </el-alert>
      <div class="fct pad15 mt20">
        使用：
        <el-input-number v-model="photoPointNum" :min="1" :max="parseInt(userInfo.point)"></el-input-number> 积分可兑换空间：
        <span class="red f18">{{photoPointNum}}MB</span>
        <p class="mt20">
          <el-button type="primary" @click="exchange(1)">马上兑换</el-button>
        </p>
      </div>
    </div>
    <div id="JS_dilatation_pan_alert" class="disn">
      <el-alert title="(兑换比例：1积分 = 200MB)" type="error">
      </el-alert>
      <div class="fct pad15 mt20">
        使用：
        <el-input-number v-model="panPointNum" :min="1" :max="parseInt(userInfo.point)"></el-input-number> 积分可兑换空间：
        <span class="red f18">{{panPointNum*200}}MB</span>
        <p class="mt20">
          <el-button type="primary" @click="exchange(2)">马上兑换</el-button>
        </p>
      </div>
    </div>
    <div id="JS_message_data" class="disn">
      <Message v-if="messageAlert" :init="initMsg"></Message>
      <div style="height:530px;" v-else></div>
    </div>
    <div id="JS_go_pay" class="disn">
      <Pay v-if="payAlert" :data="payData"></Pay>
      <div style="height:560px;" v-else></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Left from "@/components/Left.vue";
import Upload from "@/components/Upload.vue";
import Message from "@/components/Message.vue";
import Pay from "@/components/Pay.vue";
export default {
  name: "DataReport",
  data() {
    return {
      initLoading: false,
      uploadAlert: false,
      messageAlert: false,
      payAlert:false,
      initMsg: {},
      msgData: [],
      filePointNum: 1,
      photoPointNum: 1,
      panPointNum: 1,
      fileData: {
        allsize: "0G",
        userallsize: "0G",
        keyong: "0G"
      },
      photoData: {
        allsize: "0G",
        userallsize: "0G",
        keyong: "0G"
      },
      panData: {
        allsize: "0G",
        userallsize: "0G",
        keyong: "0G"
      },
      payData:{}
    };
  },
  filters: {
    remove(title) {
      if (title.indexOf("【去赠送】") !== -1) {
        return title.replace(/【去赠送】/, "");
      }
      if (title.indexOf("【去兑换】") !== -1) {
        return title.replace(/【去兑换】/, "");
      }
      return title.replace(/【去绑定】/, "");
    }
  },
  components: {
    Header: Header,
    Left: Left,
    Upload: Upload,
    Message: Message,
    Pay:Pay
  },
  computed: {
    vipType() {
      if (this.userInfo.vip == 2) {
        return 0;
      } else if (this.userInfo.vipcart_type == 2) {
        return 1;
      } else if (this.userInfo.vipcart_type == 1) {
        return 2;
      } else {
        return 3;
      }
    }
  },
  methods: {
    // 获取文件空间信息
    getFileData() {
      this.GET({
        api: "/box.php?op=file&action=allsize",
        success: data => {
          this.fileData = Object.assign(this.fileData, data.data);
        }
      });
    },
    // 获取相册空间信息
    getPhotoData() {
      this.GET({
        api: "/box.php?op=photo&action=allsize",
        success: data => {
          this.photoData = Object.assign(this.photoData, data.data);
        }
      });
    },
    // 获取云下载空间信息
    getPanData() {
      this.GET({
        api: "/pan.php?op=init&action=allsize",
        success: data => {
          this.panData = Object.assign(this.panData, data.data);
        }
      });
    },
    // 开通/续费vip
    openPay(month, price, payPoint,payType) {
      this.payData.month = month;
      this.payData.price = price;
      this.payData.payPoint = payPoint;
      this.payData.payType = payType||'wx';
      // //打开支付窗口
      this.payAlert = true;
      layer.open({
        type: 1,
        title: "账户充值",
        anim: 2,
        area: ["820px", "560px"], //宽高
        content: $("#JS_go_pay"),
        cancel: () => {
          this.payAlert = false;
        }
      });
    },
    // 打开系统信息
    openMsg() {
      this.messageAlert = true;
      layer.open({
        type: 1,
        title: "系统通知",
        anim: 2,
        area: ["700px", ""], //宽高
        content: $("#JS_message_data"),
        cancel: () => {
          this.messageAlert = false;
        }
      });
    },
    // 空间扩容
    dilatation(type) {
      if (type == 0) {
        layer.open({
          type: 1,
          title: "文件扩容",
          anim: 2,
          area: ["500px", ""], //宽高
          content: $("#JS_dilatation_file_alert"),
          cancel: () => {}
        });
      } else if (type == 1) {
        layer.open({
          type: 1,
          title: "相册扩容",
          anim: 2,
          area: ["500px", ""], //宽高
          content: $("#JS_dilatation_photo_alert"),
          cancel: () => {}
        });
      } else {
        this.jump("/vip/coupon?type=1");
      }
    },
    // 兑换
    exchange(type) {
      // 文件扩容
      if (type == 0) {
        this.GET({
          api: `/box.php?op=file&action=kuorong&num=${this.filePointNum}`,
          success: data => {
            layer.msg(
              "兑换成功",
              {
                icon: 1
              },
              () => {
                layer.closeAll();
                this.filePointNum = 1;
              }
            );
            this.getFileData();
          }
        });
      } else if (type == 1) {
        this.GET({
          api: `/box.php?op=photo&action=kuorong&num=${this.photoPointNum}`,
          success: data => {
            layer.msg(
              "兑换成功",
              {
                icon: 1
              },
              () => {
                layer.closeAll();
                this.photoPointNum = 1;
              }
            );
            this.getPhotoData();
          }
        });
      } else {
        this.GET({
          api: `/pan.php?op=other&action=kuorong&num=${this.panPointNum}`,
          success: data => {
            layer.msg(
              "兑换成功",
              {
                icon: 1
              },
              () => {
                layer.closeAll();
                this.panPointNum = 1;
              }
            );
            this.getPanData();
          }
        });
      }
    },
    // 修改头像
    modifyImg() {
      this.uploadAlert = true;
      layer.open({
        type: 1,
        anim: 2,
        title: "上传头像",
        area: ["792px", ""], //宽高
        content: $("#JS_upload_alert"),
        cancel: () => {
          this.uploadAlert = false;
        }
      });
    },
    // 更新头像
    updateImg(data) {
      if (data.type == "default") {
        this.$store.commit("changeUserInfo", {
          userAvatar: data.data
        });
        this.uploadAlert = false;
        layer.closeAll();
      } else {
        this.$store.commit("changeUserInfo", {
          userAvatar: data.pic_path
        });
      }
    },
    // 所有成功回调
    success(status) {
      if (status) {
        layer.closeAll();
        this.uploadAlert = false;
        this.getUser({});
      }
    }, // 有地址跳转
    go(url) {
      this.jump(url);
    }
  },
  created() {
    document.getElementsByTagName("title")[0].innerHTML = "数据报告_边乐云";
    this.getUser({});
    this.getFileData();
    this.getPhotoData();
    this.getPanData();
    this.initLoading = true;
    // 获取未读信息
    this.GET({
      api: `/user.php?op=info&action=duanxin`,
      success: data => {
        this.initLoading = false;
        data.data.forEach((element, index) => {
          element.status = element.dxstatus == 0 ? "未读" : "已读";
          element.typeName = element.dxtype == 0 ? "系统通知" : "VIP服务通知";
          if (index < 3) {
            this.msgData.push(element);
          }
        });
        this.initMsg = data;
      },
      error: () => {
        this.initLoading = false;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button {
  font-size: 16px;
}

.el-icon-plus {
  font-size: 16px;
}
</style>
