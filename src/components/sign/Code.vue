<template>
  <div>
    <c-title title="邮箱验证" back></c-title>
    <div class="wrapper">
      <v-alert :value="true" type="success">验证码已发送至邮箱{{email}}, 请注意查收</v-alert>
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-layout>
            <v-flex xs12 md12>
              <v-text-field v-model="emailCode" label="收到的验证码" required clearable></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn color="info" @click="onClickSubmit" large dark class="btn" round>确认</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "@/request";
import { toast } from "@/notification";
export default {
  name: "email-code",
  data() {
    const { state } = this.$store;
    return {
      email: state.email,
      emailCode: "",
      valid: false,
      type: state.codeType
    };
  },
  methods: {
    onClickSubmit() {
      const { type, emailCode, email, $router } = this;
      switch (type) {
        case "REGISTER":
          axios
            .post("/registration", {
              email,
              code: `${emailCode}`
            })
            .then(r => {
              toast("注册成功，请登录", () => {
                $router.replace("/signin");
              });
            });
      }
    }
  }
};
</script>