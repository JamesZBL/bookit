<template>
  <div @click="toggle">
    <span>
      <span :class="[...moneyClass,'amount-wrapper']">
        <span>{{ displayInteger }}</span>
        <span class="decimal">{{ displayDecimal }}</span>
        <v-ons-icon icon="md-eye" class="eye" v-if="!visible"></v-ons-icon>
      </span>
    </span>
  </div>
</template>

<script>
import accounting from "accounting";
export default {
  name: "number",
  data() {
    return {
    };
  },

  props: {
    number: Number,
    visible: Boolean
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
      return this.visible ? this.moneySections[0] : "****";
    },
    displayDecimal() {
      return this.visible ? `.${this.moneySections[1]}` : "";
    },
    moneySections() {
      return String(this.formatMoney(this.number)).split(".");
    }
  },

  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    formatMoney(n) {
      return accounting.formatMoney(n, "");
    }
  }
};
</script>

<style scoped>
.eye {
  font-size: 14px;
  margin-left: 4px;
  vertical-align: top;
}

.long {
  font-size: 16px;
  vertical-align: bottom;
  line-height: 30px;
}

:not(.long) > .eye {
  padding-top: 4px;
}

.decimal {
  font-size: 14px !important;
  vertical-align: top;
  line-height: 36px;
}

.amount-wrapper {
  display: inline-block;
  padding: 0;
  margin: 0;
}
</style>
