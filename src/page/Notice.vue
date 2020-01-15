<template>
  <div>
    <div class="text_box">
      <div class="text_content" id="JS_terms_contents">
        <p class="fct"><img class="logo" src="@/assets/text_logo.png" alt=""></p>
        <h1><span>关于进行手机号实名认证的公告</span></h1>
        <p class="tem">尊敬的以邮箱方式注册边乐云账号的用户：</p>
        <p class="tem">根据《网络安全法》实名制的要求，您的边乐云账号需要绑定手机号，完成实名认证。请您在看到此公告后即刻对您边乐云账号进行手机号码绑定。如您在公告期满1个月内未进行手机号绑定的，我们将在您登录时提示您绑定。并且，我们将根据《用户协议》3.2条，对未绑定手机号、超过六个月未登录且账号下无任何资产的用户，进行账号的回收并注销。</p>
        <p class="tem">账号注销后，若您需要重新使用边乐云的账号登录，请您通过手机号注册新账号。因此给您带来的不便，敬请谅解。</p>
        <p class="fcr">边乐云 <br>2018年9月28日</p>
      </div><!-- 内容  -->
    </div>
  </div>
</template>
<script>
  import '@/assets/agreement.css';
  export default {
    name: 'AboutUs',
    mounted() {
      $(".layout-frame").addClass('layout-new-frame');
    },
    created() {
      document.getElementsByTagName("title")[0].innerHTML = '关于进行手机号实名认证的公告_边乐云';
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>