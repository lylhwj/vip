<template>
  <div>
    <form action="//api.bianyue.cn/user/paycheck" method="POST" id="pay-form" style="width:800px;">
      <input type="hidden" :value="vipData.price" name="info[price]">
      <input type="hidden" :value="vipData.pay_type" name="pay_type">
      <input type="hidden" :value="vipData.id" name="pid">
      <input type="hidden" :value="1" name="dosubmit">
    </form>
    <form action="//api.bianyue.cn/bankpay.php/" method="GET" id="vip-bank-form" style="width:800px;">
      <input type="hidden" value="index_addvip" name="t">
      <input type="hidden" :value="vipData.id" name="pid">
      <input type="hidden" :value="vipData.price" name="price">
    </form> 
    <form action="//api.bianyue.cn/bankpay.php/" method="GET" id="point-bank-form" style="width:800px;">
      <input type="hidden" value="index" name="t">
      <input type="hidden" :value="vipData.price" name="price">
      <input type="hidden" :value="vipData.id" name="pid">
    </form>
  </div>
</template>

<script>
  export default {
    name: 'ContinuePay',
    data() {
      return {
        vipData: {
          price: '',
          pay_type: '',
          id: '',
        }
      }
    },
    mounted() {
      document.getElementsByTagName("body")[0].className = 'scrollx-hidden';
      if (this.$router.currentRoute.query.id) {
        this.vipData = Object.assign(this.vipData, this.$router.currentRoute.query); 
        if (this.vipData.pay_type == 3) {
          this.vipData.pay_type = 5;
        } else if (this.vipData.pay_type == 2) {
          this.vipData.pay_type = 4;
        } else if (this.vipData.pay_type == 4&&this.vipData.payment.indexOf('微信')!==-1) {
          this.vipData.pay_type = 5;
        }
        setTimeout(() => {
          $("#pay-form").submit();
        }, 0);
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
