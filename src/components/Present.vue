<template>
  <el-form label-width="140px" class="demo-ruleForm pad22" ref="presentForm" status-icon :rules="customRule" :model="ruleForm">
    <el-form-item label="卡号" style="margin-bottom: 12px;">
      <strong class="black">{{cardNumber}}</strong>
    </el-form-item>
    <el-form-item label="赠送用户ID或手机号" prop="other_id">
      <el-input placeholder="请输入赠送用户ID或手机号" v-model="ruleForm.other_id" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确定用户ID或手机号" prop="comfirm_other_id">
      <el-input placeholder="请再次输入赠送用户ID或手机号" v-model="ruleForm.comfirm_other_id" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <p class="fct mt30">
      <el-button type="primary" @click="submit">立即兑换</el-button>
    </p>
  </el-form>
</template>

<script>
  export default {
    name: 'Present',
    data() {
      var validateId = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入赠送用户ID'));
        } else {
          if (!this.ruleForm.comfirm_other_id) {
            this.$refs.presentForm.validateField('comfirm_other_id');
          }
          callback();
        }
      };
      var validateCheckId = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入赠送用户ID'));
        } else if (value !== this.ruleForm.other_id) {
          callback(new Error('两次输入ID不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          other_id: '',
          comfirm_other_id: ''
        },
        customRule: {
          other_id: [{
            validator: validateId,
            trigger: 'blur'
          }],
          comfirm_other_id: [{
            validator: validateCheckId,
            trigger: 'blur'
          }]
        }
      }
    },
    props: ['cardNumber', 'cardId'],
    methods: {
      submit() {
        this.$refs.presentForm.validate((valid) => {
          if (valid) {
            layer.confirm('是否确定赠送？', {
              icon: 3
            }, () => {
              this.GET({
                api: `/user.php?op=info&action=give_other&other_id=${this.ruleForm.other_id}&cid=${this.cardNumber}`,
                success: (data) => {
                  layer.msg('赠送成功', {
                    time: 2000,
                    icon: 1
                  }, () => {
                    this.$emit('success', true);
                  });
                }
              })
            })

          }
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
