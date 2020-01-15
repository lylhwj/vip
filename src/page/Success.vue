<template>
<div>
  <div class="pay_success">
    <dl class="h_oflow">
      <dt class="fl"><img class="vmid" width="55" src="@/assets/icon_yes.gif" alt=""></dt>
      <dd class="fl black f18 fd mt4">支付成功<br>开通服务成功！</dd>
    </dl> 
    <div class="bg" v-if="month==1">
      <p class="f18 gray">订单套餐：<span class="orange">VIP（1个月）</span></p>
      <p class="f18 gray mt10">订单金额：<span class="orange">20.00（人民币）</span></p> 
      <p class="fct mt20"><a href="http://yun.bianyue.cn/lixian"><el-button type="primary" ><span class="pad f16 white">马上盘它</span></el-button></a></p>
    </div>
    <div class="bg" v-if="month==3">
      <p class="f18 gray">订单套餐：<span class="orange">VIP（4个月）+1TB</span></p>
      <p class="f18 gray mt10">订单金额：<span class="orange">50.00（人民币）</span></p> 
      <p class="fct mt20"><a href="http://yun.bianyue.cn/lixian"><el-button type="primary" ><span class="pad f16 white">马上盘它</span></el-button></a></p>
    </div>
    <div class="bg" v-if="month==6">
      <p class="f18 gray">订单套餐：<span class="orange">VIP（9个月）+3TB</span></p>
      <p class="f18 gray mt10">订单金额：<span class="orange">100.00（人民币）</span></p> 
      <p class="fct mt20"><a href="http://yun.bianyue.cn/lixian"><el-button type="primary" ><span class="pad f16 white">马上盘它</span></el-button></a></p>
    </div>
    <div class="bg" v-if="month==12">
      <p class="f18 gray">订单套餐：<span class="orange">VIP（18个月）+6TB</span></p>
      <p class="f18 gray mt10">订单金额：<span class="orange">180.00（人民币）</span></p> 
      <p class="fct mt20"><a href="http://yun.bianyue.cn/lixian"><el-button type="primary" ><span class="pad f16 white">马上盘它</span></el-button></a></p>
    </div> 
    <p class="fct f16">
      <a target="_blank" href="record?type=pay" class="blue">查看消费记录</a><span class="blue f12 pad6">|</span><a target="_blank" href="http://help.bianyue.cn/zzfw/14.html" class="blue">查看支付帮助</a>
    </p>
    <p class="fct f16 mt15">如有问题请在<a target="_blank" href="http://help.bianyue.cn/index.html" class="blue">帮助中心</a>反馈</p>
  </div>
</div>
</template>
<script>
export default {
  name: 'Success',
  data () {
    return {
      month:1
    }
  }, 
  created() {
    document.getElementsByTagName("title")[0].innerHTML = '充值成功_边乐云';
    this.month=this.$router.currentRoute.query.month; 
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay_success { width:321px; margin:40px auto 0;  }
.pay_success dt { margin:0 30px 0 35px; }
.pay_success .bg { width:321px; height:238px; margin:26px 0 45px; padding-top:36px; background:url(../assets/bg1.svg); box-sizing:border-box; }
.pay_success .bg p.f18 { height:50px; padding-left:45px;  line-height:50px;  }
</style>