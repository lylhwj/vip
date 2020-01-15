<template>
  <div>
    <div class="text_box">
      <div class="text_content" id="JS_terms_contents">
        <h1><span>《链接任务用户服务协议》</span></h1>
        <p class="tem">【前言】尊敬的用户，欢迎你使用边乐云为你提供的服务。边乐云在此特别提示你：用户（你）欲使用链接任务服务（以下简称“本服务”），必须事先认真阅读《链接任务用户服务协议》（以下简称“本服务协议”）中各条款，包括免除或者限制边乐云责任的免责条款及对用户的权利限制条款。请你审阅并接受或不接受本服务协议（未成年人应在法定监护人的陪同下审阅）。如你不同意本服务协议及/或随时对其的修改，你应不使用或主动取消边乐云提供的本服务。你的使用行为将被视为你对本服务协议全部的完全接受，包括接受边乐云对本服务协议随时所做的任何修改。</p>
        <h3>1、服务条款及免责声明</h3>
        <p class="tem">1.1 用户使用本服务前必须先行注册边乐云账号，并严格遵守《边乐云用户服务协议》及其相关协议。</p>
        <p class="tem">1.2 用户应自行了解和熟悉本服务的产品使用功能，使用本服务所产生的全部风险由用户自行承担，边乐云在任何情况下不就因使用或不能使用本服务产品所发生的特殊的、意外的、直接或间接的损失承担赔偿责任，即使已事先被告知该损害发生的可能性。</p>
        <p class="tem">1.3 如果因你违反本服务协议或《边乐云用户服务协议》及其相关协议的任何一项条款，导致任何第三方损害的，你应当独立承担责任，因此给边乐云造成损失的，你应当一并赔偿。</p>
        <p class="tem">1.4 如果用户未遵守本服务协议或《边乐云用户服务协议》及《边乐云组织用户服务协议》的任何一项条款，边乐云有权立即终止本服务协议，停止为用户提供本服务，并保留通过法律途径追究责任的权利。</p>
        <h3>2、用户使用须知</h3>
        <p class="tem">2.1 用户必须合法合规使用本服务产品，不得使用本服务传播任何包含违反本协议及违反国家法律规定的内容，包括但不限于以下：</p>
        <div class="mar_left_17 bg">
        <p>(1) 违反宪法确定的基本原则的；</p>
        <p>(2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
        <p>(3) 损害国家荣誉和利益的；</p>
        <p>(4) 煽动民族仇恨、民族歧视，破坏民族团结的；</p>
        <p>(5) 破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
        <p>(6) 散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
        <p>(7) 散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p>
        <p>(8) 侮辱或者诽谤他人，侵害他人合法权益的；</p>
        <p>(9) 煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</p>
        <p>(10) 以非法民间组织名义进行组织活动的；</p>
        <p>(11) 含有法律、行政法规禁止的其他内容的。</p>
        </div>
        <p class="tem">2.2 为规范用户合法合规使用本服务产品，用户同意边乐云有权在法律法规政策规定范围内采用技术手段包括但不限于系统自动检测等措施，对用户利用本服务下载或传播的文件进行监管。一经发现用户存在本服务协议第2.1所列之情形，边乐云有权立即停止为违规用户提供部分或全部服务，因此所造成的后果全部由用户自行承担。</p>
        <p class="tem">2.3 如有用户利用本服务进行违反国家法律法规政策规定的活动，边乐云会根据法律法规政策的规定全力配合公安或有关部门的协助调查工作。边乐云有权对违规的用户进行冻结账号、暂停提供全部或部分服务等措施，以配合公安或有关部门的调查取证工作。</p>
        <h3>3、服务声明</h3>
        <p class="tem">边乐云特别提请用户注意，为了保障业务发展和调整的自主权，边乐云拥有随时修改或中断服务而不需通知用户的权利，边乐云行使修改或中断服务的权利不需对用户或任何第三方负责。必须在用户同意本服务协议的前提下，边乐云才开始对用户提供服务。</p>
        <h3>4、法律适用</h3>
        <p class="tem">本协议签订地为漳州。本协议的解释、效力及纠纷的解决，适用于中华人民共和国法律。若用户和边乐云之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，任何一方均同意向边乐云注册所在地有管辖权法院提起诉讼解决。</p>
      </div><!-- 内容  -->
    </div>
    <div id="js_terms_nav" class="show_pc terms-nav">
      <p class="fd aa">在这篇文章中：</p>
      <ul>
        <li v-for="(data,index) in navArr" @click="scrollTo(index)" :key="data" :class="{current:currentIndex==index}"><s></s><a
            href="javascript:;" :title="data">{{data}}</a></li>
      </ul>
      <a href="javascript:;" class="go_top" @click="scrollTo('top')"><s></s>返回顶部</a>
    </div><!-- 右侧浮窗 -->
  </div>
</template>
<script>
  import '@/assets/agreement.css';
  export default {
    name: 'AgreementCopyright',
    data() {
      return {
        currentIndex: 0,
        navArr: ['服务条款及免责声明','用户使用须知','服务声明','法律适用'],
        offsetTopArr: []
      }
    },
    methods: {
      // 滚动
      scrollTo(data) {
        this.isClick = true;
        if (data == 'top') {
          $('body').animate({
            scrollTop: 0
          });
        } else {
          this.currentIndex = data;
          $('body').animate({
            scrollTop: this.offsetTopArr[this.currentIndex] - 50
          }, () => {
            this.isClick = false;
          });
        }
      }
    },
    mounted() {
      $(".layout-frame").addClass('layout-new-frame');
      $("#JS_terms_contents").find('h3').each((index, ele) => {
        this.offsetTopArr.push($(ele).offset().top);
      })
      $("body").scroll(() => {
        if (!this.isClick) {
          let top = $('body').scrollTop();
          this.offsetTopArr.forEach((element, index) => {
            let offsetTop = element - 50;
            if (top >= offsetTop) {
              this.currentIndex = index;
            }
          });
        }
      })
    },
    created() {
      document.getElementsByTagName("title")[0].innerHTML = '链接任务用户服务协议';
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
