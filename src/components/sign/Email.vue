<template>
  <v-app>
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
    </div>
    <v-btn color="info" @click="onClickSubmit" large>确认</v-btn>
  </v-app>
</template>

<script>
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
  methods: {
    onClickSubmit() {
      const { $store, $router } = this;
      const { valid, email } = this;
      const { form } = this.$refs;
      form.validate();
      if (!valid) return;
      $store.commit("setCodeType", "password");
      $store.commit("setEmail", email);
      $router.push("/code");
    }
  }
};
</script>