<template id="analyse">
  <v-ons-page>
    <c-title title="图表"/>
    <div class="wrapper">
      <div v-observe-visibility="onVisibilityChanged" class="mark"></div>
      <IncomeAndPay ref="incomeAndPay"/>
      <Subject ref="subjects"/>
    </div>
  </v-ons-page>
</template>

<script>
import IncomeAndPay from "@/components/chart/IncomeAndPay";
import Subject from "@/components/chart/Subject";
export default {
  name: "Analyse",
  components: {
    IncomeAndPay,
    Subject
  },
  methods: {
    initChart() {
      this.$refs.incomeAndPay.render();
      this.$refs.subjects.render();
    },

    onVisibilityChanged(visible, entry) {
      console.log(visible);
      if (visible) this.initChart();
    }
  }
};
</script>