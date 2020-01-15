<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <Left page="info"></Left>
      <div class="view_box1">
        <div class="view_box2">
          <div class="main_top with_btmline">
            <div class="left_mtop">
              <div class="fl nav_sup">
                <a class="hover">个人资料</a>
              </div>
            </div>
          </div>
          <div class="view_scorll">
            <div class="personal_info">
              <div class="user_head" id="js-face_edit" @click="upload">
                <img id="JS_avatar" :src="userAvatar" onerror="this.src='//api.bianyue.cn/nophoto.gif'">
                <a href="javascript:;">修改头像</a>
              </div>
              <form method="post" action="" id="">
                <div class="personal_form">
                  <dl>
                    <dt>昵称：</dt>
                    <dd>
                      <el-input class="w265" maxlength="15" v-model="formData.nickname"></el-input>
                      <label for="user_name">添加您的昵称（4-20个字符）</label>
                      <div class="change_tip">
                        <span>昵称填写须知：与边乐云业务或产品有冲突的昵称，边乐云将有可能收回；</span> 
                      </div>
                    </dd>
                  </dl>
                  <dl>
                    <dt>邮箱：</dt>
                    <dd>
                      <el-input class="w265" :disabled="true" v-model="formData.email"></el-input>
                      <el-button type="primary" v-if="!formData.email" plain @click="goBindEmail">绑定</el-button>
                      <el-button type="primary" v-else plain disabled>已绑定</el-button>
                    </dd>
                  </dl>
                  <dl>
                    <dt>手机：</dt>
                    <dd>
                      <el-input class="w265" :disabled="true" v-model="formData.mobile"></el-input>
                      <el-button type="primary" v-if="formData.mobilecheck==1" plain disabled>已绑定</el-button>
                      <el-button type="primary" v-else plain @click="goBindPhone">绑定</el-button>
                    </dd>
                  </dl>
                  <dl>
                    <dt>性别：</dt>
                    <dd> 
                      <el-radio v-model="sex" label="1">男</el-radio>
                      <el-radio v-model="sex" label="2">女</el-radio> 
                    </dd>
                  </dl>
                  <dl>
                    <dt>QQ：</dt>
                    <dd>
                      <el-input class="w265" placeholder="输入QQ号" v-model="formData.qq"></el-input>
                    </dd>
                  </dl>
                  <dl>
                    <dt>生日：</dt>
                    <dd>
                      <el-date-picker v-model="birthday" value-format="yyyy-MM-dd" @change="changeBirthday" class="w265"
                        placeholder="选择生日"></el-date-picker>
                    </dd>
                  </dl>
                  <dl>
                    <dt>联系地址：</dt>
                    <dd>
                      <Address @getAddress="getAddress"></Address>
                    </dd>
                  </dl>
                  <dl>
                    <dt>真实姓名：</dt>
                    <dd>
                      <el-input class="w265" v-model="formData.realname" placeholder="输入真实姓名"></el-input>
                    </dd>
                  </dl>
                  <dl>
                    <dt>身份证号：</dt>
                    <dd>
                      <el-input class="w265" v-model="formData.idNumber" placeholder="输入身份证号"></el-input>
                    </dd>
                  </dl>
                  <dl class="mt10">
                    <dd>
                      <el-button type="primary" @click="save">保存</el-button>
                    </dd>
                  </dl>

                </div>
              </form>
            </div>
          </div>
          <!-- 滚动部分 -->
        </div>
      </div>
    </div>
    <div id="JS_bind_email" class="disn">
      <BindEmail v-if="emailAlert" @success="success"></BindEmail>
      <div style="height:174px;" v-else></div>
    </div>
    <div id="JS_bind_phone" class="disn">
      <BindPhone v-if="phoneAlert" @success="success"></BindPhone>
      <div style="height:209px;" v-else></div>
    </div>
    <div id="JS_upload_alert" class="disn">
      <Upload v-if="uploadAlert" @off="success" @crop-upload-success="updateInfo"></Upload>
      <div style="height:510px;" v-else></div>
    </div>
    <div id="JS_info_alert" class="disn">
      <InfoInit v-if="infoAlert" @success="successInfo" @upload="upload('info')"></InfoInit>
      <div style="height:408px;" v-else></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Left from "@/components/Left.vue";
import Address from "@/components/Address.vue";
import BindEmail from "@/components/BindEmail.vue";
import BindPhone from "@/components/BindPhone.vue";
import Upload from "@/components/Upload.vue";
import InfoInit from "@/components/InfoInit.vue";
export default {
  name: "Info",
  data() {
    return {
      birthday: "",
      sex: 0,
      emailAlert: false,
      phoneAlert: false,
      uploadAlert: false,
      infoAlert: false,
      infoLayer: null
    };
  },
  computed: { 
    formData() {
      return Object.assign({}, this.userInfo);
    }
  },
  components: {
    Header: Header,
    Left: Left,
    Address: Address,
    BindEmail: BindEmail,
    BindPhone: BindPhone,
    Upload: Upload,
    InfoInit: InfoInit
  },
  methods: {
    updateInfo(data, init) {
      if (data) {
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
      } else {
        this.getUser({
          callback: () => {
            let year = this.formData.year || "";
            let month = this.formData.month || "";
            let date = this.formData.date || "";
            if (
              /[0-9]/.test(year) &&
              /[0-9]/.test(month) &&
              /[0-9]/.test(date)
            ) {
              this.birthday = `${this.formData.year}-${
                this.formData.month
              }-${date}`;
            }
            this.sex = this.formData.sex;
            if (!init) {
              setTimeout(() => {
                let _this = this; 
                if ($("#JS_avatar").attr("src").indexOf("//api.bianyue.cn/nophoto.gif") !== -1 &&
                  !_this.userInfo.nickname &&
                  _this.userInfo.sex == 0
                ) {
                  _this.openInfo();
                } else {
                  $("#JS_avatar").on("error", function() {
                    this.src = "//api.bianyue.cn/nophoto.gif";
                    if (!_this.userInfo.nickname && _this.userInfo.sex == 0) {
                      _this.openInfo();
                    }
                  });
                }
              }, 100);
            }
          }
        });
      }
    },
    getAddress(address) {
      this.formData.province = address.province;
      this.formData.city = address.city;
      this.formData.area = address.area;
    },
    changeBirthday(value) {
      if (value) {
        this.formData.year = value.split("-")[0];
        this.formData.month = value.split("-")[1];
        this.formData.date = value.split("-")[2];
      } else {
        this.formData.year = "";
        this.formData.month = "";
        this.formData.date = "";
      }
    },
    // 邮箱绑定
    goBindEmail() {
      this.emailAlert = true;
      layer.open({
        type: 1,
        title: "邮箱绑定",
        anim: 2,
        area: ["450px", ""], //宽高
        content: $("#JS_bind_email"),
        cancel: () => {
          this.emailAlert = false;
          this.updateInfo();
        }
      });
    },
    // 手机绑定
    goBindPhone() {
      this.phoneAlert = true;
      layer.open({
        type: 1,
        title: "手机绑定",
        anim: 2,
        area: ["450px", ""], //宽高
        content: $("#JS_bind_phone"),
        cancel: () => {
          this.phoneAlert = false;
        }
      });
    },
    // 上传头像
    upload(type) {
      layer.close(this.infoLayer);
      this.infoAlert = false;
      this.uploadAlert = true;
      layer.open({
        type: 1,
        title: "上传头像",
        anim: 2,
        area: ["792px", ""], //宽高
        content: $("#JS_upload_alert"),
        cancel: () => {
          this.uploadAlert = false;
        }
      });
    },
    // 打开信息初始化弹窗
    openInfo() {
      this.infoAlert = true;
      this.infoLayer = layer.open({
        type: 1,
        title: "欢迎您",
        anim: 2,
        area: ["450px", ""], //宽高
        content: $("#JS_info_alert"),
        cancel: () => {
          this.infoAlert = false;
        }
      });
    },
    // 信息初始化成功
    successInfo() {
      setTimeout(() => {
        layer.closeAll();
        this.infoAlert = false;
        this.uploadAlert = false;
        this.updateInfo();
      }, 1000);
    },
    // 更新资料
    save() {
      this.formData.sex = parseInt(this.sex);
      this.GET({
        api: "/user.php?op=info&action=updateinfo",
        data: this.formData,
        success: data => {
          layer.msg("保存成功", {
            icon: 1
          });
          this.updateInfo();
        }
      });
    },
    // 所有成功回调
    success(status) {
      if (status) {
        layer.closeAll();
        this.emailAlert = false;
        this.phoneAlert = false;
        this.uploadAlert = false;
        this.updateInfo(false, true);
      }
    }
  },
  created() {
    document.getElementsByTagName("title")[0].innerHTML = "个人资料_边乐云";
    //重新获取用户信息
    this.updateInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input.w265,
.el-select.w265,
.el-cascader.w265 {
  width: 265px;
}
</style>
