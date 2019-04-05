<template id="record">
  <div class="scroll">
    <c-title title="Bookit"/>
    <div class="wrapper fab-wrapper">
      <div class="head amount-slim" style>
        <div class="head-left box" @click="onClickDate">
          <div class="label name">
            <span>{{year}}年</span>
          </div>
          <span class="month">{{month}}</span>
          <span class="label">月</span>
          <font-awesome-icon icon="caret-down"/>
        </div>
        <div class="head-right box">
          <div class="label name">
            <span>收入</span>
          </div>
          <div>
            <number :number="income" :visible.sync="amountVisible" class="amount"/>
          </div>
        </div>
        <div class="head-right box">
          <div class="label name">
            <span>支出</span>
          </div>
          <div>
            <number :number="pay" :visible.sync="amountVisible" class="amount"/>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="no-data">
          <img src="@/assets/no-data.svg" v-show="!list.length">
          <span>暂无数据，快去记账吧</span>
        </div>
        <v-ons-list>
          <div v-for="(day, index) in list" :key="index">
            <v-ons-list-header class="amount-round">
              <span class="list-label">{{day.date}}</span>
              <span class="list-label">星期{{["一", "二", "三", "四", "五","六", "日"][day.dayOfWeek]}}</span>
              <div class="list-head-right list-label">
                <span class="list-label">收入: {{formatMoneyWithOptionalDecimal(day.income)}}</span>
                <span class="list-label">支出: {{formatMoneyWithOptionalDecimal(day.pay)}}</span>
              </div>
            </v-ons-list-header>

            <v-ons-list-item v-for="(item, index) in day.list" :key="index" @press="loadSettings">
              <div class="left">
                <v-ons-icon :icon="getCategory(item).icon" class="item-icon"></v-ons-icon>
              </div>
              <div class="center">{{item.name}}</div>
              <div class="right amount-round">
                <span class="list-label-right">{{formatMoneyWithOptionalDecimal(item.amount)}}</span>
              </div>
            </v-ons-list-item>
          </div>
        </v-ons-list>
      </div>
      <v-btn absolute dark fab bottom right @click="handleNewRecord">
        <v-ons-icon icon="md-plus"></v-ons-icon>
      </v-btn>
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
    </div>
  </div>
</template>

<script>
import number from "@/components/number/Money";
import accounting from "accounting";
import axios from "@/request";
import {
  formatDate,
  getCurrentDateString,
  getFirstDayOf,
  getFirstDayOfNextMonthOf,
  getCurrentYearAndMonthString
} from "@/date";
export default {
  name: "record",
  components: {
    number
  },
  data() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return {
      dialogVisible: false,
      pickerDate: getCurrentYearAndMonthString(),
      year,
      month
    };
  },
  activated() {
    this.loadIfNeeded();
  },
  mounted() {
    this.loadIfNeeded();
  },
  computed: {
    startTime() {
      return getFirstDayOf(this.pickerDate);
    },
    endTime() {
      return getFirstDayOfNextMonthOf(this.pickerDate);
    },
    amountVisible() {
      return this.$store.state.record.amountVisible;
    },
    income() {
      return this.$store.state.record.income;
    },
    pay() {
      return this.$store.state.record.pay;
    },
    list() {
      return this.$store.state.record.list;
    },
    loaded() {
      return this.$store.state.loaded.record;
    }
  },
  watch: {
    year(n, o) {
      this.loadData();
    },
    month(n, o) {
      this.loadData();
    }
  },
  methods: {
    onClickDate() {
      this.dialogVisible = true;
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
    },

    formatMoneyWithOptionalDecimal(amount) {
      return Math.floor(amount * 100) / 100;
    },

    loadIfNeeded() {
      if (!this.loaded) {
        this.loadData();
      }
    },

    loadData() {
      this.loadRecords();
      this.loadSum();
      this.loadSettings();
    },

    loadRecords() {
      axios
        .get("/record", {
          params: {
            start: this.startTime,
            end: this.endTime
          }
        })
        .then(({ data }) => {
          this.$store.commit("setLoaded", "record");
          this.$store.commit(
            "setRecordList",
            data.map(unit => {
              const transformedList = unit.list.map(record => ({
                ...record,
                category: record.categoryName,
                name: record.comment
              }));
              unit.list = transformedList;
              return unit;
            })
          );
        });
    },

    loadSum() {
      axios
        .get("/record/sum", {
          params: {
            start: this.startTime,
            end: this.endTime
          }
        })
        .then(({ data: { income, pay } }) => {
          const { $store } = this;
          $store.commit("setRecordIncome", income);
          $store.commit("setRecordPay", pay);
        });
    },

    loadSettings() {
      axios.get("/settings").then(({ data: { showAmount } }) => {
        this.$store.commit("setRecordAmountVisible", showAmount);
      });
    }
  }
};
</script>

<style scoped>
.head {
  box-shadow: #00cdff 0px 0px 20px 0px;
  height: 67px;
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

.label.name {
  opacity: 0.8;
}

.month {
  font-size: 28px;
}

.amount {
  display: block;
  font-size: 24px;
  margin-top: -4px;
}

.list-label {
  font-size: 12px;
  padding: 6px 4px;
  display: inline-flex;
  color: #9a9a9a;
}

.list-label-right {
  color: #525d67;
}

.list-head-right {
  position: absolute;
  right: 0;
  margin-top: -6px;
  padding-right: 12px;
}

.list {
  padding-top: 33px;
  font-size: 14px;
}

.item-icon {
  background-color: #26a2ff;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: white;
}

.no-data {
  position: absolute;
  top: 100%;
  margin: auto;
  display: block;
  opacity: 0.3;
}

.no-data img {
  width: 100%;
  height: 90px;
}

.no-data span {
  width: 100%;
  text-align: center;
  display: inline-block;
  line-height: 40px;
}
</style>
