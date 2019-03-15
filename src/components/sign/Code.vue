<template>
  <v-app>
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
    </div>
    <v-btn color="info" @click="onClickSubmit" large>确认</v-btn>
  </v-app>
</template>

<script>
export default {
  name: "email-code",
  data() {
    const state = this.$store.state;
    return {
      email: state.email,
      emailCode: "",
      valid: false
    };
  },
  methods: {
    onClickSubmit() {}
  }
};
</script>