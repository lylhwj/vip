<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <Left page="vip"></Left>
      <div class="view_box1">
        <div class="view_box2">
          <div class="main_top">
            <div class="left_mtop">
              <div class="fl nav_sup">
                <a href="javascript:;" :class="{hover:tabIndex==0}" @click="goTo(0,'index')">VIP服务</a>
                <a href="javascript:;" :class="{hover:tabIndex==1}" @click="goTo(1,'point')">积分充值</a>
                <a href="javascript:;" :class="{hover:tabIndex==2}" @click="goTo(2,'coupon')">我的卡券包</a>
                <a href="javascript:;" :class="{hover:tabIndex==3}" @click="goTo(3,'record')">历史记录</a>
              </div>
            </div> 
          </div>
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Left from '@/components/Left.vue';
  export default {
    name: 'Vip',
    data() {
      return {
        tabIndex: 0,
        transitionName: '',
      }
    },
    watch: { //使用watch 监听$router的变化
      $route(to, from) {
        this.tabIndex = to.meta.index;
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }
    },
    components: {
      Header: Header,
      Left: Left
    },
    methods: {
      goTo(index, to) {
        this.tabIndex = index;
        this.jump(`/vip/${to}`);
      } 
    },
    mounted() { 
      this.tabIndex = this.$router.currentRoute.meta.index;
    },
    created() {
      this.getUser({});
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
