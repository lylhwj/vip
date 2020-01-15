<template>
  <div>
    <el-form status-icon label-width="70px" ref="SecurityCodeForm" :rules="customRule" class="demo-ruleForm pad22" :model="ruleForm">
      <el-form-item label="原安全码" prop="oldSecurityCode">
        <el-input type="password" v-model="ruleForm.oldSecurityCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新安全码" prop="newSecurityCode">
        <el-input type="password" v-model="ruleForm.newSecurityCode" auto-complete="off"></el-input>
      </el-form-item>
      <p class="fct">
        <el-button type="primary" @click="submit">提交</el-button>
      </p>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'SecurityCode',
    data() {
      return {
        ruleForm: {
          oldSecurityCode: '',
          newSecurityCode: ''
        }
      }
    },
    methods: {
      submit() {
        this.$refs.SecurityCodeForm.validate((valid) => {
          if (valid) {
            this.GET({
              api: `/user.php?op=info&action=updateanquanma&old_pwd=${this.ruleForm.oldSecurityCode}&new_pwd=${this.ruleForm.newSecurityCode}`,
              success: (data) => {
                layer.msg('安全码修改成功', {
                  time: 2000,
                  icon:1
                }, () => {
                  this.$emit('success', true);
                });
              }
            })
          }
        })
      },
      reset() {
        this.$refs.modifyPwdForm.resetFields();
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
