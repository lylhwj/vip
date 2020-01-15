<template>
  <div class="view_scorll">
    <div class="vip_type_bg" v-if="userInfo.vip==0||!userInfo.vip">
      <div class="type_bg">
        <div class="deban_con"></div>
      </div>
    </div>
    <!-- 非会员 -->
    <div class="vip_type_bg vip_type_free" v-else-if="userInfo.vipcart_type==3">
      <div class="type_bg"></div>
      <div class="vip_cart_bg">
        <div>
          <p class="bancen_name">VIP极速下载</p>
          <p class="bancen_time">体验剩余：<span id="_m"></span><span id="_s"></span></p>
        </div>
      </div>
    </div>
    <div class="vip_type_bg vip_type_year" v-else-if="userInfo.vipcart_type==2">
      <div class="type_bg"></div>
      <div class="vip_cart_bg">
        <div>
          <p class="bancen_name">年VIP</p>
          <p class="bancen_time">{{userInfo.overduedate*1000,2|timeStamp}}过期</p>
        </div>
      </div>
    </div>
    <!-- 年VIP -->
    <div class="vip_type_bg vip_type_month" v-else-if="userInfo.vipcart_type==1">
      <div class="type_bg"></div>
      <div class="vip_cart_bg">
        <div>
          <p class="bancen_name">月VIP</p>
          <p class="bancen_time">{{userInfo.overduedate*1000,2|timeStamp}}过期</p>
        </div>
      </div>
    </div>
    <!-- 月VIP -->
    <div class="vip_type_bg vip_type_old" v-else-if="userInfo.vip==2">
      <div class="type_bg"></div>
      <div class="vip_cart_bg">
        <div>
          <p class="bancen_name">会员</p>
          <p class="bancen_time">{{userInfo.overduedate*1000,2|timeStamp}}过期</p>
        </div>
      </div>
    </div>
    <!-- 老会员 -->

    <div class="view_auto">
      <div class="vip_flow">
        <i>1.选择套餐</i>
        <i>2.在线支付</i>
        <i>3.成为VIP</i>
      </div>
      <div class="rel m_auto box_vip"><a class="vip_next hover" @click.prevent="scroll"></a>
        <div class="box_vip2">
          <ul class="fct m_auto vip_type_select">
            <li @click="openPay(3,50,500)">
              <i class="vip_sale"><span>特惠</span></i>
              <i class="svip">送1个月</i>
              <p class="vip_time">3个月</p>
              <p class="mline">¥60</p>
              <p class="price"><strong>50<i>元</i></strong></p>
              <p class="price_month"></p>
              <p class="desc">充3个月送1个月<br>送1TB永久云下载空间</p>
              <div class="but_submit"><a href="javascript:;"
                  class="button btn_linear_orange btn_vip_pay"><span>立即开通</span></a></div>
            </li>
            <li @click="openPay(6,100,1000)">
              <i class="vip_sale"><span>特惠</span></i>
              <i class="svip svip_year_half">送3个月</i>
              <p class="vip_time">6个月</p>
              <p class="mline">¥120</p>
              <p class="price"><strong>100<i>元</i></strong></p>
              <p class="price_month"></p>
              <p class="desc">充半年送3个月<br>送3TB永久云下载空间</p>
              <div class="but_submit"><a href="javascript:;"
                  class="button btn_linear_orange btn_vip_pay"><span>立即开通</span></a></div>
            </li>
            <li @click="openPay(12,180,1800)">
              <i class="vip_sale"><span>特惠</span></i>
              <i class="svip svip_year">送6个月</i>
              <p class="vip_time">12个月</p>
              <p class="mline">¥240</p>
              <p class="price"><strong>180<i>元</i></strong></p>
              <p class="price_month">10个硬币/月</p>
              <p class="desc">充一年送半年<br>送6TB永久云下载空间<br>开放所有特权</p>
              <div class="but_submit"><a href="javascript:;"
                  class="button btn_linear_orange btn_vip_pay"><span>立即开通</span></a></div>
            </li>
            <li @click="openPay(1,20,200)">
              <i class="svip">VIP/月</i>
              <p class="vip_time">1个月</p>
              <p class="mline"></p>
              <p class="price"><strong>20<i>元</i></strong></p>
              <p class="price_month"></p>
              <p class="desc">选半年或年V更实惠哦<br>月仅10硬币，超大空间<br>更多下载配额及特权！</p>
              <div class="but_submit"><a href="javascript:;"
                  class="button btn_linear_orange btn_vip_pay"><span>立即开通</span></a></div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择套餐 -->
      <div class="clear"></div>
      <div class="fct m_auto vip_pri_box">
        <div class="line_title">
          <strong>VIP特权</strong>
        </div>
        <table>
          <thead>
            <tr>
              <th class="th_function">功能</th>
              <th>3个月/<span class="orange">¥50</span></th>
              <th>6个月/<span class="orange">¥100</span></th>
              <th>12个月/<span class="orange">¥180</span></th>
              <th>1个月/<span class="orange">¥20</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <i class="vip_pri pri_1"></i>
                <strong>云下载空间</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>开通年费VIP服务即可享有超大存储空间</p>
                </div>
              </th>
              <td>
                <p class="txt_up">每续费一次送<br>1TB永久云下载空间</p>
              </td>
              <td>
                <p class="txt_up">每续费一次送<br>3TB永久云下载空间</p>
              </td>
              <td>
                <p class="txt_up">每续费一次送<br>6TB永久云下载空间</p>
              </td>
              <td>500GB</td>
            </tr>
            <tr>
              <th>
                <i class="vip_pri pri_8"></i>
                <strong>文件空间</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>开通年费VIP服务即可享有超大存储空间</p>
                </div>
              </th>
              <td>5GB</td>
              <td>5GB</td>
              <td>50GB</td>
              <td>5GB</td>
            </tr>
            <tr>
              <th>
                <i class="vip_pri pri_2"></i>
                <strong>大文件上传</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>开通VIP即可享有大文件上传的特权</p>
                </div>
              </th>
              <td>1GB</td>
              <td>1GB</td>
              <td>5GB</td>
              <td>1GB</td>
            </tr>
            <tr>
              <th>
                <i class="vip_pri pri_3"></i>
                <strong>传输速度</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>开通VIP服务即可享有专属下载通道，
                    <br>提高下载速度</p>
                </div>
              </th>
              <td>极速传输</td>
              <td>极速传输</td>
              <td>光速传输</td>
              <td>普通传输</td>
            </tr>
            <tr>
              <th>
                <i class="vip_pri pri_4"></i>
                <strong>在线预览</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>开通VIP服务即可在线预览已经备份的文档和视频</p>
                </div>
              </th>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
            </tr>
            <tr>
              <th>
                <i class="vip_pri pri_5"></i>
                <strong>批量上传下载</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>尊享批量添加链接任务，批量上下载</p>
                </div>
              </th>
              <td>
                <i class="f30 gray el-icon-close"></i>
              </td>
              <td>
                <i class="f30 gray el-icon-close"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 gray el-icon-close"></i>
              </td>
            </tr>
            <tr>
              <th>
                <i class="vip_pri pri_6"></i>
                <strong>视频高速通道</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>高清视频极速加载，流畅云播爽翻天</p>
                </div>
              </th>
              <td>
                <i class="f30 gray el-icon-close"></i>
              </td>
              <td>
                <i class="f30 gray el-icon-close"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 gray el-icon-close"></i>
              </td>
            </tr>
            <tr>
              <th>
                <i class="vip_pri pri_7"></i>
                <strong>尊贵身份标识</strong>
                <div class="tip_help">
                  <i class="el-icon-question f20 orange"></i>
                  <p>开通VIP服务既显示尊贵会员身份标识，
                    <br>彰显尊贵身份!</p>
                </div>
              </th>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
              <td>
                <i class="f30 green el-icon-check"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- VIP特权 -->
    </div>
    <div id="JS_go_pay" class="disn">
      <Pay v-if="isAlert" :data="data"></Pay>
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
    name: "VipIndex",
    data() {
      return {
        isAlert: false,
        data: {}
      };
    },
    components: {
      Header: Header,
      Left: Left,
      Pay: Pay
    },
    methods: {
      scroll() {
        let $next = $(".vip_next");
        let $select = $(".vip_type_select");
        if ($next.is(".vip_prev")) {
          $select.animate({
            left: "0"
          });
          $next.removeClass("vip_prev");
        } else {
          $select.animate({
            left: "-360px"
          });
          $next.addClass("vip_prev");
        }
      },
      myTimeDown(time) {
        if (time <= 0) {
          document.getElementById("_m").innerHTML = "00分";
          document.getElementById("_s").innerHTML = "00秒";
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          return false;
        }
        let d = Math.floor(time / 1000 / 60 / 60 / 24);
        let h = Math.floor((time / 1000 / 60 / 60) % 24);
        let m = Math.floor((time / 1000 / 60) % 60);
        let s = Math.floor((time / 1000) % 60);
        //将倒计时赋值到div中
        m = m < 9 ? "0" + m : m;
        s = s < 9 ? "0" + s : s;
        document.getElementById("_m").innerHTML = m + "分";
        document.getElementById("_s").innerHTML = s + "秒";
        time = time - 1000;
        setTimeout(() => {
          this.myTimeDown(time);
        }, 1000);
      },
      openPay(month, price, payPoint) {
        this.data.month = month;
        this.data.price = price;
        this.data.payPoint = payPoint;
        this.data.payType = 'wx';
        // //打开支付窗口 
        this.isAlert = true;
        layer.open({
          type: 1,
          title: '账户充值',
          anim: 2,
          area: ["820px", "560px"], //宽高
          content: $("#JS_go_pay"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      }
    },
    mounted() { 
      this.getUser({
        callback: () => { 
          if (this.userInfo.vipcart_type == 3) {
            this.myTimeDown(this.userInfo.overtime * 1000);
          }
          if (this.$router.currentRoute.query.pay == "2") {
            if(this.userInfo.overduedate * 1000 == 0){
              this.openPay(1, 20, 200); 
            }else{
              this.openPay(6, 100, 1000);
            } 
          } else if (this.$router.currentRoute.query.pay == "true") {
            this.openPay(12, 180, 1800);
          } else if (this.$router.currentRoute.query.pay == "success") {
            this.openPay(12, 180, 1800);
          }
          if (this.userInfo.overduedate * 1000 == 0) {
            this.scroll();
          }
        },
        noLoginCallback:()=>{
          this.scroll();
        }
      });
      
    },
    created() {
      document.getElementsByTagName("title")[0].innerHTML = "VIP服务_边乐云";
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .box_vip {
    width: 1080px;
  }

  .box_vip2 {
    position: relative;
    width: 1080px;
    height: 480px;
    overflow: hidden;
  }

  .box_vip2 .vip_type_select {
    position: relative;
    width: 1800px;
  }

  .vip_next,
  .vip_prev {
    display: inline-block;
    position: absolute;
    top: 200px;
    right: -30px;
    width: 21px;
    height: 57px;
    background: url(../assets/icon_arrow.svg)-25px 0;
    cursor: pointer;
  }

  .vip_prev {
    background-position: 0 0;
  }

  .vip_next.hover,
  .vip_prev.hover {
    background-position-y: -60px;
  }
@media (max-width: 1400px){
  .vip_next,.vip_prev { right:45px; z-index:999; }
}
</style>
