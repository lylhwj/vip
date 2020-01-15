<template>
  <div>
    <el-alert title="新密码请设置8位以上数字及字母组合的密码" type="error"></el-alert>
    <el-form status-icon label-width="70px" ref="modifyPwdForm" :rules="customRule" class="demo-ruleForm pad22" :model="ruleForm">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input type="password" v-model="ruleForm.oldPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="ruleForm.newPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="ruleForm.checkPwd" auto-complete="off"></el-input>
      </el-form-item>
      <p class="fct">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </p>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ModifyPwd',
    data() {
      var validatePwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'));
        } else if (value.length < 8) {
          callback(new Error('请输入正确的新密码'));
        } else {
          if (!this.ruleForm.checkPwd) {
            this.$refs.modifyPwdForm.validateField('checkPwd');
          }
          callback();
        }
      };
      var validateCheckPwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldPwd: '',
          newPwd: '',
          checkPwd: ''
        },
        customRule: {
          newPwd: [{
            validator: validatePwd,
            trigger: 'blur'
          }],
          checkPwd: [{
            validator: validateCheckPwd,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submit() {
        this.$refs.modifyPwdForm.validate((valid) => {
          if (valid) {
            this.GET({
              api: `/user.php?op=info&action=editpass&old_pwd=${encodeURIComponent(this.ruleForm.oldPwd)}&new_pwd=${encodeURIComponent(this.ruleForm.newPwd)}`,
              success: (data) => {
                layer.msg('密码修改成功', {
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
