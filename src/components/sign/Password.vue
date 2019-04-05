<template>
  <div>
    <c-title title="重置密码" back></c-title>
    <div class="wrapper">
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-layout>
            <v-flex xs12 md12>
              <v-text-field
                type="password"
                v-model="newPassword"
                label="新密码"
                required
                clearable
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="repeatPassword"
                label="确认密码"
                required
                clearable
                :rules="repeatPasswordRules"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn color="info" @click="onClickSubmit" large dark class="btn" round>确认修改</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "@/request";
import { toast } from "@/notification";
export default {
  name: "new-password",
  data() {
    const { state } = this.$store;
    return {
      email: state.email,
      emailCode: "",
      valid: false,
      code: state.code,
      newPassword: "",
      repeatPassword: ""
    };
  },
  computed: {
    passwordRules: () => [
      v => !!v || "请输入密码",
      v => v.length >= 8 || "密码应不少于8个字符"
    ],
    repeatPasswordRules() {
      const { newPassword } = this;
      return [
        v => !!v || "请输入密码",
        v => v.length >= 8 || "密码应不少于8个字符",
        v => v === newPassword || "两次输入的密码不一致"
      ];
    }
  },
  methods: {
    onClickSubmit() {
      if (!this.$refs.form.validate()) return;
      const { code, email, newPassword, $router, $store } = this;
      axios
        .put("/profile/password/reset", {
          email,
          code,
          newPassword
        })
        .then(r => {
          toast("密码已重置，请登录");
          $router.replace("/signin");
        });
    }
  }
};
</script>