<template>
  <div>
    <form action="//api.bianyue.cn/user/paycheck/" method="POST" id="point-form" style="width:800px;">
      <input type="hidden" value="1" name="dosubmit">
      <input type="hidden" :value="pointData.price" name="info[price]"> 
      <input type="hidden" :value="pointData.pay_type" name="pay_type"> 
      <div class="fct vp_event">
        <div class="box">
          <span class="mt30 mb20 icon_jifen"></span>
          <p class="f20">积分充值</p>
        </div>
        <div>
            <el-checkbox v-model="checkbox"><a target="_blank" href="http://vip.bianyue.cn/Agreementuser">同意服务条款</a></el-checkbox> 
        </div>
      </div>
      <div class="vp_cont">
        <dl class="pay_select">
          <dt>充值个数：</dt>
          <!-- <dd class="line40 f20">{{pointData.price*10}}积分 <span class="red" v-if="parseInt(pointData.price)>=180">+{{pointData.price*10}}积分</span></dd> -->
          <dd class="line40 f20">{{pointData.price*10}}积分</dd>
       </dl>
        <dl class="pay_select">
          <dt>支付方式：</dt>
          <dd>
              <ul class="bank_list">
                <li :class="{hover:pointData.pay_type==5}" @click="payMethod(5)">
                  <input type="radio" id="js_payment_sel_weixin">
                  <label for="js_payment_sel_weixin">
                    <i class="pay_ipt ipt_weixin"></i>
                    <b>微信支付</b>
                  </label>
                  <i class="check"></i>
                </li>
                <li :class="{hover:pointData.pay_type==4}" @click="payMethod(4)">
                  <input type="radio" id="js_payment_sel_ali">
                  <label for="js_payment_sel_ali">
                    <i class="pay_ipt ipt_alipay"></i>
                    <b>支付宝</b>
                  </label>
                  <i class="check"></i>
                </li>
                <!-- <li :class="{hover:pointData.pay_type==11}" @click="payMethod(11)">
                  <input type="radio" id="js_payment_sel_union">
                  <label for="js_payment_sel_union">
                    <i class="pay_ipt ipt_unionpay"></i>
                    <b>中国银联</b>
                  </label>
                  <i class="check"></i>
                </li> -->
              </ul><!-- 支付平台 -->
          </dd>
        </dl>
        <!-- 支付方式 -->
        <dl class="pay_select">
          <dt>应付金额：</dt>
          <dd>
            <div class="pay_account">
              <strong>{{pointData.price}}.00</strong>元
            </div>
          </dd>
        </dl>
        <!-- 应付金额 -->
        <dl class="pay_select">
          <dt>&nbsp;</dt>
          <dd class="button-row">
            <a href="javascript:;" class="button btn_large" @click="pay">
              <span>{{payMsg}}</span>
            </a>
          </dd>
        </dl>
        <!-- 立即支付 -->
      </div>
    </form>
    <form action="//api.bianyue.cn/bankpay.php/" method="GET" id="bank-form" style="width:800px;">
      <input type="hidden" value="index" name="t">
      <input type="hidden" :value="pointData.price" name="price"> 
      <input type="hidden" :value="pointData.pay_type" name="pay_type"> 
    </form>
  </div>
</template>

<script>
  export default {
    name: 'PayPoint',
    data() {
      return {
        payMsg: '立即支付',
        checkbox: true,
        pointData: {
          pay_type: 5,
          price: 0
        },
        loginStatus:false
      }
    },
    methods: {
      payMethod(pay_type) { 
        if (pay_type == 11) {
          this.payMsg = '选择银行支付';
        } else {
          this.payMsg = '立即支付';
        }
        this.pointData.pay_type = pay_type;
      },
      pay() {  
        if(this.loginStatus){
          layer.msg('请先登录~',{icon:7});
          return false;
        }
        if (!this.checkbox) {
          layer.msg('请您同意服务条款~',{icon:7});
          return false;
        }
        if (this.pointData.pay_type == 11) {
          $('#bank-form').submit();
          return false;
        }
        $('#point-form').submit();
      }
    },
    mounted() { 
      if (this.$router.currentRoute.query.price) {
        this.pointData = Object.assign(this.pointData, this.$router.currentRoute.query); 
      }   
      if(this.$router.currentRoute.query.userid=='no'){
        this.loginStatus=true;
      }
      document.getElementsByTagName("body")[0].className='scrollx-hidden'; 
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
