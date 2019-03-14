<template>
  <div>
    <div class="c-title">
      <div>
        <v-ons-icon @click="goBack" v-if="back" class="icon-back" icon="md-chevron-left"></v-ons-icon>
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: String,
    back: Boolean
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.c-title {
  display: block;
  height: 50px;
  line-height: 50px;
  z-index: 3;
  position: fixed;
  background-color: #26a2ff;
  width: 100%;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 1000;
}

.icon-back {
  position: absolute;
  left: 0;
  width: 40px;
  font-size: 32px;
}
</style>