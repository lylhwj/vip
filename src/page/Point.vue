<template>
  <div class="view_scorll">
    <div class="border_b title_line">
      我的积分：
      <span class="orange f26 fd">{{userInfo.point||0}}</span>积分
      <a href="javascript:;" style="position:relative;margin-left:30px;bottom:5px;" class="button btn_stroke w100 mr10" @click="openPay(12,180,1800)">
         <span class=" f26">积分兑换VIP</span>
      </a>
      <p class="fr help_txt">
      <el-tooltip class="item" effect="dark" placement="left-start">
      <div slot="content">积分可用于购买边乐网的各类增值服务。<br>积分使用时可一次充值，多次使用，<br>摆脱复杂的充值流程。</div>
         <a href="javascript:;" class="blue">什么是积分？</a>
      </el-tooltip>
      </p>
    </div>
    <dl class="dl_list">
      <dt class="dt_high">充值个数：</dt>
      <dd>
        <ul class="fct sel_list">
          <li :class="{hover:tabIndex==0}" @click="toUp(0,180)">
            <span>1800积分</span>
            <i></i>
          </li>
          <li :class="{hover:tabIndex==1}" @click="toUp(1,100)">
            <span>1000积分</span>
            <i></i>
          </li>
          <li :class="{hover:tabIndex==2}" @click="toUp(2,50)">
            <span>500积分</span>
            <i></i>
          </li>
          <li :class="{hover:tabIndex==3}" @click="toUp(3,20)">
            <span>200积分</span>
            <i></i>
          </li>
          <li :class="{hover:tabIndex==4}" @click="toUp(4,'other')">
            <div class="fl">
              <input type="text" class="text" v-model="otherCount" @change="otherPoint">
              <span class="fl f14">x200积分</span>
            </div>
            <i></i>
          </li>
        </ul>
      </dd>
    </dl>
    <!-- <dl class="dl_list"> <dt>到账积分：</dt><dd><div class="pay_account">
          <span v-if="parseInt(price)>=180">
            <strong>{{price*20}}</strong>积分（双倍充值活动送<span class="red">{{price*10}}</span>积分）
          </span>
          <span v-else>
            <strong>{{price*10}}</strong>积分
          </span>
        </div></dd></dl> -->
    <dl class="dl_list">
      <dt>应付金额：</dt>
      <dd>
        <div class="pay_account">
          <strong>{{price}}</strong>元
        </div>
      </dd>
    </dl>
    <!-- 应付金额 -->
    <dl class="dl_list">
      <dt>&nbsp;</dt>
      <dd class="button-row">
        <a href="javascript:;" class="button btn_large btn_jifen_pay" @click="open">
          <span>立即充值</span>
        </a>
      </dd>
    </dl>
    <!-- 立即支付 -->
    <div id="JS_go_pay2" class="disn">
      <Pay v-if="isAlert" :data="payData"></Pay>
      <div style="height:560px;" v-else></div>
    </div>
  </div>
  <!-- 滚动部分 -->
</template>

<script>
import Header from "@/components/Header.vue";
import Left from "@/components/Left.vue";
import Pay from "@/components/Pay.vue";
export default {
  name: "Point",
  data() {
    return {
      tabIndex: 1,
      price: 100,
      otherCount: 10,
      isAlert:false,
      payData:{}
    };
  },
  components: {
    Header: Header,
    Left: Left,
    Pay:Pay
  },
  methods: {
    toUp(type, price) {
      this.tabIndex = type;
      if (price == "other") {
        this.price = this.otherCount * 20;
        return false;
      }
      this.price = price;
    },
    otherPoint() {
      if (!/^[0-9]*[1-9][0-9]*$/.test(String(this.otherCount))) {
        layer.msg("请输入正整数~", { icon: 2 });
        this.otherCount = 10;
      }
      this.price = this.otherCount * 20;
    },
    open() {
      let userid = this.userInfo.userid || "no";
      layer.open({
        type: 2,
        anim: 2,
        title: "积分充值",
        area: ["820px", "560px"], //宽高
        content: [
          `${process.env.DEVURL}payPoint?price=${
            this.price
          }&pay_type=5&userid=${userid}`,
          "no"
        ]
      });
    },
    openPay(month, price, payPoint) {
      this.payData.month = month;
      this.payData.price = price;
      this.payData.payPoint = payPoint;
      this.payData.payType = "point";
      // //打开支付窗口
      this.isAlert = true;
      layer.open({
        type: 1,
        title: "账户充值",
        anim: 2,
        area: ["820px", "560px"], //宽高
        content: $("#JS_go_pay2"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    }
  },
  created() {
    document.getElementsByTagName("title")[0].innerHTML = "积分充值_边乐云";
    this.getUser({});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
