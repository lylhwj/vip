<template>
  <div class="none-warpper">
	    <img src="@/assets/404.jpg" usemap="#Map" />
      <map name="Map">
          <area shape="rect" coords="177,369,305,404" @click="jump('/vip/index')" alt="返回首页">
      </map> 
  </div>
</template>
<script>
export default {
  name: 'Vip404',
  data () {
    return {
      
    }
  }, 
  created() {
    document.getElementsByTagName("title")[0].innerHTML = '404_边乐云';
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.none-warpper{min-width: auto;text-align:center;height:470px;margin-top: 105px;margin-bottom: 23px;}
</style>
