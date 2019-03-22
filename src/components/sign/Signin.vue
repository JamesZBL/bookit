<template>
  <v-app dark>
    <div class="signin">
      <h1 class="signin-title">Bookit</h1>
      <span class="signin-sub-title">基于 Vue.js 的记账 APP</span>
      <v-form v-model="valid" dark>
        <v-container>
          <v-layout>
            <v-flex xs12 md4>
              <v-text-field v-model="email" :rules="emailRules" label="邮箱" required clearable></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="密码"
                type="password"
                required
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn color="info" @click="signin" large class="btn" round>登录</v-btn>
      <v-container>
        <div class="sign-links">
          <span class="left" @click="onClickForgetPassword">忘记密码</span>
          <span class="right" @click="onClickSignup">现在注册</span>
        </div>
      </v-container>
      <div class="copyright-wrapper">
        <span class="signin-sub-title signin-copyright">License Apache 2.0</span>
        <span class="signin-sub-title signin-copyright">Copyright 2019 MAO RU NAN</span>
      </div>
    </div>
  </v-app>
</template>

<script>
import { setLightColor } from "@/theme/statusbar";
export default {
  name: "signin",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "请输入注册时填写的邮箱",
        v => /.+@.+/.test(v) || "请输入有效格式的邮箱"
      ],
      passwordRules: [v => !!v || "请输入密码"]
    };
  },

  mounted() {
    setLightColor();
  },

  methods: {
    signin() {
      const { email, password } = this;
      this.$router.replace("/");
      this.$store.commit("setActiveIndex", 0);
    },

    onClickSignup() {
      this.$router.push("/signup");
    },

    onClickForgetPassword() {
      this.$router.push("/email");
    }
  }
};
</script>

<style scoped>
.v-input * {
  color: white;
}

.signin-title {
  margin-top: 60px;
  line-height: 100px;
  text-align: center;
  color: white;
  text-shadow: #0064b8 1px 1px 3px;
}

.sign-links span {
  color: rgba(29, 130, 212, 0.78);
  font-size: 14px;
  display: inline-block;
  line-height: 32px;
  padding: 0 10px;
}

.signin-sub-title {
  color: rgba(255, 255, 255, 0.607);
  text-align: center;
  font-size: 16px;
  display: block;
}

.signin-copyright {
  color: rgba(255, 255, 255, 0.25);
  display: block;
  font-size: 12px;
}

.copyright {
  margin-bottom: 10px;
  padding: 20px 0;
}

.copyright-wrapper {
  padding-bottom: 2em;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.signin {
  height: 100%;
  background: rgba(33, 196, 237, 1);
  background: -moz-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  ) !important;
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(33, 196, 237, 1)),
    color-stop(2%, rgba(33, 196, 237, 1)),
    color-stop(36%, rgba(0, 88, 171, 1)),
    color-stop(52%, rgba(2, 73, 140, 1)),
    color-stop(100%, rgba(6, 26, 46, 1))
  ) !important;
  background: -webkit-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  ) !important;
  background: -o-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  ) !important;
  background: -ms-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  ) !important;
  background: linear-gradient(
    to bottom,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  ) !important;
}
</style>
