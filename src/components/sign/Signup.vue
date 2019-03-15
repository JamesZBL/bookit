<template>
  <v-app>
    <c-title title="用户注册" back></c-title>
    <div class="wrapper">
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-layout>
            <v-flex xs12 md12>
              <v-text-field v-model="email" :rules="emailRules" label="电子邮箱" required clearable></v-text-field>
              <v-text-field
                v-model="nickName"
                :rules="nameRules"
                :counter="8"
                label="昵称"
                required
                clearable
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="密码"
                type="password"
                required
                clearable
              ></v-text-field>
              <v-text-field
                v-model="passwordRepeat"
                :rules="passwordRepeatRules"
                label="确认密码"
                type="password"
                required
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
    <v-btn color="info" @click="onClickSubmit" large>立即注册</v-btn>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      nickName: "",
      password: "",
      passwordRepeat: "",
      nameRules: [
        v => !!v || "请输入昵称",
        v => v.length <= 8 || "请输入少于8个字符的昵称"
      ],
      emailRules: [
        v => !!v || "请输入邮箱",
        v => /.+@.+/.test(v) || "请输入正确格式的邮箱"
      ],
      passwordRules: [
        v => !!v || "请输入密码",
        v => v.length >= 8 || "密码应不少于8个字符"
      ]
    };
  },

  methods: {
    onClickSubmit() {
      const { $router } = this;
      const validate = this.$refs.form.validate();
      if (!validate) return;
      $store.commit("setEmail", this.email);
      $store.commit("setCodeType", "signup");
      this.$router.push(`/code`);
    }
  },

  computed: {
    passwordRepeatRules() {
      const { password } = this;
      return [
        v => !!v || "请输入确认密码",
        v => v.length >= 8 || "密码应不少于8个字符",
        v => v === password || "两次输入的密码不一致"
      ];
    }
  }
};
</script>