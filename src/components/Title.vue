<template>
  <div>
    <div class="c-title">
      <div v-show="showTitle">
        <v-ons-icon @click="goBack" v-if="back" class="icon-back" icon="md-chevron-left"></v-ons-icon>
        <span>{{ title }}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: String,
    back: Boolean,
    hideTitle: Boolean
  },
  computed: {
    showTitle() {
      return !this.hideTitle;
    }
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
  height: 52px;
  line-height: 50px;
  z-index: 6;
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
  width: 60px;
  font-size: 32px;
}
</style>