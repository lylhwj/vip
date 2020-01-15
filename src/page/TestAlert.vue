<template>
<div>
 <div id="aa" >
        <!-- <div class="fct">
          <h3 class="mt30 fn f20"><img class="vmid" width="30" src="@/assets/icon_weixin@2x.png" alt=""> 使用微信扫码付款</h3>
          <div class="mt20 mb20 f16">购买VIP会员：<span class="f20 orange">12个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">100元</span></div>
          <span class="diin border pad15"><img width="180" src="@/assets/login/gen.jpg" alt=""></span>
          <p class="fct red mt10 mb20">（支付过程请勿关闭浏览器）</p>
          <a href="javascript:;" class="button btn_gray btn_large"><span>返回</span></a>
        </div>微信支付 -->
        <!-- <div class="fct bank_box">
          <h3 class="mt30 fn f20">使用网银支付</h3>
          <div class="mt20 mb20 f16">购买VIP会员：<span class="f20 orange">12个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">100元</span></div>
          <ul class="ui-list-icons ui-four-icons fn-clear cashier-bank" id="J-chooseBankList">
            <li>
              <input type="radio" name="WIDdefaultbank" id="ICBCB2C" value="ICBCB2C" checked="checked">
              <label class="icon-box limited-coupon current" for="ICBCB2C">
                <span class="icon ICBC" title="中国工商银行"></span>
                <span class="bank-name">中国工商银行</span><b class="dagou" style="display:block;">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="CCB" value="CCB">
              <label class="icon-box limited-coupon " for="CCB">
                <span class="icon CCB" title="中国建设银行"></span>
                <span class="bank-name">中国建设银行</span><b class="dagou">√ </b>
              </label>
            </li>  
            <li>
              <input type="radio" name="WIDdefaultbank" id="ABC" value="ABC">
              <label class="icon-box limited-coupon " for="ABC">
                <span class="icon ABC" title="中国农业银行"></span>
                <span class="bank-name">中国农业银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="CMB" value="CMB">
              <label class="icon-box limited-coupon " for="CMB">
                <span class="icon CMB" title="招商银行"></span>
                <span class="bank-name">招商银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="BOCB2C" value="BOCB2C">
              <label class="icon-box limited-coupon " for="BOCB2C">
                <span class="icon BOC" title="中国银行"></span>
                <span class="bank-name">中国银行</span><b class="dagou">√ </b>
              </label>
            </li> 
            <li>
              <input type="radio" name="WIDdefaultbank" id="POSTGC" value="POSTGC">
              <label class="icon-box limited-coupon " for="POSTGC">
                <span class="icon PSBC" title="中国邮政储蓄银行"></span>
                <span class="bank-name">中国邮政储蓄银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="COMM" value="COMM">
              <label class="icon-box limited-coupon " for="COMM">
                <span class="icon COMM" title="交通银行"></span>
                <span class="bank-name">交通银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="CEB-DEBIT" value="CEB-DEBIT">
              <label class="icon-box limited-coupon " for="CEB-DEBIT">
                <span class="icon CEB" title="中国光大银行"></span>
                <span class="bank-name">中国光大银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="CITIC-DEBIT" value="CITIC-DEBIT">
              <label class="icon-box limited-coupon " for="CITIC-DEBIT">
                <span class="icon CITIC" title="中信银行"></span>
                <span class="bank-name">中信银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="SPDB" value="SPDB">
              <label class="icon-box limited-coupon " for="SPDB">
                <span class="icon SPDB" title="浦发银行"></span>
                <span class="bank-name">浦发银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="CMBC" value="CMBC">
              <label class="icon-box limited-coupon " for="CMBC">
                <span class="icon CMBC" title="中国民生银行"></span>
                <span class="bank-name">中国民生银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="CIB" value="CIB">
              <label class="icon-box limited-coupon " for="CIB">
                <span class="icon CIB" title="兴业银行"></span>
                <span class="bank-name">兴业银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="SPABANK" value="SPABANK">
              <label class="icon-box limited-coupon " for="SPABANK">
                <span class="icon SPABANK" title="平安银行"></span>
                <span class="bank-name">平安银行</span><b class="dagou">√ </b>
              </label>
            </li> 
            <li>
              <input type="radio" name="WIDdefaultbank" id="GDB" value="GDB">
              <label class="icon-box limited-coupon " for="GDB">
                <span class="icon GDB" title="广发银行"></span>
                <span class="bank-name">广发银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="SHRCB" value="SHRCB">
              <label class="icon-box limited-coupon " for="SHRCB">
                <span class="icon SHRCB" title="上海农商银行"></span>
                <span class="bank-name">上海农商银行</span><b class="dagou">√ </b>
              </label>
            </li> 
            <li>
              <input type="radio" name="WIDdefaultbank" id="SHBANK" value="SHBANK">
              <label class="icon-box limited-coupon " for="SHBANK">
                <span class="icon SHBANK" title="上海银行"></span>
                <span class="bank-name">上海银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="NBBANK" value="NBBANK">
              <label class="icon-box limited-coupon " for="NBBANK">
                <span class="icon NBBANK" title="宁波银行"></span>
                <span class="bank-name">宁波银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="HZCBB2C" value="HZCBB2C">
              <label class="icon-box limited-coupon " for="HZCBB2C">
                <span class="icon HZCB" title="杭州银行"></span>
                <span class="bank-name">杭州银行</span><b class="dagou">√ </b>
              </label>
            </li> 
            <li>
              <input type="radio" name="WIDdefaultbank" id="BJBANK" value="BJBANK">
              <label class="icon-box limited-coupon " for="BJBANK">
                <span class="icon BJBANK" title="北京银行"></span>
                <span class="bank-name">北京银行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="BJRCB" value="BJRCB">
              <label class="icon-box limited-coupon " for="BJRCB">
                <span class="icon BJRCB" title="北京农商行"></span>
                <span class="bank-name">北京农商行</span><b class="dagou">√ </b>
              </label>
            </li>
            <li>
              <input type="radio" name="WIDdefaultbank" id="WZCB" value="WZCB">
              <label class="icon-box limited-coupon " for="WZCB">
                <span class="icon WZCB" title="温州银行"></span>
                <span class="bank-name">温州银行</span><b class="dagou">√ </b>
              </label>
            </li>
          </ul>
          <div>
            <a href="javascript:;" class="button btn_gray btn_large"><span>返回</span></a>&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" class="button btn_large"><span>充值</span></a>
          </div>
        </div>网银支付 -->  
        <!-- <div class="fct">
          <h3 class="mt30 fn f20"><img class="vmid" width="30" style="border-radius:50%;" src="@/assets/icon_pay_alipay@2x.png" alt=""> 使用支付宝网页版支付</h3>
          <div class="mt20 mb20 f16">购买VIP会员：<span class="f20 orange">12个月</span>&nbsp;&nbsp;&nbsp;应付金额：<span class="f20 orange">100元</span></div>
          <p class="fct f16" style="margin:80px auto;">支付方式：<span class="blue">支付宝-PC</span></p>
          <div>
            <a href="javascript:;" class="button btn_gray btn_large"><span>返回</span></a>&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" class="button btn_large"><span>确认并支付</span></a>
          </div>
        </div>支付宝支付 -->
        <!-- <div class="pad22">
          <dl class="h_oflow" style="width:550px; margin:110px auto;">
            <dt class="fl"><img class="vmid" width=" " src="@/assets/icon_warning.png" alt=""></dt>
            <dd class="fr" style="width:450px;">
              <p class="f18">请你在新打开的平台支付页面进行支付，支付完成前请不要关闭该窗口</p>
              <p class="f16 mt8 gray">在订单支付完成前请不要关闭此窗口，否则会影响购买。</p>
              <div class="mt30">
                <a href="javascript:;" class="button btn_gray btn_large"><span style="font-size:18px;">选择其它支付平台</span></a>&nbsp;&nbsp;&nbsp;
                <a href="javascript:;" class="button btn_large"><span style="font-size:18px;">已完成支付</span></a>
              </div>              
            </dd>
          </dl>
          <div class="fcr" style="padding-top:60px;">
            <a href="http://yun.bianyue.cn/app/" target="_blank" class="gray f16">去下载边乐云App <span class="orange">支付更便捷</span></a>
          </div>
        </div>提交成功 -->
        <div class="pad22">
          <div class="fct mt30">
            <img class="vmid" width="70" src="@/assets/icon_yes.gif" alt="">
            <p class="mt30 f18">恭喜您，支付成功</p>
          </div>
        </div><!-- 支付成功 -->
 </div>

</div>
</template>
<style>

</style>
<script>
export default {
  name: "Tests",
  data() {
    return {
      tableData: [
        {
          name: "不可思议.HD>720P.国语中字",
          size: "大小:12MB ",
          amount: "文件：1个"
        }
      ]
    };
  },
  mounted() {
  
      layer.open({
        type: 1,
        title: "举报投诉",
        anim: 2,
        area: ["460px", "300px"], //宽高
        content: $("#aa"),
      });  /**/
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
