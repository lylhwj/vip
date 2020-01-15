<template>
  <el-form label-width="80px" ref="bindMobileForm" :rules="customRule" class="demo-ruleForm pad22" status-icon :model="bindMobileMsg">
    <el-form-item label="手机号码" prop="phone">
      <el-input placeholder="请输入手机号码" v-model="bindMobileMsg.phone" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="phoneCode">
      <el-input class="input-with-select" v-model="bindMobileMsg.phoneCode">
        <el-button slot="append" :loading="loading" @click="send(bindMobileMsg.phone)">发送验证码</el-button>
      </el-input>
    </el-form-item>
    <p class="fct">
      <el-button type="primary" @click="submit">绑定</el-button>
    </p>
  </el-form>
</template>

<script>
  export default {
    name: 'BindPhone',
    data() {
      return {
        bindMobileMsg: {
          phone: '',
          phoneCode: '',
        },
        loading: false,
        captcha: null
      }
    },
    methods: {
      send(value) {
        if (!value) {
          this.$refs.bindMobileForm.validateField('phone');
        } else if (!/^1[0-9]{10}$/.test(value)) {
          this.$refs.bindMobileForm.validateField('phone');
        } else {
          this.GET({
            api: `/user.php?op=regcheck&action=mobile&key=${value}`,
            alertErr: 'no',
            success: (data) => {
              if (data.status == 200) { 
                this.captcha.show();
              }
            }
          })

        }
      },
      submit() {
        this.$refs.bindMobileForm.validate((valid) => {
          if (valid) {
            this.GET({
              api: `/user.php?op=info&action=phone_code_check&mobile=${this.bindMobileMsg.phone}&code=${this.bindMobileMsg.phoneCode}`,
              success: (data) => {
                layer.msg('手机绑定成功', {
                  time: 2000,
                  icon: 1
                }, () => {
                  this.$emit('success', true);
                });
              }
            })
          }
        })
      }
    },
    mounted() {
      this.captcha = new TencentCaptcha('2026300646', (res) => { 
        if (res.ret == 0) {
          this.loading = true;
          this.GET({
            api: `/user.php?op=message&action=bindphone&mobile=${this.bindMobileMsg.phone}&ticket=${res.ticket}&randstr=${res.randstr}`,
            alertErr: 'no',
            success: (data) => {
              if (data.status == 200) {
                layer.msg('发送成功', {
                  icon: 1
                });
              } else {
                layer.msg(data.status, {
                  icon: 2
                });
              }
              setTimeout(() => {
                this.loading = false;
              }, 500);
            },
            error: () => {
              this.loading = false;
            }
          })
        }
      });
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
