<template>
  <div>
    <mt-header fixed title="毛聪明记账"></mt-header>
    <div class="wrapper">
      <div class="head">
        <div class="left box" @click="onClickDate">
          <div class="label">
            <span>{{year}}年</span>
          </div>
          <span class="month">{{month}}</span>
          <span>月</span>
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
      income: 0,
      pay: 0,
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
    height: 3em;
    background-color: #26a2ff;
    color: white;
  }

  .left {
    width: 30%;
    border-right: 1px solid rgba(255, 255, 255, 0.29);
  }

  .right {
    width: 40%;
  }

  .box {
    display: table-cell;
    padding: 0 1em;
    height: 100%;
  }

  .label {
    font-size: 10px;
    font-weight: 100;
  }

  .month {
    font-size: 20px;
  }

  .amount {
    display: block;
    font-size: 14px;
    margin-top: 6px;
  }
</style>
