<template>
  <div class="page-login">
    <div class="login-header">
      <a class="logo" href="http://www.meituan.com">美团网</a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          alt="美团网"
          width="480"
          height="370"
        />
      </div>
      <div class="form">
        <h4 v-if="error" class="tips">{{ error }}</h4>
        <p>
          <span>账号登录</span>
        </p>
        <el-input
          v-model="userName"
          placeholder="手机/用户名/邮箱"
          prefix-icon="profile"
          :class="{ error: error && !userName }"
        ></el-input>
        <el-input
          v-model="password"
          type="password"
          placeholder="输入密码"
          prefix-icon="password"
        ></el-input>
        <div class="foot">
          <a href="#">忘记密码</a>
        </div>
        <el-button type="primary" class="btn-login" @click="submit"
          >登录</el-button
        >
        <p class="reg">
          <span>还没有账号?</span>
          <router-link :to="{ name: 'register' }">免费注册</router-link>
        </p>
        <div class="oauth-wrapper J-oauth-wrapper">
          <h3 class="title-wrapper">
            <span class="title">用合作网站账号登录</span>
          </h3>
          <div class="oauth cf">
            <span
              class="oauth__link oauth__link--qq third-login-btn"
              data-href="/account/connect/tencent"
              target="_blank"
              id="J-third-tencent"
            ></span>
            <span
              class="oauth__link oauth__link--weibo third-login-btn"
              data-href="/account/connect/sina"
              target="_blank"
              id="J-third-sina"
            ></span>
          </div>
          <i id="thirdLoginRiskpartner" data-riskpartner="0"></i>
        </div>
      </div>
    </div>
    <footer>
      <ul>
        <li><a href="#">关于美团</a></li>
        <li><a href="#">加入我们</a></li>
        <li><a href="#"> 商家入驻 </a></li>
        <li><a href="#">帮助中心</a></li>
        <li><a href="#"> 美团手机版</a></li>
      </ul>
      <p>©2019 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号 </p>
    </footer>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      userName: "",
      password: "",
      error: ""
    };
  },
  methods: {
    submit() {
      if (!this.userName) {
        this.error = "请输入账号";
      } else if (!this.password) {
        this.error = "请输入密码";
      }
      if (this.userName && this.password) {
        api
          .login({
            userName: this.userName,
            password: this.password
          })
          .then(res => {
            // console.log(res);
            if (res.data.data == "success") {
              this.$router.push({ name: "index" });
              this.$store.commit('setUserName', this.userName);
            } else {
              this.error = res.data.msg;
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/login/index.scss";
</style>
