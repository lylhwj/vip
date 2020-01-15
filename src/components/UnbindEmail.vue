<template>
  <el-form status-icon label-width="80px" ref="unbindEmailForm" class="demo-ruleForm pad22">
    <el-form-item label="邮箱帐号" prop="email" style="margin:10px 0 40px;">
      <el-input placeholder="请输入邮箱" readonly v-model="email" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <p class="fct">
      <el-button type="primary" @click="submit" :loading="loading">解绑</el-button>
    </p>
  </el-form>
</template>

<script>
  export default {
    name: 'UnbindEmail',
    data() {
      return {
        loading: false
      }
    },
    props: ['email'],
    methods: {
      submit() {
        if (!this.loading) {
          this.loading = true;
          //解绑之前先判断是否已经解绑成功
          this.getUser({
            callback: () => {
              if (!this.userInfo.email) {
                this.loading = false;
                layer.msg(`您已经解绑成功`, {
                  time: 2000,
                  icon:4
                }, () => {
                  this.$emit('success', true);
                });
                return false;
              }
              this.GET({
                api: `/user.php?op=info&action=sendemailunbind&email=${this.email}`,
                alertErr: 'no',
                success: (data) => {
                  if (data.status == 200) {
                    layer.msg('解绑邮件已发送，请到邮箱进行查看。（如果收件箱没有，请查看垃圾箱）', {
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
          });
        }
      }
    },
    created() {

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
