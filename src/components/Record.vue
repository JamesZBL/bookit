<template id="record">
  <v-ons-page>
    <c-title title="Bookit"/>
    <div class="wrapper">
      <div class="head" style="box-shadow: #00cdff 0px 0px 20px 0px;">
        <div class="head-left box" @click="onClickDate">
          <div class="label">
            <span>{{year}}年</span>
          </div>
          <span class="month">{{month}}</span>
          <span class="label">月</span>
          <font-awesome-icon icon="caret-down"/>
        </div>
        <div class="head-right box">
          <div class="label">
            <span>收入</span>
          </div>
          <div>
            <span class="amount">{{income}}</span>
          </div>
        </div>
        <div class="head-right box">
          <div class="label">
            <span>支出</span>
          </div>
          <div>
            <span class="amount">{{pay}}</span>
          </div>
        </div>
      </div>

      <div class="list">
        <v-ons-list>
          <div v-for="(day, index) in list" :key="index">
            <v-ons-list-header>
              <span class="list-label">{{day.date}}</span>
              <div class="list-head-right list-label">
                <span class="list-label">收入: {{day.income}}</span>
                <span class="list-label">支出: {{day.pay}}</span>
              </div>
            </v-ons-list-header>

            <v-ons-list-item v-for="(item, index) in day.list" :key="index">
              <div class="left">
                <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
              </div>
              <div class="center">{{item.name}}</div>
              <div class="right">
                <span class="list-label-right">{{`${item.amount > 0 ? '+' : ''}${item.amount}`}}</span>
              </div>
            </v-ons-list-item>
          </div>
        </v-ons-list>
      </div>

      <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" @confirm="handleConfirm"></mt-datetime-picker>
    </div>
    <v-ons-fab
      style="box-shadow: #26a2ff 0px 2px 10px 0px;"
      position="bottom right"
    >
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
export default {
  name: "Record",
  data() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return {
      year,
      month,
      pickerValue: `${year}-${month}-01`,
      income: "0.00",
      pay: "0.00",
      list: [
        {
          date: "2019-03-02",
          pay: 23,
          income: 9000,
          list: [
            {
              name: "键盘",
              category: "数码",
              amount: -2
            },
            {
              name: "买了块表",
              category: "数码",
              amount: -200
            },
            {
              name: "鼠标",
              category: "数码",
              amount: -2
            },
            {
              name: "耳机",
              category: "数码",
              amount: -130.2
            }
          ]
        },
        {
          date: "2019-03-02",
          pay: 23,
          income: 9000,
          list: [
            {
              name: "工资",
              category: "数码",
              amount: 7999
            },
            {
              name: "水杯",
              category: "数码",
              amount: -20
            },
            {
              name: "自行车",
              category: "数码",
              amount: -2
            },
            {
              name: "汽车",
              category: "数码",
              amount: -200000
            }
          ]
        },
        {
          date: "2019-03-02",
          pay: 23,
          income: 9000,
          list: [
            {
              name: "轮胎",
              category: "数码",
              amount: -2
            },
            {
              name: "水蜜桃",
              category: "数码",
              amount: -2
            },
            {
              name: "剃须刀",
              category: "数码",
              amount: -2
            },
            {
              name: "代码整洁之道",
              category: "数码",
              amount: -2
            }
          ]
        }
      ]
    };
  },

  methods: {
    onClickDate() {
      this.$refs.picker.open();
    },

    handleConfirm() {
      const date = new Date(this.pickerValue);
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
    }
  },

  computed: {}
};
</script>

<style scoped>
.head {
  height: 65px;
  background: linear-gradient(#26a2ff, #00cdff);
  color: white;
  margin-bottom: 4px;
  position: fixed;
  z-index: 1;
  width: 100%;
}

.head-left {
  width: 30%;
  border-right: 1px solid rgba(255, 255, 255, 0.29);
}

.head-right {
  width: 400px;
}

.box {
  display: table-cell;
  padding: 0 1em;
  height: 40px;
}

.label {
  font-size: 12px;
  font-weight: 500;
}

.month {
  font-size: 28px;
}

.amount {
  display: block;
  font-size: 24px;
  margin-top: 3px;
}

.list-label {
  font-size: 12px;
  padding: 6px 10px;
  display: inline-flex;
  color: #9a9a9a;
}

.list-label-right {
  color: #9a9a9a;
}

.list-head-right {
  position: absolute;
  right: 0;
  margin-top: -5px;
}

.mint-cell-wrapper {
  background-image: linear-gradient(
    180deg,
    #f50000,
    #ec0101 50%,
    transparent 50%
  ) !important;
}

.list {
  padding-top: 32px;
}

.wrapper {
  margin-bottom: 90px;
}
</style>
