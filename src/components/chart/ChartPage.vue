<template>
  <div>
    <v-tabs
      fixed-tabs
      right
      centered
      slider-color="rgba(74, 86, 96, 0.8)"
      height="38px"
      v-model="selectedUnitIndex"
      class="v-tabs"
    >
      <v-tab v-for="(unit, n) in unitList" :key="n" :value="n">{{ unit.display }}</v-tab>
    </v-tabs>
    <div class="chart-wrapper">
      <div class="analyse">
        <p>{{sumName}}: {{sum}}</p>
        <p>平均值: {{avg}}</p>
      </div>
      <div class="chart">
        <Chart ref="chart" :chartData.sync="chartData" :options="options" :height="100"/>
      </div>
      <div class="analyse">
        <p>{{type.display}}排行榜</p>
      </div>
      <div class="categories">
        <div class="no-data" v-show="!rankList.length">
          <img src="@/assets/no-data.svg">
          <span>暂无数据</span>
        </div>
        <v-ons-list>
          <v-ons-list-item class="amount-round" v-for="(item, index) in rankList" :key="index">
            <div class="left">
              <v-ons-icon :icon="getCategory(item).icon" class="item-icon"></v-ons-icon>
            </div>
            <div class="center">
              <dir>{{getCategoryName(item)}} {{formatRatio(item.ratio)}}</dir>
              <div class="amount">{{formatMoneyWithOptionalDecimal(item.amount)}}</div>
              <div class="progress-wrapper">
                <ons-progress-bar :value="item.ratio*100"></ons-progress-bar>
              </div>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/request";
import Chart from "@/components/chart/Chart";
import Options from "@/components/chart/options";
import Date from "@/components/chart/date";
export default {
  name: "chart-page",
  components: {
    Chart
  },
  props: ["type", "scope"],
  data() {
    return {
      options: Options.options()
    };
  },
  computed: {
    sumName() {
      return (this.type === "pay" && "总支出") || "总收入";
    },
    sum() {
      return this.formatMoneyWithOptionalDecimal(
        (this.dataList.length < 1 ? [0] : this.dataList).reduce(
          (a, b) => a + b
        ) || 0
      );
    },
    avg() {
      return (
        this.formatMoneyWithOptionalDecimal(
          (this.dataList.length < 1 ? [0] : this.dataList).reduce(
            (a, b) => a + b
          ) / this.dataList.length
        ) || 0
      );
    },
    chartData() {
      const { selectedUnit } = this;
      if (!selectedUnit) return {};
      const { scope } = this;
      const { start, end } = selectedUnit;
      let labels = [];
      switch (scope) {
        case "week":
          labels = Options.weekLabels(start, end);
          break;
        case "month":
          labels = Options.dayLabelsForMonth(start, end);
          break;
        case "year":
          labels = Options.monthLabels(start, end);
          break;
      }
      return {
        labels,
        datasets: [
          {
            ...Options.dataSetItem(),
            data: this.dataList
          }
        ]
      };
    },
    unitIndex: {
      get() {
        return this.$store.state.chart.unitIndex;
      },
      set(s) {
        this.$store.commit("setChartUnitIndex", s);
      }
    },
    selectedUnitIndex: {
      get() {
        return (
          (this.unitIndex === -1 && this.unitList.length - 1) || this.unitIndex
        );
      },

      set(s) {
        this.unitIndex = s;
      }
    },
    unitList: {
      get() {
        return this.$store.state.chart.dateUnits;
      },
      set(s) {
        this.$store.commit("setChartDateUnits", s);
      }
    },
    rankList: {
      get() {
        return this.$store.state.chart.rankList;
      },
      set(s) {
        this.$store.commit("setChartRankList", s);
      }
    },
    dataList: {
      get() {
        return this.$store.state.chart.dataList;
      },
      set(s) {
        this.$store.commit("setChartDataList", s);
      }
    },
    selectedUnit() {
      const { selectedUnitIndex } = this;
      if (selectedUnitIndex === undefined) return;
      return this.unitList[selectedUnitIndex];
    },
    loaded: {
      get() {
        return this.$store.state.loaded.chart;
      },
      set(s) {
        this.$store.commit("setLoaded", { name: "chart", value: s });
      }
    },
    amountLoading: {
      get() {
        return this.$store.state.loading.amount;
      },
      set(s) {
        this.$store.commit("setLoading", { name: "amount", s });
      }
    },
    rankLoading: {
      get() {
        return this.$store.state.loading.rank;
      },
      set(s) {
        this.$store.commit("setLoading", { name: "rank", s });
      }
    }
  },
  watch: {
    scope(n, o) {
      this.loadUnits();
    },
    selectedUnit(n, o) {
      this.loadRank();
      this.loadAmount();
    },
    type(n, o) {
      this.loadAmount();
      this.loadRank();
    }
  },

  created() {
    this.loadUnits();
  },

  mounted() {
    this.renderChart();
  },

  methods: {
    loadUnits() {
      axios.get("/record/first").then(({ data }) => {
        this.loaded = true;
        const { createdAt } = data;
        let dateUnits;
        switch (this.scope) {
          case "week":
            dateUnits = Date.weekUnits(createdAt);
            break;
          case "month":
            dateUnits = Date.monthUnits(createdAt);
            break;
          case "year":
            dateUnits = Date.yearUnits(createdAt);
            break;
          default:
        }
        this.unitList = dateUnits;
        this.selectedUnitIndex = this.unitList.length - 1;
      });
    },

    loadRank() {
      const { selectedUnit } = this;
      if (!selectedUnit) return;
      const { start, end } = selectedUnit;
      const type = this.type.toUpperCase();
      axios
        .get("/record/rank", {
          params: {
            start,
            end,
            type
          }
        })
        .then(({ data }) => {
          this.rankList = data
            .map(i => {
              i.name = i.categoryName;
              return i;
            })
            .sort((a, b) => b.ratio - a.ratio);
        });
    },

    loadAmount() {
      this.amountLoading = true;
      const { scope } = this;
      switch (scope) {
        case "week":
          if (!this.amountLoading) {
            this.loadWeekAmount().then(r => {
              this.amountLoading = false;
            });
          }
          break;
        case "month":
          if (!this.amountLoading) {
            this.loadMonthAmount().then(r => {
              this.amountLoading = false;
            });
          }
          break;
        case "year":
          break;
        default:
      }
    },

    loadWeekAmount() {
      const { selectedUnit } = this;
      if (!selectedUnit) return;
      const { start, end } = selectedUnit;
      const type = this.type.toUpperCase();
      return axios
        .get("/record/days", {
          params: {
            start,
            end,
            type
          }
        })
        .then(({ data }) => {
          const dates = Options.datesBetween(start, end);
          const result = [];
          let index;
          for (let date of dates) {
            if (-1 === (index = data.findIndex(d => d.date === date))) {
              result.push(0);
            } else {
              result.push(data[index].amount);
            }
          }
          this.dataList = result;
        });
    },

    loadMonthAmount() {
      const { selectedUnit } = this;
      if (!selectedUnit) return;
      const { start, end } = selectedUnit;
      const type = this.type.toUpperCase();
      return axios
        .get("/record/days", {
          params: {
            start,
            end,
            type
          }
        })
        .then(({ data }) => {
          const dates = Options.datesBetween(start, end);
          const result = [];
          let index;
          for (let date of dates) {
            if (-1 === (index = data.findIndex(d => d.date === date))) {
              result.push(0);
            } else {
              result.push(data[index].amount);
            }
          }
          this.dataList = result;
        });
    },

    renderChart() {
      this.$refs.chart.render();
    },

    getCategory(category) {
      return (
        this.$store.getters.findCategoryByName(category.name) || {
          icon: "fa-star"
        }
      );
    },

    formatMoneyWithOptionalDecimal(amount) {
      return Math.floor(amount * 100) / 100;
    },

    formatRatio(r) {
      return `${Math.floor(r * 100) || "<1"}%`;
    },

    getCategoryName(item) {
      return this.getCategory(item).display || item.name;
    }
  }
};
</script>
<style scoped>
.analyse {
  padding: 1em 1em 0 1em;
  font-size: 12px;
}

.analyse p {
  display: block;
  line-height: 0.2;
  color: #999999;
}

.chart {
  width: 100%;
  padding: 0 0 0.6em 0;
}

.item-icon {
  background-color: #26a2ff;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: white;
}

.list-label-right {
  color: #525d67;
}

.categories {
  font-size: 14px;
}

.progress-wrapper {
  width: 100%;
  padding: 0 1em 0 0;
}

.amount {
  position: absolute;
  right: 18px;
  top: 14px;
}

.no-data {
  top: 110%;
}

.v-tabs .v-tabs__div {
  max-width: 70px !important;
}
.v-tabs .theme--light.v-tabs__bar .v-tabs__div {
  color: rgba(74, 86, 96, 0.8) !important;
}
.v-tabs .v-tabs__container--centered .v-tabs__slider-wrapper + .v-tabs__div,
.v-tabs .v-tabs__container--centered > .v-tabs__div:first-child {
  margin-left: 0 !important;
}

.categories * {
  z-index: 1 !important;
}

.v-tabs {
  position: fixed !important;
  width: 100% !important;
  z-index: 2 !important;
}

.chart-wrapper {
  padding-top: 40px;
}

.center,
.amount {
  font-size: 14px;
}
</style>
