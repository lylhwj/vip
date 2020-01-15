<template>
  <div>
    <div class="help_banner">
      <p class="white">
        |
        <a target="_blank" href="//www.bianyue.cn/" title="">边乐网</a>
        |
        <a target="_blank" href="/" title="">边乐云</a>
      </p>
    </div>
    <div class="help_main">
      <div class="help_left">
        <el-row class="tac">
          <el-col>
            <el-menu :default-active="curId" class="el-menu-vertical-demo" background-color="#f8f8f9" text-color="#242424"
              active-text-color="#0688ff" @select="selectMenu">
              <template v-for="data in navData">
                <el-submenu v-if="data.children" :index="String(data.id)" :key="data.id">
                  <template slot="title" v-if="data.children">
                    <span>{{data.title}}</span>
                  </template>
                  <template v-for="cData in data.children">
                    <el-submenu v-if="cData.children" :index="String(cData.id)" :key="cData.id">
                      <template slot="title">{{cData.title}}</template>
                      <el-menu-item v-for="ccData in cData.children" :index="String(ccData.id)" :key="ccData.id">{{ccData.title}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="String(cData.id)" :key="cData.id">{{cData.title}}</el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item v-else :index="String(data.id)" :key="data.id">
                  <span slot="title">{{data.title}}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="fr help_right">
        <div class="help_content" v-html="compiledMarkdown">
        </div>
        <!-- <h1 class="help_title">《边乐云服务协议》</h1> 
        <div class="help_content">
          <h3>2. 关于本服务</h3>
          <p class="part">
            <i>2.1 收费说明</i>
          </p>
          <div class="margin">
            <p class="part">
              <i>2.1.1</i> 115VIP会员服务是115科技向用户提供的需用户有偿付费才能使用的互联网电信增值服务（具体的增值服务项目以115科技根据实际情况提供并不时公布的为准），用户选择具体的增值服务种类并付费、激活服务后即成为115VIP会员（下称“会员”）。</p>
            <p class="part">
              <i>2.1.2</i> 用户理解并知悉，115科技可能会根据本服务的整体规划，对本服务的收费标准、方式等进行修改和变更，前述修改、变更，115科技将在相应服务页面进行展示。您若需要获取、使用本服务，请先提前了解清楚当时关于本服务的收费标准、方式等信息。</p>
            <p class="part">
              <i>2.1.3</i> 115科技可能会根据不同的产品及服务类型，推出不同的增值服务。目前，115科技提供VIP包月服务、VIP年费服务、VIP全球卡服务、VIP全球券服务、超级会员服务、永久会员服务等不同种类的增值服务。同时，115科技也可能会根据用户的需求、产品及服务类型的变化等，对现有增值服务种类进行调整以及不断推出新的增值服务种类。115科技也可能会在不同时间推出具体不同的服务内容，以不断完善、优化本服务。具体增值服务种类及服务内容以相关服务页面公布、实际提供的内容为准。用户可以自行根据需要选择相应服务。</p>
          </div>
          <p class="part">
            <i>2.2 服务期限</i>
          </p>
          <div class="margin">
            <p class="part">
              <i>2.2.1</i>本服务的服务期限以用户自行选择并支付相应服务费用的期限为准，用户也可以登陆115个人中心或者本服务的相应页面查询。</p>
            <p class="part">
              <i>2.2.2</i>本服务的服务开通最高期限会受到一定限制，具体以115科技制定的的规则为准。</p>
            <p class="part">
              <i>2.2.3</i>服务期满用户愿意继续使用会员服务的，应至少在服务期满前7天内支付续费款项，以使服务得以继续进行。如续费时115科技对产品体系、名称或价格进行调整的，双方同意按照届时有效的新的产品体系、名称或价格履行。如果用户没有在到期前继续支付费用，115科技有权在服务期届满时停止并关闭向您提供的会员服务，您应于服务关闭前迁出您因付费获取会员服务所存储在115科技服务器内的所有数据。</p>

            <div class="margin bg">
              <p class="part">
                <i>2.2.1</i>本服务的服务期限以用户自行选择并支付相应服务费用的期限为准，用户也可以登陆115个人中心或者本服务的相应页面查询。</p>
              <p class="part">
                <i>2.2.2</i>本服务的服务开通最高期限会受到一定限制，具体以115科技制定的的规则为准。</p>
              <p class="part">
                <i>2.2.3</i>服务期满用户愿意继续使用会员服务的，应至少在服务期满前7天内支付续费款项，以使服务得以继续进行。如续费时115科技对产品体系、名称或价格进行调整的，双方同意按照届时有效的新的产品体系、名称或价格履行。如果用户没有在到期前继续支付费用，115科技有权在服务期届满时停止并关闭向您提供的会员服务，您应于服务关闭前迁出您因付费获取会员服务所存储在115科技服务器内的所有数据。</p>

            </div> -->
      </div>
    </div>
    <!-- 文章内容  -->
  </div>
  </div>


  </div>
</template>

<script>
  import api from '@/api/index.js';
  import marked from 'marked';
  export default {
    name: 'HelpCenter',
    data() {
      return {
        navData: [],
        curId: 0,
        content: ''
      }
    },
    computed: {
      compiledMarkdown() {
        if (this.content.indexOf('<p>') === 0) {
          return this.content;
        }
        return marked(this.content, {
          sanitize: true
        })
      }
    },
    methods: {
      // 获取帮助中心导航
      getHelp() {
        api.getHelp().then((res) => {
          this.navData = res.data;
        });
      },
      // 获取帮助中心详情
      getHelpDetail() {
        api.getHelpDetail(this.curId).then((res) => {
          this.content = res.data.content || '';
        });
      },
      selectMenu(id) {
        this.jump(`/helpCenter?id=${id}`);
        this.curId = id;
        this.getHelpDetail();
      }
    },
    mounted() {
      $(".layout-frame body").css("overflow","auto");
    },
    created() {
      document.getElementsByTagName("title")[0].innerHTML = '帮助中心_边乐云';
      this.curId = this.$router.currentRoute.query.id || 0;
      this.getHelp();
      this.getHelpDetail();
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 

</style>
<style scoped>

</style>
