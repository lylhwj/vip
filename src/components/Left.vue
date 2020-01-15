<template>
  <div class="left_nav">
    <ul>
      <li :class="{hover:page=='vip'}">
        <router-link to="/vip"><i class="nav1"></i>VIP服务</router-link>
      </li>
      <li :class="{hover:page=='info'}">
        <router-link to="/info"><i class="nav2"></i>个人资料</router-link>
      </li>
      <li :class="{hover:page=='setting'}">
        <router-link to="/setting"><i class="nav3"></i>安全设置</router-link>
      </li>
      <li :class="{hover:page=='DataReport'}">
        <router-link to="/dataReport"><i class="nav4"></i>数据报告</router-link>
      </li> 
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Left',
    data() {
      return {

      }
    },
    props: ['page']
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
