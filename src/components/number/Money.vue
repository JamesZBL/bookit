<template>
  <div @click="toggle">
    <span>
      <span :class="moneyClass">{{ display }}</span>
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
    },
    moneyClass() {
      return this.long ? ["long"] : [];
    },
    long() {
      const { number } = this;
      const length = accounting.formatNumber(number, 0).length;
      return 5 < length;
    }
  },

  methods: {
    toggle() {
      this.show = !this.show;
    }
  },

  created() {}
};
</script>

<style scoped>
.eye {
  font-size: 14px;
  position: absolute;
  top: 26px;
  margin-left: 4px;
}

.long {
  font-size: 14px;
}
</style>
