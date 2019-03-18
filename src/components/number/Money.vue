<template>
  <div @click="toggle">
    <span>
      {{ display }}
      <v-ons-icon icon="md-eye" class="eye" v-if="!show"></v-ons-icon>
    </span>
  </div>
</template>

<script>
import accounting from "accounting";
export default {
  name: "number",
  data() {
    return {
      show: false
    };
  },

  props: {
    number: Number
  },

  computed: {
    display() {
      return this.show ? accounting.formatMoney(this.number, "") : "****";
    }
  },

  methods: {
    toggle() {
      this.show = !this.show;
    }
  },

  created() {
    const { number } = this;
    const length = accounting.formatNumber(number, 0);
    if (8 < length) this.show = false;
  }
};
</script>

<style scoped>
.eye {
  font-size: 14px;
  position: absolute;
  top: 26px;
  margin-left: 4px;
}
</style>
