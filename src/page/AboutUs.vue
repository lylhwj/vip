<template>
  <div>
    <div class="text_box">
      <div class="text_content">
        <p class="fct"><img class="logo" src="@/assets/text_logo.png" alt=""></p>
        <h1><span>关于我们</span></h1>
        <p class="tem">边乐云（yun.bianyue.cn）是一个向广大用户提供上传空间和技术的信息存储空间服务平台，边乐云通过云存储技术为用户提供个人数据存储、同步、管理等在线服务。2017年4月，边乐云正式上线，以清爽的界面，简易的操作和强大的离线功能，迅速累积了部分用户群体，成为用户喜爱的网盘。</p>
        <p class="tem">边乐云网盘致力于为用户提供安全稳定的个人数据存储服务，让您一生中的文件、照片、通讯录等通通搬到云端。它就像您家中的电脑硬盘，一个绝对私密、不分享、不传播的个人单机网络硬盘。在边乐云网盘您可以方便地在手机和电脑之间,同步文件、推送照片和传输数据。</p>
        <p class="mar_left_17">安全存储 生活井井有条<br>在线预览 文件即开即看<br>多端并用 数据随身携带</p>
        <p class="tem">我们为您提供以下服务：</p>
        <p class="tem">我的文件：跨平台文件备份与同步。让您的文件随身携带，随时随地移动办公！</p>
        <p class="tem">我的相册：支持原图无损上传,完美保留每一个图像细节。实现平板，手机，PC端与您的云相册无缝对接！</p>
        <p class="tem">云下载：执行您的下载指令，在线存储您的下载资源，让我们和挂机下载说再见！</p>
        <p class="tem">使用须知：边乐云网盘服务本身不直接上传、提供内容，对用户传输内容不做任何修改或编辑。一切违法违规操作责任均在用户个人，如发现散播，非法侵入窃取资源，数据等，我司将配合执法单位依法追究用户个人责任。</p>
        <p><img src="@/assets/bg_banner_about_us.jpg" alt=""></p>
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
      document.getElementsByTagName("title")[0].innerHTML = '关于我们_边乐云';
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>