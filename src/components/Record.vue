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
            <number :number="income" class="amount"/>
          </div>
        </div>
        <div class="head-right box">
          <div class="label">
            <span>支出</span>
          </div>
          <div>
            <number :number="pay" class="amount"/>
          </div>
        </div>
      </div>

      <div class="list">
        <v-ons-list>
          <div v-for="(day, index) in list" :key="index">
            <v-ons-list-header>
              <span class="list-label">{{day.date}}</span>
              <div class="list-head-right list-label">
                <span class="list-label">收入: {{formatMoneyClean(day.income)}}</span>
                <span class="list-label">支出: {{formatMoneyClean(day.pay)}}</span>
              </div>
            </v-ons-list-header>

            <v-ons-list-item v-for="(item, index) in day.list" :key="index">
              <div class="left">
                <v-ons-icon :icon="getCategory(item).icon" class="item-icon"></v-ons-icon>
              </div>
              <div class="center">{{item.name}}</div>
              <div class="right">
                <span class="list-label-right">{{formatMoney(item.amount)}}</span>
              </div>
            </v-ons-list-item>
          </div>
        </v-ons-list>
      </div>
    </div>
    <v-ons-fab @click="handleNewRecord" position="bottom right">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
    <v-ons-dialog cancelable :visible.sync="dialogVisible">
      <v-date-picker
        v-model="pickerDate"
        locale="zh-cn"
        type="month"
        v-show="true"
        :reactive="true"
      >
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="onClickDateOk">OK</v-btn>
      </v-date-picker>
    </v-ons-dialog>
  </v-ons-page>
</template>

<script>
import number from "@/components/number/Money";
import accounting from "accounting";
export default {
  name: "Record",
  components: {
    number
  },
  data() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return {
      dialogVisible: false,
      pickerDate: new Date().toISOString().substring(0, 7),
      year,
      month,
      income: 99999,
      pay: 99999,
      list: [
        {
          date: "2019-03-02",
          pay: 23,
          income: 9000,
          list: [
            {
              name: "海底捞",
              category: "food",
              amount: -280
            },
            {
              name: "买了块劳力士",
              category: "shopping",
              amount: -1953.34
            },
            {
              name: "健身",
              category: "sport",
              amount: -200
            },
            {
              name: "Java编程思想",
              category: "learning",
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
              category: "salary",
              amount: 7999
            },
            {
              name: "水杯",
              category: "shopping",
              amount: -20
            },
            {
              name: "自行车",
              category: "car",
              amount: -2
            },
            {
              name: "汽车",
              category: "car",
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
              category: "car",
              amount: -2
            },
            {
              name: "水蜜桃",
              category: "fruit",
              amount: -2
            },
            {
              name: "剃须刀",
              category: "daily-use",
              amount: -2
            },
            {
              name: "代码整洁之道",
              category: "learning",
              amount: -2
            }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    onClickDate() {
      this.dialogVisible = true;
      console.log(this.pickerDate);
    },

    handleNewRecord() {
      this.$router.push("/record/new-select");
    },

    onClickDateOk() {
      this.dialogVisible = false;
      const yearAndMonth = this.pickerDate.split("-");
      this.year = yearAndMonth[0];
      this.month = yearAndMonth[1].replace(/^0/, "");
    },

    getCategory(record) {
      return (
        this.$store.getters.findCategoryByName(record.category) || {
          icon: "fa-star"
        }
      );
    },

    formatMoney(amount) {
      const prefix = 0 < amount ? "+" : "";
      return `${prefix}${this.formatMoneyClean(amount)}`;
    },

    formatMoneyClean(amount) {
      return accounting.formatMoney(amount, "");
    }
  }
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

.box {
  display: table-cell;
  padding: 0 0.5em;
  height: 40px;
}

.head-left {
  width: 25%;
  border-right: 1px solid rgba(255, 255, 255, 0.29);
  min-width: 90px;
  padding: 0 0.5em 0 1em;
}

.head-right {
  width: 400px;
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
}

.list-label {
  font-size: 12px;
  padding: 6px 10px;
  display: inline-flex;
  color: #9a9a9a;
}

.list-label-right {
  color: #9a9a9a;
  font-size: 16px;
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
  padding-bottom: 100px;
}

.item-icon {
  color: #acadad;
}
</style>
