<template>
  <div>
    <c-title title="邮箱验证" back></c-title>
    <div class="wrapper">
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-layout>
            <v-flex xs12 md12>
              <v-text-field v-model="email" :rules="emailRules" label="注册时填写的邮箱" required clearable></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn color="info" @click="onClickSubmit" large class="btn" round>确认</v-btn>
    </div>
  </div>
</template>

<script>
import { setMainColor } from "@/theme/statusbar";
import axios from "@/request";
export default {
  name: "email",
  data() {
    const { $store } = this;
    const { state } = $store;
    return {
      email: "",
      valid: false,
      emailRules: [
        v => !!v || "请输入注册时填写的邮箱",
        v => /.+@.+/.test(v) || "请输入有效格式的邮箱"
      ]
    };
  },
  mounted() {
    setMainColor();
  },
  methods: {
    onClickSubmit() {
      const { $store, $router } = this;
      const { valid, email } = this;
      const { form } = this.$refs;
      form.validate();
      if (!valid) return;
      $store.commit("setCodeType", "PASSWORD");
      $store.commit("setEmail", email);
      axios
        .get("/profile/reset-code", {
          params: {
            email
          }
        })
        .then(r => {
          $router.push("/code");
        });
    }
  }
};
</script>