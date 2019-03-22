<template>
  <div @click="toggle">
    <span>
      <div :class="moneyClass.push('wrapper')">
        <span>{{ displayInteger }}</span>
        <span class="decimal">{{ displayDecimal }}</span>
        <v-ons-icon icon="md-eye" class="eye" v-if="!show"></v-ons-icon>
      </div>
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
    moneyClass() {
      return this.long ? ["long"] : [];
    },
    long() {
      const { number } = this;
      const length = accounting.formatNumber(number, 0).length;
      return 5 < length;
    },
    displayInteger() {
      return this.show ? this.moneySections[0] : "****";
    },
    displayDecimal() {
      return this.show ? `.${this.moneySections[1]}` : "";
    },
    moneySections() {
      return String(this.formatMoney(this.number)).split(".");
    }
  },

  methods: {
    toggle() {
      this.show = !this.show;
    },
    formatMoney(n) {
      return accounting.formatMoney(n, "");
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
  font-size: 16px;
  vertical-align: bottom;
}

.decimal {
  font-size: 14px !important;
  vertical-align: top;
  line-height: 36px;
}

.wrapper {
  display: inline-block;
}
</style>
