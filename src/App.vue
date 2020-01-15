<template>
  <div id="app" @click="closeUserPop">
    <router-view class="box-warpper"></router-view>   
  </div>
</template>

<script>
  import '@/assets/animate.css';
  import '@/assets/layer/layer.css';
  import '@/assets/public.css';
  import '@/assets/loen.css';
  import '@/assets/alert.css';
  import '@/assets/app.css';  
  export default {
    name: 'App',
    data() {
      return {
          
      }
    },
    components: { 
     
    },
    methods: {
      // 关闭用户弹窗
      closeUserPop() {
        this.$store.commit('changeUserInfo', {
          isShowUserPop: false
        });
      } 
    },  
    created() {  
      this.getUser({});
    }
  }

</script>
<style>


</style>
