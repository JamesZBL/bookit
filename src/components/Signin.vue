<template>
  <v-app dark>
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
    <v-btn color="info" @click="signin" large>登录</v-btn>
    <v-container>
      <div class="sign-links">
        <span>忘记密码</span>
        <span class="right">现在注册</span>
      </div>
    </v-container>
    <span class="signin-sub-title signin-copyright">Copyright 2019 MAO RU NAN</span>
  </v-app>
</template>

<script>
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

  methods: {
    signin() {
      const { email, password } = this;
      console.log({
        email,
        password
      });
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

.sign-links {
  color: rgba(29, 130, 212, 0.78);
}

.signin-sub-title {
  color: rgba(255, 255, 255, 0.607);
  text-align: center;
}

.signin-copyright {
  color: rgba(255, 255, 255, 0.255);
  margin-bottom: 20px;
  font-size: 14px;
}

.theme--dark.application {
  /* background-image: url('https://cn.bing.com/th?id=OHR.GrapeHarvest_EN-CN1405444811_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp'); */
  background: rgba(33, 196, 237, 1);
  background: -moz-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(33, 196, 237, 1)),
    color-stop(2%, rgba(33, 196, 237, 1)),
    color-stop(36%, rgba(0, 88, 171, 1)),
    color-stop(52%, rgba(2, 73, 140, 1)),
    color-stop(100%, rgba(6, 26, 46, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(33, 196, 237, 1) 0%,
    rgba(33, 196, 237, 1) 2%,
    rgba(0, 88, 171, 1) 36%,
    rgba(2, 73, 140, 1) 52%,
    rgba(6, 26, 46, 1) 100%
  );
}
</style>
