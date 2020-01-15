<template>
  <div>
    <div v-if="payShow=='1'" style="width:800px;">
      <div class="fct vp_event">
        <div class="box">
          <p class="month">{{vipData.month}}个月</p>
          <p class="price">
            <strong>{{vipData.price}}
              <i>元</i>
            </strong>
          </p>
          <p class="desc" v-if="vipData.month==3">
            <span class="disb fct orange">&nbsp;</span>
            充3个月送1个月
            <br>送1TB永久云下载空间
          </p>
          <p class="desc" v-if="vipData.month==6">
            <span class="disb fct orange">&nbsp;</span>
            充半年送3个月
            <br>送3TB永久云下载空间
          </p>
          <p class="desc" v-if="vipData.month==12">
            <span class="disb fct orange">10个硬币/月</span>
            充一年送半年<br>送6TB永久云下载空间<br>开放所有特权
          </p>
          <p class="desc" v-if="vipData.month==1">选半年或年V更实惠哦<br>月仅10硬币，超大空间<br>更多下载配额及特权！</p>
        </div>
        <div>
          <el-checkbox v-model="checkbox">
            <a target="_blank" href="http://vip.bianyue.cn/Agreementuser">同意服务条款</a>
          </el-checkbox>
        </div>
      </div>
      <div class="vp_cont">
        <div class="box_vip_value"><a href="javascript:;" :class="['price_next',vipData.month==1?'price_prev':'']" @click="scroll"></a>
          <div class="box_vip_value2">
            <ul class="vip_value_cell price_type_select" :style="{left:vipData.month==1?'-182px':'0'}">
              <li>
                <a href="javascript:;" :class="{hover:vipData.month==3}" @click="three">
                  <div class="month">3个月</div>
                  <div class="prices">
                    <strong>¥50</strong>
                    <s>60</s>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:;" :class="{hover:vipData.month==6}" @click="six">
                  <div class="month">6个月</div>
                  <div class="prices">
                    <strong>¥100</strong>
                    <s>120</s>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:;" :class="{hover:vipData.month==12}" @click="twelve">
                  <div class="month">12个月</div>
                  <div class="prices">
                    <strong>¥180</strong>
                    <s>240</s>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:;" :class="{hover:vipData.month==1}" @click="one">
                  <div class="month">1个月</div>
                  <div class="prices">
                    <strong>¥20</strong>
                    <s></s>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 选择套餐 -->
        <dl class="pay_select">
          <dt>支付方式：</dt>
          <dd>
            <ul class="bank_list">
              <li :class="{hover:vipData.payType=='wx'}" @click="payMethod('wx')">
                <input type="radio" id="js_payment_sel_weixin">
                <label for="js_payment_sel_weixin">
                  <i class="pay_ipt ipt_weixin"></i>
                  <b>微信支付</b>
                </label>
                <i class="check"></i>
              </li>
              <li :class="{hover:vipData.payType=='alipay'}" @click="payMethod('alipay')">
                <input type="radio" id="js_payment_sel_ali">
                <label for="js_payment_sel_ali">
                  <i class="pay_ipt ipt_alipay"></i>
                  <b>支付宝</b>
                </label>
                <i class="check"></i>
              </li>
              <!-- <li :class="{hover:vipData.payType=='bank'}" @click="payMethod('bank')">
                <input type="radio" id="js_payment_sel_union">
                <label for="js_payment_sel_union">
                  <i class="pay_ipt ipt_unionpay"></i>
                  <b>中国银联</b>
                </label>
                <i class="check"></i>
              </li> -->
              <li :class="{hover:vipData.payType=='point'}" @click="payMethod('point')">
                <input type="radio" id="js_payment_sel_jifen">
                <label for="js_payment_sel_jifen">
                  <i class="pay_ipt ipt_jifen"></i>
                  <b>积分</b>
                </label>
                <i class="check"></i>
              </li>
            </ul>
            <!-- 支付平台 -->
          </dd>
        </dl>
        <!-- 支付方式 -->
        <dl class="pay_select" v-if="vipData.payType!=='point'">
          <dt>应付金额：</dt>
          <dd>
            <div class="pay_account">
              <strong>{{vipData.price}}.00</strong>元
            </div>
          </dd>
        </dl>
        <dl class="pay_select" v-if="vipData.payType=='point'">
          <dt>当前积分：</dt>
          <dd>
            <div class="pay_account fl">
              <strong>{{userInfo.point||0}}</strong>积分
              <a href="javascript:;" @click="goPayPoint">（积分不足？立即充值）</a>
            </div>
          </dd>
        </dl>
        <dl class="pay_select" v-if="vipData.payType=='point'">
          <dt>应付积分：</dt>
          <dd>
            <div class="pay_account fl">
              <strong>{{vipData.payPoint}}</strong>积分
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
    </div>

    <!-- 微信支付 -->
    <div v-else-if="payShow=='2'" style="width:800px;">
      <div class="fct">
        <h3 class="mt30 fn f20"><img class="vmid" width="30" src="@/assets/icon_weixin@2x.png" alt=""> 使用微信扫码付款</h3>
        <div class="mt20 mb20 f16" v-if="vipData.month==1">购买VIP会员：<span
            class="f20 orange">1个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">20元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==3">购买VIP会员：<span
            class="f20 orange">3+1个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">50元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==6">购买VIP会员：<span
            class="f20 orange">6+3个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">100元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==12">购买VIP会员：<span
            class="f20 orange">12+6个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">180元</span></div>
        <span class="diin border pad15">
          <QRcode :text="qrcode"></QRcode>
        </span>
        <p class="fct red mt10 mb20">（支付过程请勿关闭浏览器）</p>
        <a href="javascript:;" @click="backPay" class="button btn_gray btn_large"><span>返回</span></a>
      </div>
    </div>

    <!-- 支付宝支付 -->
    <div v-else-if="payShow=='3'" style="width:800px;">
      <div class="fct">
        <h3 class="mt30 fn f20"><img class="vmid" width="30" style="border-radius:50%;"
            src="@/assets/icon_pay_alipay@2x.png" alt=""> 使用支付宝网页版支付</h3>
        <div class="mt20 mb20 f16" v-if="vipData.month==1">购买VIP会员：<span
            class="f20 orange">1个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">20元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==3">购买VIP会员：<span
            class="f20 orange">3+1个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">50元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==6">购买VIP会员：<span
            class="f20 orange">6+3个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">100元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==12">购买VIP会员：<span
            class="f20 orange">12+6个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">180元</span></div>
        <p class="fct f16" style="margin:80px auto;">支付方式：<span class="blue">支付宝-PC</span></p>
        <div>
          <a href="javascript:;" @click="backPay"
            class="button btn_gray btn_large"><span>返回</span></a>&nbsp;&nbsp;&nbsp;
          <a href="javascript:;" @click="alipaySubmit" class="button btn_large"><span>确认并支付</span></a>
        </div>
      </div>
    </div>

    <!--网银支付 -->
    <div v-else-if="payShow=='4'" style="width:800px;">
      <div class="fct bank_box">
        <h3 class="mt30 fn f20">使用网银支付</h3>
        <div class="mt20 mb20 f16" v-if="vipData.month==1">购买VIP会员：<span
            class="f20 orange">1个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">20元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==3">购买VIP会员：<span
            class="f20 orange">3+1个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">50元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==6">购买VIP会员：<span
            class="f20 orange">6+3个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">100元</span></div>
        <div class="mt20 mb20 f16" v-else-if="vipData.month==12">购买VIP会员：<span
            class="f20 orange">12+6个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">180元</span></div>
        <ul class="ui-list-icons ui-four-icons fn-clear cashier-bank" id="J-chooseBankList">
          <li v-for="(data,index) in bankData" :key="index">
            <input type="radio" name="WIDdefaultbank" :id="data.value" :value="data.value">
            <label :class="['icon-box','limited-coupon',bankIndex==index?'current':''] " :for="data.value"
              @click="bankIndex=index">
              <span :class="['icon',data.icon]" :title="data.bank"></span>
              <span class="bank-name">{{data.bank}}</span><b class="dagou">√ </b>
            </label>
          </li>

        </ul>
        <div>
          <a href="javascript:;" @click="backPay"
            class="button btn_gray btn_large"><span>返回</span></a>&nbsp;&nbsp;&nbsp;
          <a href="javascript:;" @click="bankSubmit" class="button btn_large"><span>充值</span></a>
        </div>
      </div>
    </div>

    <div v-else-if="payShow=='5'" style="width:800px;">
      <div class="pad22">
        <dl class="h_oflow aa" style="width:550px; margin:110px auto;">
          <dt class="fl"><img class="vmid" width=" " src="@/assets/icon_warning.png" alt=""></dt>
          <dd class="fr" style="width:450px;">
            <p class="f18">请你在新打开的平台支付页面进行支付，支付完成前请不要关闭该窗口</p>
            <p class="f16 mt8 gray">在订单支付完成前请不要关闭此窗口，否则会影响购买。</p>
            <div class="mt30">
              <a href="javascript:;" class="button btn_gray btn_large" @click="backPay"><span
                  style="font-size:18px;">选择其它支付平台</span></a>&nbsp;&nbsp;&nbsp;
              <a href="javascript:;" class="button btn_large" @click="isPaySuccess"><span style="font-size:18px;">已完成支付</span></a>
            </div>
          </dd>
        </dl>
        <div class="fcr" style="padding-top:60px;">
          <a href="http://yun.bianyue.cn/app/" target="_blank" class="gray f16">去下载边乐云App <span
              class="orange">支付更便捷</span></a>
        </div>
      </div>
    </div> 
    <div v-else-if="payShow=='6'" style="width:800px;">
       <div class="pad22">
          <div class="fct mt30">
            <img class="vmid" width="70" src="@/assets/icon_yes.gif" alt="">
            <p class="mt30 f18">恭喜您，支付成功</p>
              <p class="mt30"> 
          <a href="javascript:;" @click="backPay" class="button btn_large"><span>继续充值</span></a></p>
          </div>
        </div>
    </div>
    <div v-else-if="payShow=='7'" style="width:800px;">
      <div class="pad22">
        <dl class="h_oflow aa" style="width:550px; margin:110px auto;">
          <dt class="fl"><img class="vmid" width=" " src="@/assets/icon_warning.png" alt=""></dt>
          <dd class="fr" style="width:450px;">
            <p class="f18 orange">抱歉，系统检测你还未付款！</p>
            <p class="f16 mt8 gray">若订单未支付请重新付款，若实际已支付请稍候等待系统通知</p>
            <div class="mt30"> 
              <a href="javascript:;" class="button btn_large" @click="backPay"><span style="font-size:18px;">重新支付</span></a>
            </div>
          </dd>
        </dl>
        <div class="fcr" style="padding-top:60px;">
          <a href="http://yun.bianyue.cn/app/" target="_blank" class="gray f16">去下载边乐云App <span
              class="orange">支付更便捷</span></a>
        </div>
      </div>
    </div> 
    <form id="JS_alipay_bank_submit" name="JS_alipay_bank_submit"
      action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" method="GET" target="_blank">
      <input type="hidden" v-for="(data,index) in payData" :name="data.name" :value="data.value" :key="index" />
      <input type='submit' value='ok' style='display:none;'>
    </form>
  </div>
</template>
<script>
import api from "@/api/index.js";
import QRcode from "@/components/QRcode.vue";
export default {
  name: "Pay",
  data() {
    return {
      payMsg: "立即支付",
      checkbox: true,
      vipData: {
        month: 12,
        shopKey: "oneYears",
        price: 180,
        payType: "wx",
        payPoint: 1800
      },
      payShow: 1,
      qrcode: "",
      payData: [],
      bankData: [
        {
          bank: "中国工商银行",
          value: "ICBCB2C",
          icon: "ICBC"
        },
        {
          bank: "中国建设银行",
          value: "CCB",
          icon: "CCB"
        },
        {
          bank: "中国农业银行",
          value: "ABC",
          icon: "ABC"
        },
        {
          bank: "招商银行",
          value: "CMB",
          icon: "CMB"
        },
        {
          bank: "中国银行",
          value: "BOCB2C",
          icon: "BOC"
        },
        {
          bank: "中国邮政储蓄银行",
          value: "POSTGC",
          icon: "PSBC"
        },
        {
          bank: "交通银行",
          value: "COMM",
          icon: "COMM"
        },
        {
          bank: "中国光大银行",
          value: "CEB-DEBIT",
          icon: "CEB"
        },
        {
          bank: "中信银行",
          value: "CITIC-DEBIT",
          icon: "CITIC"
        },
        {
          bank: "浦发银行",
          value: "SPDB",
          icon: "SPDB"
        },
        {
          bank: "中国民生银行",
          value: "CMBC",
          icon: "CMBC"
        },
        {
          bank: "兴业银行",
          value: "CIB",
          icon: "CIB"
        },
        {
          bank: "平安银行",
          value: "SPABANK",
          icon: "SPABANK"
        },
        {
          bank: "广发银行",
          value: "GDB",
          icon: "GDB"
        },
        {
          bank: "上海农商银行",
          value: "SHRCB",
          icon: "SHRCB"
        },
        {
          bank: "上海银行",
          value: "SHBANK",
          icon: "SHBANK"
        },
        {
          bank: "宁波银行",
          value: "NBBANK",
          icon: "NBBANK"
        },
        {
          bank: "杭州银行",
          value: "HZCBB2C",
          icon: "HZCB"
        },
        {
          bank: "北京银行",
          value: "BJBANK",
          icon: "BJBANK"
        },
        {
          bank: "北京农商行",
          value: "BJRCB",
          icon: "BJRCB"
        },
        {
          bank: "温州银行",
          value: "WZCB",
          icon: "WZCB"
        }
      ],
      bankIndex: 0,
      order_sn: "",
      paySetInterval: null
    };
  },
  components: {
    QRcode: QRcode
  },
  props: ["data"],
  methods: {
    scroll() {
      let $next = $(".price_next");
      let $select = $(".price_type_select");
      if ($next.is(".price_prev")) {
        $select.animate({
          left: "0"
        });
        $next.removeClass("price_prev");
      } else {
        $select.animate({
          left: "-182px"
        });
        $next.addClass("price_prev");
      }
    },
    twelve() {
      this.vipData.month = 12;
      this.vipData.shopKey = "oneYears";
      this.vipData.price = 180;
      this.vipData.payPoint = 1800;
    },
    six() {
      this.vipData.month = 6;
      this.vipData.shopKey = "sixMonths";
      this.vipData.price = 100;
      this.vipData.payPoint = 1000;
    },
    three() {
      this.vipData.month = 3;
      this.vipData.shopKey = "threeMonths";
      this.vipData.price = 50;
      this.vipData.payPoint = 500;
    },
    one() {
      this.vipData.month = 1;
      this.vipData.shopKey = "oneMonths";
      this.vipData.price = 20;
      this.vipData.payPoint = 200;
    },
    payMethod(payType) {
      if (payType == "bank") {
        this.payMsg = "选择银行支付";
      } else {
        this.payMsg = "立即支付";
      }
      this.vipData.payType = payType;
    },
    backPay() {
      this.payShow = 1;
      clearInterval(this.paySetInterval);
    },
    pay() {
      if (!this.userInfo.userid) {
        layer.msg("请先登录~", {
          icon: 7
        });
        return false;
      }
      if (!this.checkbox) {
        layer.msg("请您同意服务条款~", {
          icon: 7
        });
        return false;
      }
      if (this.vipData.payType == "wx") {
        // 微信支付
        api
          .wxPay({
            shopKey: this.vipData.shopKey
          })
          .then(response => {
            this.qrcode = response.data.order.code_url;
            this.order_sn = response.data.order_sn;
            this.payShow = 2;
            this.paySetInterval = setInterval(() => {
              api
                .isPaySuccess(
                  {
                    orderId: this.order_sn
                  },
                  {
                    failureCallback: () => {
                      clearInterval(this.paySetInterval);
                    }
                  }
                )
                .then(data => {
                  if (data.data.status == "succ") { 
                    clearInterval(this.paySetInterval);
                    layer.closeAll();
                    this.jump(`/vip/success?pay=success&month=${this.vipData.month}`);
                  }
                });
            }, 3000);
          });
      } else if (this.vipData.payType == "alipay") {
        this.payShow = 3;
        // 支付宝支付
        api
          .alipay({
            shopKey: this.vipData.shopKey,
            responseRaw: 1,
            return_url: `${process.env.DEVURL}vip/success?pay=success&month=${this.vipData.month}` 
          })
          .then(response => {
            let data = response.data.form;
            this.order_sn = response.data.order_sn;
            this.payData = [];
            for (const key in data) {
              this.payData.push({
                name: key,
                value: data[key]
              });
            }
          });
      } else if (this.vipData.payType == "bank") {
        //银行支付
        this.payShow = 4;
      } else if (this.vipData.payType == "point") {
        //积分支付
        this.GET({
          api: `/user.php?op=info&action=vip&viptime=${this.vipData.month}`,
          success: data => {
            this.getUser({});
            layer.msg("兑换成功~", {
              time: 2000,
              icon: 1
            });
            setTimeout(() => {
              layer.closeAll();
            }, 2000);
          }
        });
      }
    },
    alipaySubmit() {
      $("#JS_alipay_bank_submit").submit();
      this.payShow = 5;
    },
    bankSubmit() {
      let defaultBank = this.bankData[this.bankIndex].value; 
      api
        .alipay({
          shopKey: this.vipData.shopKey,
          responseRaw: 1,
          defaultBank: defaultBank,
          return_url: `${process.env.DEVURL}vip/success?pay=success&month=${this.vipData.month}` 
        })
        .then(response => {
          let data = response.data.form;
          this.order_sn = response.data.order_sn;
          this.payData = [];
          for (const key in data) {
            this.payData.push({
              name: key,
              value: data[key]
            });
          }
          setTimeout(() => {
            $("#JS_alipay_bank_submit").submit(); 
          }, 1000);
          this.payShow = 5;
        });
    },
    isPaySuccess() {
      api
        .isPaySuccess(
          {
            orderId: this.order_sn
          },
          {
            failureCallback: () => {
              clearInterval(this.paySetInterval);
            }
          }
        )
        .then(data => {
          if (data.data.status == "succ") {
            layer.closeAll();
            this.jump(`/vip/success?pay=success&month=${this.vipData.month}`);
          } else {
            this.payShow = 7;
          }
        });
    },
    goPayPoint(){
      layer.closeAll();
      this.jump('/vip/point')
    }
  },
  destroyed() {
    clearInterval(this.paySetInterval);
  },
  mounted() {
    this.vipData = Object.assign(this.vipData, this.data);
    switch (this.vipData.month) {
      case 1:
        this.vipData.shopKey = "oneMonths";
        break;
      case 3:
        this.vipData.shopKey = "threeMonths";
        break;
      case 6:
        this.vipData.shopKey = "sixMonths";
        break;
      case 12:
        this.vipData.shopKey = "oneYears";
        break;
      default:
        break;
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box_vip_value {
  position: relative;
  width: 600px;
  overflow: hidden;
  padding-left: 16px;
}

.box_vip_value2 {
  position: relative;
  width: 544px;
  height: 70px;
  overflow: hidden;
}

.box_vip_value2 .vip_value_cell {
  position: relative;
  width: 1000px;
  margin-left: 0px;
}

.box_vip_value2 .vip_value_cell li {
  margin-bottom: 20px;
  width: 172px;
}

.price_next,
.price_prev {
  display: inline-block;
  position: absolute;
  top: 15px;
  right: 25px;
  width: 8px;
  height: 21px;
  background: url(../assets/icon_arrow.svg)-9px -120px;
  cursor: pointer;
}

.price_prev {
  background-position: 0 -120px;
}

.price_next:hover,
.price_prev:hover {
  background-position-y: -142px;
}

#J-chooseBankList .current .dagou {
  display: block;
}
</style>
