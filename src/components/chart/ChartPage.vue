<template>
  <div>
    <v-tabs
      fixed-tabs
      right
      centered
      slider-color="rgba(74, 86, 96, 0.8)"
      height="38px"
      v-model="selectedUnitIndex"
    >
      <v-tab v-for="(unit, n) in unitList" :key="n" :value="n">{{ unit.display }}</v-tab>
    </v-tabs>
    <div class="analyse">
      <p>总支出: {{sum}}</p>
      <p>平均值: {{avg}}</p>
    </div>
    <div class="chart">
      <Chart ref="chart" :chartData="chartData" :options="options" :height="100"/>
    </div>
    <div class="analyse">
      <p>{{type.display}}排行榜</p>
    </div>
    <div class="categories">
      <div class="no-data" v-show="!list.length">
        <img src="@/assets/no-data.svg">
        <span>暂无数据</span>
      </div>
      <v-ons-list>
        <v-ons-list-item class="amount-round" v-for="(item, index) in list" :key="index">
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
</template>
<script>
import Chart from "@/components/chart/Chart";
import Options from "@/components/chart/options";
export default {
  name: "chart-page",
  components: {
    Chart
  },
  props: ["type", "scope"],
  data() {
    return {
      scopeIndex: -1,
      unitList: [
        {
          display: "本周",
          start: "2019-04-01",
          end: "2019-04-07"
        },{
          display: "本周",
          start: "2019-04-01",
          end: "2019-04-07"
        },
      ],
      list: [
        {
          name: "food",
          amount: 350.29,
          ratio: 0.93
        },
        {
          name: "learning",
          amount: 50.29,
          ratio: 0.12
        },
        {
          name: "transportation",
          amount: 10.29,
          ratio: 0.08
        }
      ],
      dataList: [0, 0, 1, 4, 8, 9, 2, 8, 9, 2, 10, 32],
      options: Options.options()
    };
  },
  computed: {
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
      return {
        labels: Options.dayLabels(31),
        datasets: [
          {
            ...Options.dataSetItem(),
            data: this.dataList
          }
        ]
      };
    },
    selectedUnitIndex: {
      get() {
        return this.scopeIndex === -1
          ? this.unitList.length - 1
          : this.scopeIndex;
      },

      set(s) {
        this.scopeIndex = s;
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
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
      return `${Math.floor(r * 100)}%`;
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
  font-size: 10px;
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
</style>
