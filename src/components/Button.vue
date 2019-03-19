<template>
  <v-btn large color="error" dark>{{ text }}</v-btn>
</template>
<script>
export default {
  name: "c-button",
  props: {
    color: String,
    text: String
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.btn {
  width: 100%;
  margin: auto 5%;
}
</style>
