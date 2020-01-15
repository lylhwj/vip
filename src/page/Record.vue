<template>
  <div class="view_scorll">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="margin-right:20px;">
      <el-tab-pane label="充值记录" name="pay">
        <el-table :data="payData" stripe border highlight-current-row v-loading="loading">
          <div slot="empty" class="none_warpper" v-loading="initLoading">
            <div class="none_bg" v-if="!initLoading">暂无充值记录</div>
          </div>
          <el-table-column label="支付单号" prop="trade_sn" align="center"></el-table-column>
          <el-table-column label="时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.addtime*1000|timeStamp }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付方式" prop="payment" align="center"></el-table-column>
          <el-table-column label="存入金额" prop="moneyName" align="center"></el-table-column>
          <el-table-column label="支付状态" prop="statusName" align="center"></el-table-column>
          <!-- <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.status=='unpay'" :disabled="scope.row.pay_id==10||scope.row.pay_id==11||scope.row.pay_id==12||scope.row.pay_id==13"
                :class="['el-button','el-button--primary','is-plain']" @click="handlePay(scope.$index, scope.row)">付款</el-button>
              <el-button type="button" size="mini" v-if="scope.row.status=='succ'" class="el-button el-button--success is-circle">
                <i class="el-icon-check"></i>
              </el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <div class="fct mt20">
          <el-pagination background :current-page="payCurrentPage" layout="prev, pager, next" @current-change="payPage" :total="payTotal"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="积分日志" name="point">
        <el-table :data="pointData" stripe border highlight-current-row>
          <div slot="empty" class="none_warpper" v-loading="initLoading">
            <div class="none_bg" v-if="!initLoading">暂无积分日志</div>
          </div>
          <el-table-column label="描述" prop="typeName" align="center"></el-table-column>
          <el-table-column label="积分" prop="point" align="center"></el-table-column>
          <el-table-column label="时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="fct mt20">
          <el-pagination background :current-page="pointCurrentPage" layout="prev, pager, next" @current-change="pointPage" :total="pointTotal"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="登录日志" name="login">
        <el-table :data="loginData" stripe border highlight-current-row>
          <div slot="empty" class="none_warpper" v-loading="initLoading">
            <div class="none_bg" v-if="!initLoading">暂无登陆日志</div>
          </div>
          </el-table-column>
          <el-table-column label="登录时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.login_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="登录IP" prop="login_ip" align="center"></el-table-column>
          <el-table-column label="登录地点" align="center">
            <template slot-scope="scope">
              <span v-html="scope.row.adress"></span>
            </template>
          </el-table-column>
          <el-table-column label="使用设备" prop="agent" align="center"></el-table-column>
        </el-table>
        <div class="fct mt20">
          <el-pagination background :current-page="loginCurrentPage" layout="prev, pager, next" @current-change="loginPage" :total="loginTotal"></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<!-- 滚动部分 -->
<script>
  import Header from '@/components/Header.vue';
  import Left from '@/components/Left.vue';
  export default {
    name: 'Record',
    data() {
      return {
        activeName: 'pay',
        payData: [],
        payTotal: 1,
        payCurrentPage: 1,
        pointData: [],
        pointTotal: 1,
        pointCurrentPage: 1,
        typeName: ['积分充值', '积分兑换vip', '盘扩容', '文件扩容', '相册扩容', '每日登陆', '首次充值', '首次绑定邮箱', '首次上次头像', '首次开通VIP', '首次绑定手机',
          '设置安全码', '分享链接，获得积分','半年V赠送1000积分','年V赠送1800积分'
        ],
        loginData: [],
        loginTotal: 1,
        loginCurrentPage: 1,
        loading: false,
        initLoading: true
      }
    },
    components: {
      Header: Header,
      Left: Left
    },
    watch: {
      $route(to, from) {
        if (to.query.type == 'login') {
          this.getLoginLog(this.loginCurrentPage);
          this.activeName = 'login';
        }
      }
    },
    methods: {
      getPayLog(page) {
        this.initLoading = true;
        this.GET({
          api: `/user.php?op=paylist&action=init&page=${page}`,
          success: (data) => {
            this.loading = false;
            this.initLoading = false;
            this.payCurrentPage = page;
            this.payData = data.data || [];
            this.payTotal = parseInt(data.total) == 0 ? 1 : parseInt(data.total);
            this.payData.forEach(element => {
              element.moneyName = element.money + '元';
              switch (element.status) {
                case 'unpay':
                  element.statusName = '交易未支付';
                  break;
                case 'succ':
                  element.statusName = '交易成功';
                  break;
                case 'failed':
                  element.statusName = '交易失败';
                  break;
                case 'error':
                  element.statusName = '交易错误';
                  break;
                case 'progress':
                  element.statusName = '交易处理中';
                  break;
                case 'timeout':
                  element.statusName = '交易超时';
                  break;
                case 'cancel':
                  element.statusName = '交易取消';
                  break;
                case 'waitting':
                  element.statusName = '等待付款';
                  break;
              }
            });
          },
          error: () => {
            this.loading = false;
            this.initLoading = false;
          }

        })
      },
      getPointLog(page) {
        this.initLoading = true;
        this.GET({
          api: `/user.php?op=info&action=point_log&page=${page}`,
          success: (data) => {
            this.initLoading = false;
            this.pointCurrentPage = page;
            this.pointData = data.data || [];
            this.pointTotal = parseInt(data.total) == 0 ? 1 : parseInt(data.total);
            this.pointData.forEach(element => {
              if (element.point > 0) {
                element.point = '+' + element.point;
              }
              element.typeName = this.typeName[parseInt(element.type)-1];
            });
          },
          error: () => {
            this.loading = false;
            this.initLoading = false;
          }
        })
      },
      getLoginLog(page) {
        this.initLoading = true;
        this.GET({
          api: `/user.php?op=info&action=login_log&page=${page}`,
          success: (data) => {
            this.initLoading = false;
            data.total = data.total || 1;
            this.loginCurrentPage = page;
            this.loginData = data.data;
            this.loginTotal = parseInt(data.total) == 0 ? 1 : parseInt(data.total);
          },
          error: () => {
            this.loading = false;
            this.initLoading = false;
          }
        })
      },
      handleClick(tab, event) {
        if (tab.name == 'pay') {
          this.getPayLog(this.payCurrentPage);
          this.jump('/vip/record?type=pay');
        } else if (tab.name == 'point') {
          this.getPointLog(this.pointCurrentPage);
          this.jump('/vip/record?type=point');
        } else if (tab.name == 'login') {
          this.getLoginLog(this.loginCurrentPage);
          this.jump('/vip/record?type=login');
        }
      },
      handlePay(index, row) {
        let price = row.money || 1;
        let title = '';
        let url = `${process.env.DEVURL}continuePay?price=${price}&id=${row.id}&pay_type=${row.pay_id}&payment=${row.payment}`;
        if (row.pay_id == 2 || row.pay_id == 6 || row.pay_id == 8) {
          title = `支付宝支付${row.moneyName}`;
        } else if (row.pay_id == 3 || row.pay_id == 5 || row.pay_id == 7 || row.pay_id == 9) {
          title = `微信支付${row.moneyName}`;
        } else if (row.pay_id == 4 && row.payment.indexOf('微信') !== -1) {
          title = `微信支付${row.moneyName}`;
        } else if (row.pay_id == 4 && row.payment.indexOf('支付宝') !== -1) {
          title = `支付支付${row.moneyName}`;
        }
        layer.open({
          type: 2,
          anim: 2,
          title: title,
          area: ['600px', '500px'], //宽高
          content: [url, 'no'],
          cancel: () => {
            this.loading = true;
            this.getPayLog(this.payCurrentPage);
          }
        })
      },
      payPage(page) {
        this.getPayLog(page);
      },
      pointPage(page) {
        this.getPointLog(page);
      },
      loginPage(page) {
        this.getLoginLog(page);
      }
    },
    created() {
      document.getElementsByTagName("title")[0].innerHTML = '历史记录_边乐云';
      if (this.$router.currentRoute.query.type == 'login') {
        this.getLoginLog(this.loginCurrentPage);
        this.activeName = 'login';
      } else if (this.$router.currentRoute.query.type == 'point') {
        this.getPointLog(this.pointCurrentPage);
        this.activeName = 'point';
      } else {
        this.getPayLog(this.payCurrentPage);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
