<template id="record">
  <div class="scroll" v-if="show">
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
      <div class="list-wrapper" ref="list">
        <div class="no-data" v-show="!list.length">
          <img src="@/assets/no-data.svg">
          <span>暂无数据，快去记账吧</span>
        </div>
        <div class="lisb-under-fab">
          <v-ons-pull-hook
            :action="loadData"
            @changestate="state = $event.state"
            height="120px"
            threshold-height="1000px"
            :disabled="pullRefreshDisabled"
          >
            <span v-show="state === 'initial'">继续下拉刷新</span>
            <span v-show="state === 'preaction'">松开后刷新</span>
            <span v-show="state === 'action'">努力加载中...</span>
          </v-ons-pull-hook>
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

              <v-ons-list-item
                v-for="(item, index) in day.list"
                :key="index"
                @click="onClickRecord(item)"
              >
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
      </div>
      <v-btn absolute dark fab bottom right @click="handleNewRecord">
        <v-ons-icon icon="md-plus"></v-ons-icon>
      </v-btn>
    </div>
    <v-ons-dialog cancelable :visible.sync="dialogVisible">
      <v-date-picker v-model="tmpDate" locale="zh-cn" type="month" v-show="true" :reactive="true">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="onClickDateOk">OK</v-btn>
      </v-date-picker>
    </v-ons-dialog>
    <v-ons-action-sheet :visible.sync="actionSheetVisible" cancelable title="操作">
      <v-ons-action-sheet-button
        icon="md-square-o"
        modifier="destructive"
        @click="onClickRemoveRecord"
      >删除</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o" @click="actionSheetVisible = false">取消</v-ons-action-sheet-button>
    </v-ons-action-sheet>
  </div>
</template>

<script>
import number from "@/components/number/Money";
import accounting from "accounting";
import axios from "@/request";
import { toast } from "@/notification";
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
    return {
      show: true,
      scrollListenerAdded: false,
      listScrollTop: 0,
      state: "initial",
      tmpDate: getCurrentYearAndMonthString(),
      dialogVisible: false,
      actionSheetVisible: false,
      selectedRecordId: null
    };
  },
  created() {},
  activated() {
    this.fixBug();
    this.loadIfNeeded();
  },
  mounted() {
    this.loadIfNeeded();
  },
  updated() {
    if (!this.scrollListenerAdded) {
      this.addScrollListener();
      this.scrollListenerAdded = true;
    }
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
    },
    pickerDate: {
      get() {
        return this.$store.state.pickerDate || getCurrentYearAndMonthString();
      },
      set(d) {
        this.$store.commit("setPickerDate", d);
      }
    },
    year() {
      return new Date(this.pickerDate).getFullYear();
    },
    month() {
      return new Date(this.pickerDate).getMonth() + 1;
    },
    pullRefreshDisabled() {
      return this.listScrollTop > 0;
    },
    fixed() {
      return this.$store.state.loaded.fixBug;
    }
  },
  watch: {},
  methods: {
    fixBug() {
      if (!this.fixed) {
        this.show = false;
        const _this = this;
        setTimeout(() => {
          _this.show = true;
        }, 500);
        this.$store.commit("setLoaded", { name: "fixBug", value: true });
      }
    },

    addScrollListener() {
      const _this = this;
      const list = this.$refs.list;
      list.addEventListener("scroll", function() {
        _this.listScrollTop = list.scrollTop;
      });
    },

    onClickDate() {
      this.dialogVisible = true;
    },

    handleNewRecord() {
      this.$router.push("/record/new-select");
    },

    onClickDateOk() {
      this.dialogVisible = false;
      this.pickerDate = this.tmpDate;
      this.loadData();
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

    loadData(done) {
      this.loadRecords(done);
      this.loadSum();
      this.loadSettings();
    },

    loadRecords(done) {
      axios
        .get("/record", {
          params: {
            start: this.startTime,
            end: this.endTime
          }
        })
        .then(({ data }) => {
          this.$store.commit("setLoaded", { name: "record", value: true });
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
          if (done) {
            setTimeout(() => {
              done();
            }, 500);
          }
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
    },

    onClickRecord(r) {
      const { id } = r;
      this.selectedRecordId = id;
      this.actionSheetVisible = true;
    },

    onClickRemoveRecord() {
      const { selectedRecordId } = this;
      axios.delete(`/record/${selectedRecordId}`).then(r => {
        toast("已删除");
        this.actionSheetVisible = false;
        this.removeRecordFromList();
        this.loadSum();
        this.$store.commit("setLoaded", { name: "about", value: false });
        this.$store.commit("setLoaded", { name: "book", value: false });
      });
    },

    removeRecordFromList() {
      const { selectedRecordId } = this;
      this.$store.commit("removeRecordById", selectedRecordId);
    }
  }
};
</script>

<style scoped>
.head {
  position: absolute;
  height: 70px;
  color: white;
  z-index: 1;
  box-shadow: #00cdff 0px 0px 20px 0px;
  background: linear-gradient(#26a2ff, #00cdff);
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

.list-wrapper {
  position: absolute;
  font-size: 14px;
  margin-top: 148px;
  top: -80px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  height: -webkit-fill-available;
  z-index: 0;
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
  top: 30%;
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

.lisb-under-fab {
  margin-bottom: 100px;
  color: #a4a4a4;
}
</style>
