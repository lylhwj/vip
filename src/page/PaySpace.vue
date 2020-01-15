<template>
  <div>
    <form action="//api.bianyue.cn/user/paycheck/" method="POST" id="vip-form" style="width:800px;">
      <input type="hidden" :value="spaceData.price" name="info[price]">
      <input type="hidden" :value="spaceData.pay_type" name="pay_type">
      <input type="hidden" :value="1" name="dosubmit">
      <div class="fct vp_event">
        <div class="box">
          <p class="month" v-if="spaceData.price=='50'">1T空间卡</p>
          <p class="month" v-if="spaceData.price=='80'">2T空间卡</p>
          <p class="month" v-if="spaceData.price=='100'">3T空间卡</p>
          <p class="price">
            <strong>{{spaceData.price}}
              <i>元</i>
            </strong>
          </p>
          <p class="fct" v-if="spaceData.price=='50'">快速扩容1TB永久空间</p>
          <p class="fct" v-if="spaceData.price=='80'">快速扩容2TB永久空间</p>
          <p class="fct" v-if="spaceData.price=='100'">快速扩容3TB永久空间</p>
        </div>
        <div> 
          <el-checkbox v-model="checkbox"><a target="_blank" href="http://vip.bianyue.cn/Agreementuser">同意服务条款</a></el-checkbox> 
        </div>
      </div>
      <div class="vp_cont" style="padding-top:30px;">
        <dl class="pay_select">
          <dt>支付方式：</dt>
          <dd>
            <ul class="bank_list">
              <li :class="{hover:spaceData.pay_type==9}" @click="payMethod(9)">
                <input type="radio" id="js_payment_sel_weixin">
                <label for="js_payment_sel_weixin">
                  <i class="pay_ipt ipt_weixin"></i>
                  <b>微信支付</b>
                </label>
                <i class="check"></i>
              </li>
              <li :class="{hover:spaceData.pay_type==8}" @click="payMethod(8)">
                <input type="radio" id="js_payment_sel_ali">
                <label for="js_payment_sel_ali">
                  <i class="pay_ipt ipt_alipay"></i>
                  <b>支付宝</b>
                </label>
                <i class="check"></i>
              </li>
              <!-- <li :class="{hover:spaceData.pay_type==13}" @click="payMethod(13)">
                <input type="radio" id="js_payment_sel_union">
                <label for="js_payment_sel_union">
                  <i class="pay_ipt ipt_unionpay"></i>
                  <b>中国银联</b>
                </label>
                <i class="check"></i>
              </li> -->
            </ul>
            <!-- 支付平台 -->
          </dd>
        </dl>
        <!-- 支付方式 -->
        <dl class="pay_select">
          <dt>应付金额：</dt>
          <dd>
            <div class="pay_account">
              <strong>{{spaceData.price}}.00</strong>元
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
      <input type="hidden" :value="spaceData.price" name="price">
      <input type="hidden" :value="spaceData.pay_type" name="pay_type">
    </form>
  </div>
</template>

<script>
  export default {
    name: 'PaySpace',
    data() {
      return {
        payMsg: '立即支付',
        checkbox: true,
        spaceData: {
          space: 1,
          price: 50,
          pay_type: 9
        }
      }
    }, 
    methods: {
      payMethod(pay_type) {
        if (pay_type == 13) {
          this.payMsg = '选择银行支付';
        } else {
          this.payMsg = '立即支付';
        }
        this.spaceData.pay_type = pay_type;
      },
      pay() {
        if (!this.checkbox) {
          layer.msg('请您同意服务条款~',{icon:7});
          return false;
        }
        if (this.spaceData.pay_type == 13) { //银行支付
          $('#bank-form').submit();
          return false;
        } else { //微信支付宝支付
          $('#vip-form').submit();
        }
      } 
    }, 
    mounted() {   
      if (this.$router.currentRoute.query.price) {
        this.spaceData = Object.assign(this.spaceData, this.$router.currentRoute.query);
        switch (this.spaceData.price) {
          case '50':this.spaceData.space=1;break;
          case '80':this.spaceData.space=2;break;
          case '100':this.spaceData.space=3;break;
          default:break;
        } 
      } 
      document.getElementsByTagName("body")[0].className = 'scrollx-hidden'; 
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
