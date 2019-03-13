<template id="analyse">
  <v-ons-page>
    <c-title title="图表"/>
    <div class="wrapper card-wrapper">
      <div v-observe-visibility="onVisibilityChanged" class="mark"></div>
      <v-ons-card>
        <IncomeAndPay :styles="chartStyle" ref="incomeAndPay"/>
      </v-ons-card>
      <v-ons-card>
        <SubjectIncome :styles="chartStyle" ref="subjectsIncome"/>
      </v-ons-card>
      <v-ons-card>
        <SubjectPay :styles="chartStyle" ref="subjectsPay"/>
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
import IncomeAndPay from "@/components/chart/IncomeAndPay";
import SubjectPay from "@/components/chart/SubjectPay";
import SubjectIncome from "@/components/chart/SubjectIncome";
export default {
  name: "Analyse",
  components: {
    IncomeAndPay,
    SubjectPay,
    SubjectIncome
  },
  data() {
    return {
      chartStyle: {
        position: "relative"
      }
    };
  },
  methods: {
    initChart() {
      this.$refs.incomeAndPay.render();
      this.$refs.subjectsPay.render();
      this.$refs.subjectsIncome.render();
    },

    onVisibilityChanged(visible, entry) {
      console.log(visible);
      if (visible) this.initChart();
    }
  }
};
</script>
<style scoped>
.card-wrapper {
  padding-top: 5px;
}
</style>
