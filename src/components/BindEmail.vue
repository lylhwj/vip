<template>
  <el-form status-icon label-width="80px" ref="bindEmailForm" :rules="customRule" class="demo-ruleForm pad22" :model="ruleForm">
    <el-form-item label="邮箱帐号" prop="email" style="margin:10px 0 40px;">
      <el-input placeholder="请输入邮箱" v-model="ruleForm.email" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <p class="fct">
      <el-button type="primary" @click="submit" :loading="loading">绑定</el-button>
    </p>
  </el-form>
</template>

<script>
  export default {
    name: 'BindEmail',
    data() {
      return {
        ruleForm: {
          email: ''
        },
        loading: false
      }
    },
    methods: {
      submit() {
        //绑定之前先判断是否已经绑定了
        this.getUser({
          callback: () => {
            if (this.userInfo.email) {
              (`您已经绑定了${this.userInfo.email}`, {
                time: 2000,
                icon:4
              }, () => {
                this.$emit('success', true);
              });
              return false;
            }
          }
        })
        this.$refs.bindEmailForm.validate((valid) => {
          if (valid) {
            if (!this.loading) {
              this.loading = true;
              this.GET({
                api: `/user.php?op=info&action=sendemailcheck&email=${this.ruleForm.email}`,
                success: (data) => {
                  if (data.status == 200) {
                    layer.msg('验证邮件已发送，请到邮箱查看。（如果收件箱没有，请查看垃圾箱）', {
                      time: 6000,
                      icon:1
                    });
                  } else {
                    layer.msg(data.status,{icon:2});
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
          }
        })
      }
    },
    created() {
     
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
