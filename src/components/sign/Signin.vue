<template>
  <div class="signin">
    <h1 class="signin-title">Bookit</h1>
    <span class="signin-sub-title">基于 Vue.js 的记账 APP</span>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-layout>
          <v-flex xs12 md4>
            <v-text-field v-model="email" :rules="emailRules" label="邮箱" required clearable dark></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="密码"
              type="password"
              required
              clearable
              dark
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
      <span class="signin-sub-title signin-copyright">Copyright 2019 ZHENG BAO LE</span>
    </div>
  </div>
</template>

<script>
import { setLightColor } from "@/theme/statusbar";
import { setToken } from "@/request";
import axios from "@/request";
import { alert } from "@/notification";
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
      const form = this.$refs.form;
      const valid = form.validate();
      if (!valid) return;
      const { email, password } = this;
      axios
        .get("/token", {
          params: {
            email,
            password
          }
        })
        .then(({ data }) => {
          setToken(data);
          if (!data) alert("用户名或密码错误");
          else {
            setTimeout(() => {
              this.$router.replace("/");
            }, 500);
          }
        });
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
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 550px;
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
