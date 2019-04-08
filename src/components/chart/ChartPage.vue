<template>
  <div>
    <div class="analyse">
      <p>总支出: {{sum}}</p>
      <p>平均值: {{avg}}</p>
    </div>
    <div class="chart">
      <Chart ref="chart" :chartData="data" :options="options" :height="100"/>
    </div>
    <div></div>
    <div class="analyse">
      <p>支出排行榜</p>
    </div>
    <div class="categories">
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
export default {
  name: "chart-page",
  components: {
    Chart
  },
  data() {
    return {
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
      data: {
        labels: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        datasets: [
          {
            pointBackgroundColor: "rgb(38, 162, 255)",
            pointStyle: "round",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.40)",
            lineTension: 0.1,
            fill: false,
            data: [0, 0, 0, 0, 0, 40, 3229, 8034, 402, 230, 1222, 11]
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 10
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    sum() {
      return 1924.35;
    },
    avg() {
      return 239.63;
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
</style>
