<template id="analyse">
  <div class="scroll">
    <c-title title="图表">
      <v-tabs v-model="selected" centered color="#26a2ff" slider-color="yellow" dark fixed-tabs>
        <v-tab v-for="(i, index) in tabs" :key="index" :href="`#${i.id}`">{{ i.display }}</v-tab>
      </v-tabs>
    </c-title>
    <div class="tab-wrapper">
      <v-tabs-items v-model="selected">
        <v-tab-item value="t1">
          <ChartPage/>
        </v-tab-item>
        <v-tab-item value="t2"></v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/chart/Chart";
import ChartPage from "@/components/chart/ChartPage";
export default {
  name: "analyse",
  components: {
    Chart,
    ChartPage
  },
  data() {
    return {
      selected: "t1",
      tabs: [
        {
          id: "t1",
          type: "pay",
          display: "支出"
        },
        {
          id: "t2",
          type: "income",
          display: "收入"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.card-wrapper {
  padding-top: 5px;
}
</style>
