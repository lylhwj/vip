<template>
  <div>
    <div class="text_box">
      <div class="text_content" id="JS_terms_contents">
        <p class="fct"><img class="logo" src="@/assets/text_logo.png" alt=""></p>
        <h1><span>《国家版权局：关于规范网盘服务版权秩序的通知》</span></h1>
        <p>国家版权局2015年10月14日发布《关于规范网盘服务版权秩序的通知》</p>
        <p>《通知》根据现行著作权法律法规并参考有关司法解释，进一步明确网盘服务商在提供网盘服务中应当履行的义务和承担的责任，将法律法规中的有关要求具体化，增加了可操作性和执行性。</p>
        <p>国家版权局官网：关于规范网盘服务版权秩序的通知<br>请查看：<a href="http://www.ncac.gov.cn/chinacopyright/contents/483/266843.html" target="_blank" class="blue">http://www.ncac.gov.cn/chinacopyright/contents/483/266843.html</a></p>
        <p>国家版权局版权管理司负责人解读《关于规范网盘服务版权秩序的通知》<br/>请查看：<a href="http://www.cac.gov.cn/2015-10/23/c_1116915525.htm" target="_blank" class="blue">http://www.cac.gov.cn/2015-10/23/c_1116915525.htm</a></p>
        <h2 class="blue fct fn" style="color:#0688ff">关于规范网盘服务版权秩序的通知 全文</h2>
        <p class="tem"> 为规范网盘服务版权秩序，根据《中华人民共和国著作权法》、《信息网络传播权保护条例》等规定，现就有关事项通知如下：</p>
        <p class="tem"> 一、凡为用户提供网络信息存储空间服务的网盘服务商应当遵守著作权法律法规，合法使用、传播作品，履行著作权保护义务。</p>
        <p class="tem"> 二、网盘服务商应当建立必要管理机制，运用有效技术措施，主动屏蔽、移除侵权作品，防止用户违法上传、存储并分享他人作品。</p>
        <p class="tem"> 三、网盘服务商应当在其网盘首页显著位置提示用户遵守著作权法，尊重著作权人合法权益，不违法上传、存储并分享他人作品。</p>
        <p class="tem"> 四、网盘服务商应当在其网盘首页显著位置详细标明权利人通知、投诉的方式，及时受理权利人通知、投诉，并在接到权利人通知、投诉后24小时内移除相关侵权作品，删除、断开相关侵权作品链接；同时应当遵守《信息网络传播权保护条例》关于“通知”的相关规定。</p>
        <p class="tem"> 五、网盘服务商应当采取有效措施，制止用户违法上传、存储并分享下列作品：</p>
        <p class="tem">（一）根据权利人通知已经移除的作品；</p>
        <p class="tem">（二）权利人向网盘服务商发送了权利公示或者声明的作品；</p>
        <p class="tem">（三）版权行政管理部门公布的重点监管作品。</p>
        <p class="tem">六、网盘服务商应当采取有效措施，制止用户违法上传、存储并分享下列未经授权的作品：</p>
        <p class="tem"> （一）正在热播、热卖的作品；</p>
        <p class="tem"> （二）出版、影视、音乐等专业机构出版或者制作的作品；</p>
        <p class="tem"> （三）其他明显感知属于未经授权提供的作品。</p>
        <p class="tem">七、网盘服务商不得擅自或者组织上传未经授权的他人作品，不得对用户上传、存储的作品进行编辑、推荐、排名等加工，不得以各种方式指引、诱导、鼓励用户违法分享他人作品，不得为用户利用其他网络服务形式违法分享他人作品提供便利。</p>
        <p class="tem">八、网盘服务商应当加强用户管理，要求用户对其账号异常登录、流量异常变化等可能涉嫌侵权的情况及时作出合理解释，对于拒绝解释或者不能给出合理解释的用户，可以暂停或者终止使用其账号。</p>
        <p class="tem">九、网盘服务商应当完整保存用户姓名、账号、网络地址、联系方式等注册信息，并按照版权行政管理部门的要求提供用户上传、存储并分享的侵权作品、网络地址或者域名等必要信息。</p>
        <p class="tem">十、网盘服务商应当建立侵权用户处置机制，根据用户侵权情形，给予列入黑名单、暂停或者终止服务等处置。</p>
        <p class="tem">十一、网盘服务商应当严格遵守、执行本通知。版权行政管理部门要对网盘服务商加强监管，依法查处网盘服务商违反著作权法的行为。</p>
        <p class="tem">十二、本通知自印发之日起实施。</p>
        <p class="fcr">国家版权局</p>
      </div><!-- 内容  -->
    </div>
  </div>
</template>
<script>
  import '@/assets/agreement.css';
  export default {
    name: 'PageNotice1',
    mounted() {
      $(".layout-frame").addClass('layout-new-frame');
    },
    created() {
      document.getElementsByTagName("title")[0].innerHTML = '规范网盘_边乐云';
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>