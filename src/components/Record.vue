<template>
  <div>
    <mt-header fixed title="Bookit" style="z-index:2;"></mt-header>
    <div class="wrapper">
      <div class="head" style="box-shadow: #00cdff 0px 0px 20px 0px;">
        <div class="left box" @click="onClickDate">
          <div class="label">
            <span>{{year}}年</span>
          </div>
          <span class="month">{{month}}</span>
          <span class="label">月</span>
          <font-awesome-icon icon="caret-down" />
        </div>
        <div class="right box">
          <div class="label">
            <span>收入</span>
          </div>
          <div>
            <span class="amount">{{income}}</span>
          </div>
        </div>
        <div class="right box">
          <div class="label">
            <span>支出</span>
          </div>
          <div>
            <span class="amount">{{pay}}</span>
          </div>
        </div>
      </div>

      <div class="list">
        <div v-for="(day, index) in list" :key="index">
          <span class="list-label">{{day.date}}</span>
          <div class="list-label-right list-label">
            <span class="list-label">收入: {{day.income}}</span>
            <span class="list-label">支出: {{day.pay}}</span>
          </div>
          <mt-cell v-for="(item, index) in day.list" :key="index" :title="item.name">
            <span>{{item.amount>0?'+':''}}{{item.amount}}</span>
            <img slot="icon" src="" width="24" height="24" >
          </mt-cell>
        </div>
      </div>


     <mt-datetime-picker
        ref="picker"
        v-model="pickerValue"
        type="date"
        @confirm="handleConfirm">
      </mt-datetime-picker>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Record',
  data() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return {
      year,
      month,
      pickerValue: `${year}-${month}-01`,
      income: '0.00',
      pay: '0.00',
      list: [
        {
          date: '2019-03-02',
          pay: 23,
          income: 9000,
          list: [
            {
              name: '键盘',
              category: '数码',
              amount: -2,
            },{
              name: '买了块表',
              category: '数码',
              amount: -200,
            },{
              name: '鼠标',
              category: '数码',
              amount: -2,
            },{
              name: '耳机',
              category: '数码',
              amount: -130.20,
            },
          ]
        },{
          date: '2019-03-02',
          pay: 23,
          income: 9000,
          list: [
            {
              name: '工资',
              category: '数码',
              amount: 7999,
            },{
              name: '水杯',
              category: '数码',
              amount: -20,
            },{
              name: '自行车',
              category: '数码',
              amount: -2,
            },{
              name: '汽车',
              category: '数码',
              amount: -200000,
            },
          ]
        },{
          date: '2019-03-02',
          pay: 23,
          income: 9000,
          list: [
            {
              name: '键盘',
              category: '数码',
              amount: -2,
            },{
              name: '键盘',
              category: '数码',
              amount: -2,
            },{
              name: '键盘',
              category: '数码',
              amount: -2,
            },{
              name: '键盘',
              category: '数码',
              amount: -2,
            },
          ]
        },
      ]
    }
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

  computed: {

  }
}
</script>

<style scoped>
  .head {
    height: 65px;
    background: linear-gradient(#26a2ff, #00cdff);
    color: white;
    margin-bottom: 4px;
    position: fixed;
    z-index: 1;
  }

  .left {
    width: 30%;
    border-right: 1px solid rgba(255, 255, 255, 0.29);
  }

  .right {
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
    display: inline-flex;
    position: absolute;
    right: 0;
    margin-top: -8px;
  }

  .mint-cell-wrapper {
    background-image: linear-gradient(180deg, #f50000, #ec0101 50%, transparent 50%) !important;
  }

  .list {
    padding-top: 70px;
  }
</style>
