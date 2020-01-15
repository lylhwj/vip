<template>
  <div class="view_scorll">
    <div v-if="!isShare">
      <el-card v-if="cardShow" class="box-card" style="width: 90%;margin-left: 28px;" shadow="hover">
        <div slot="header" class="clearfix" style="line-height:32px;">
          <a class="f16 fl" href="javascript:;" @click="cardShow=false">卡券兑换</a>
          <el-tooltip class="item" effect="dark" placement="bottom-start">
            <div slot="content">通过购买空间卡<br />扩容云下载网盘容量</div>
            <el-button class="el-button" style="float:left;margin-left:10px;" size="mini"><span class="f16">购买空间卡</span></el-button>
          </el-tooltip>
        </div>
        <ul class="fct vip_type_select space_list mt20" style="width: auto;">
          <li @click="openPay(1,50)" @mousemove="active=false">
            <i class="svip svip_year">云下载</i>
            <p class="vip_time">1TB空间卡</p>
            <p class="price">
              <strong>50
                <i>元</i>
              </strong>
            </p>
            <p class="desc">快速扩容1TB永久空间</p>
            <div class="but_submit">
              <a href="javascript:;" class="button btn_linear_orange">
                <span>购买</span>
              </a>
            </div>
          </li>
          <li @click="openPay(2,80)" @mousemove="active=false">
            <i class="svip svip_year">云下载</i>
            <p class="vip_time">2TB空间卡</p>
            <p class="price">
              <strong>80
                <i>元</i>
              </strong>
            </p>
            <p class="desc">快速扩容2TB永久空间</p>
            <div class="but_submit">
              <a href="javascript:;" class="button btn_linear_orange">
                <span>购买</span>
              </a>
            </div>
          </li>
          <li @click="openPay(3,100)" :class="{'hover':active}" @mousemove="active=false">
            <i class="svip svip_year">云下载</i>
            <p class="vip_time">3TB空间卡</p>
            <p class="price">
              <strong>100
                <i>元</i>
              </strong>
            </p>
            <p class="desc">快速扩容3TB永久空间</p>
            <div class="but_submit">
              <a href="javascript:;" class="button btn_linear_orange">
                <span>购买</span>
              </a>
            </div>
          </li>
        </ul>
      </el-card>
      <!-- 空间卡 -->
      <el-card v-if="!cardShow" class="box-card" style="width: 90%;margin-left: 28px;" shadow="hover">
        <div slot="header" class="clearfix" style="line-height:32px;">
          <a href="javascript:;" class="f16 fl">卡券兑换</a>
          <el-tooltip class="item" effect="dark" placement="bottom-start">
            <div slot="content">通过购买空间卡<br />扩容云下载网盘容量</div>
            <el-button :class="['el-button','el-button--primary']" style="float:left;margin-left:10px;" size="mini"
              @click="cardShow=true"><span class="f16">购买空间卡</span></el-button>
          </el-tooltip>
        </div>
        <el-table style="width: 100%" stripe border highlight-current-row :data="data" v-loading="loading">
          <div slot="empty" class="none_warpper" v-loading="initLoading">
            <div class="none_bg" v-if="!initLoading">暂无空间卡</div>
          </div>
          <el-table-column label="卡号" align="center" prop="card_id"></el-table-column>
          <el-table-column label="卡种" align="center" prop="spaceCard_type">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" :class="['el-button','el-button--primary','is-plain']" @click="handleChange(scope.row.card_id)">兑换</el-button>
              <el-button v-if="scope.row.type==1" size="mini" :class="['el-button','el-button--success','is-plain']"
                @click="handlePresent(scope.row.id,scope.row.card_id)">赠送</el-button>
              <el-button v-if="scope.row.type==1" size="mini" :class="['el-button','el-button--info','is-plain']"
                v-clipboard:copy="'http://vip.bianyue.cn/vip/coupon?cardId='+scope.row.card_id+'&#分享边乐云VIP年卡，需要的赶紧来兑换吧'"
                v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="fct mt20">
          <el-pagination background :current-page="currentPage" layout="prev, pager, next" :page-size="5"
            @current-change="couponPage" :total="total"></el-pagination>
        </div>
      </el-card>
    </div>
    <el-form v-else label-width="100px" class="demo-ruleForm pad22" style="width: 400px;">
      <el-form-item label="兑换卡号" prop="cid">
        <el-input readonly :value="shareNumber" type="text" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="兑换账号" prop="username">
        <el-input readonly :value="userInfo.username" type="text" auto-complete="off"></el-input>
      </el-form-item>
      <p class="fct mt30">
        <el-button type="primary" @click="handlePresentChange">立即兑换</el-button>
      </p>
    </el-form>
    <div id="JS_present" class="disn">
      <Present v-if="isAlert" :cardNumber="cardNumber" :cardId="cardId" @success="presentSuccess"></Present>
      <div style="height:278px;" v-else></div>
    </div>
  </div>
  <!-- 滚动部分 -->
</template>

<script>
  import Header from "@/components/Header.vue";
  import Left from "@/components/Left.vue";
  import Present from "@/components/Present.vue";
  export default {
    name: "Coupon",
    data() {
      return {
        cardId: "",
        cardNumber: "",
        loading: false,
        initLoading: false,
        data: [],
        currentPage: 1,
        total: 1,
        isEmpty: false,
        cardShow: false,
        isAlert: false,
        isShare: false,
        shareNumber: "",
        active: true
      };
    },
    components: {
      Header: Header,
      Left: Left,
      Present: Present
    },
    methods: {
      couponPage(page) {
        this.initLoading = true;
        this.GET({
          api: `/user.php?op=info&action=spaceCard_lists&page=${page}`,
          alertErr: "no",
          success: data => {
            this.initLoading = false;
            this.currentPage = page;
            this.data = data.data;
            this.total = parseInt(data.total) == 0 ? 1 : parseInt(data.total);
            if (data.status == "card none") {
              this.data = [];
              this.total = 1;
            }
            setTimeout(() => {
              this.loading = false;
            }, 500);
          },
          error: () => {
            this.loading = false;
            this.initLoading = false;
          }
        });
      },
      // 兑换
      handleChange(id, type) {
        layer.confirm(
          "是否兑换？", {
            icon: 3
          },
          () => {
            this.GET({
              api: `/user.php?op=info&action=use_spaceCard&cid=${id}`,
              success: data => {
                layer.msg(
                  "兑换成功~", {
                    icon: 1,
                    time: 2000
                  },
                  () => {
                    this.loading = true;
                    if (this.data.length == 1 && this.currentPage > 1) {
                      this.couponPage(this.currentPage - 1);
                      return false;
                    }
                    this.couponPage(this.currentPage);
                  }
                );
              }
            });
          }
        );
      },
      // 赠送
      handlePresent(cardId, cardNumber) {
        this.cardId = cardId;
        this.cardNumber = cardNumber;
        this.isAlert = true;
        layer.open({
          type: 1,
          title: "赠送VIP卡",
          anim: 2,
          area: ["450px", ""], //宽高
          content: $("#JS_present"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      },
      // 赠送成功
      presentSuccess() {
        layer.closeAll();
        this.isAlert = false;
        this.loading = true;
        if (this.data.length == 1 && this.currentPage > 1) {
          this.couponPage(this.currentPage - 1);
          return false;
        }
        this.couponPage(this.currentPage);
      },
      // 赠送兑换
      handlePresentChange() {
        this.GET({
          api: `/user.php?op=info&action=give_other&cid=${this.shareNumber}`,
          success: data => {
            layer.msg(
              "兑换成功", {
                time: 2000,
                icon: 1
              },
              () => {
                this.jump("/dataReport");
              }
            );
          }
        });
      },
      // 复制链接
      onCopy() {
        layer.msg("复制成功~", {
          icon: 1,
          time: 2000
        });
      },
      // 复制失败
      onError() {
        layer.msg("复制失败~", {
          icon: 1,
          time: 2000
        });
      },
      openPay(space, price) {
        //打开支付窗口
        layer.open({
          type: 2,
          anim: 2,
          title: "购买空间",
          area: ["820px", "560px"], //宽高
          content: [
            `${process.env.DEVURL}paySpace?price=${price}&pay_type=9`,
            "no"
          ]
        });
      }
    }, 
    created() {
      if (this.$router.currentRoute.query.type == "1") {
        this.cardShow = true;
      }
      document.getElementsByTagName("title")[0].innerHTML = "我的卡券包_边乐云";
      if (this.$router.currentRoute.query.cardId) {
        this.shareNumber = this.$router.currentRoute.query.cardId;
        this.isShare = true;
        return false;
      }
      this.couponPage(this.currentPage);
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
