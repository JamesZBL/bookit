<template>
  <v-app>
    <c-title back title="修改密码"></c-title>
    <div class="wrapper">
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-layout>
            <v-flex xs12 md12>
              <v-text-field
                v-model="passwordOriginal"
                :rules="passwordRules"
                label="原密码"
                type="password"
                required
                clearable
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="新密码"
                type="password"
                required
                clearable
              ></v-text-field>
              <v-text-field
                v-model="passwordRepeat"
                :rules="passwordRepeatRules"
                label="确认新密码"
                type="password"
                required
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn color="info" @click="onClickSubmit" large class="btn">确认</v-btn>
      </v-form>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "password",
  data() {
    return {
      valid: false,
      password: "",
      passwordRepeat: "",
      passwordOriginal: "",
      passwordRules: [
        v => !!v || "请输入密码",
        v => v.length >= 8 || "密码应不少于8个字符"
      ]
    };
  },
  methods: {
    onClickSubmit() {
      const { $router, $store } = this;
      const validate = this.$refs.form.validate();
      if (!validate) return;
      this.$router.replace(`/`);
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