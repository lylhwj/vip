<template>
  <el-form label-width="80px" class="demo-ruleForm pad22" :model="infoInitMsg">
    <el-form-item label="昵称" prop="nickname">
      <el-input placeholder="请输入昵称" v-model="infoInitMsg.nickname" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio v-model="infoInitMsg.sex" label="1">男</el-radio>
      <el-radio v-model="infoInitMsg.sex" label="2">女</el-radio>
    </el-form-item>
    <el-form-item label="头像">
      <div class="user_head" @click="upload" style="position: relative;border:1px solid #eee">
        <img :src="userAvatar" onerror="this.src='//api.bianyue.cn/nophoto.gif'">
        <a href="javascript:;">修改头像</a>
      </div>
    </el-form-item>
    <p class="fct mt20">
      <el-button type="primary" @click="submit">保存设置</el-button>
    </p> 
  </el-form>
</template>

<script> 
  export default {
    name: 'InfoInit',
    data() {
      return {
        infoInitMsg: {
          nickname: '',
          sex: '',
        } 
      }
    },  
    methods: {
      // 上传头像
      upload() { 
        this.$emit('upload',true);
      }, 
      submit() { 
        this.GET({
          api: '/user.php?op=info&action=updateinfo',
          data: this.infoInitMsg,
          success: (data) => {
            layer.msg('保存成功', {
              icon: 1
            });
            this.$emit('success',true);
          }
        })
      }
    },
    created() { 
       this.infoInitMsg.nickname=this.userInfo.userid; 
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
