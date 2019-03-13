<template>
  <v-ons-page>
    <c-title back title="记一笔"></c-title>
    <div class="wrapper card-wrapper">
      <v-ons-card>
        <div>
          <label class="label" for="comment">备注</label>
          <input id="comment" type="text" maxlength="6" class="input" v-model="comment">
        </div>
        <div>
          <label class="label" for="amount">金额</label>
          <input
            id="amount"
            type="number"
            maxlength="8"
            class="input"
            max="999999"
            min="0.01"
            placeholder="￥0.00"
            v-model="amount"
          >
        </div>
        <div>
          <label class="label" for="date">日期</label>
          <span
            id="date"
            class="input"            
            @click="onClickDate"
          >
          {{dateDisplay}}
          </span>
        </div>
      </v-ons-card>
      <mt-button class="btn" @click.native="onClickSave" size="large" type="default">保存</mt-button>
    </div>
    <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" @confirm="confirmDate"></mt-datetime-picker>
  </v-ons-page>
</template>

<script>
import { getDisplayOf } from "@/category";
import { getCurrentDate, formatDate } from "@/date";
export default {
  data() {
    return {
      amount: "￥0.00",
      comment: null,
      category: null,
      pickerValue: getCurrentDate(),
      date: getCurrentDate()
    };
  },
  created() {
    this.category = this.$route.params.category;
    this.comment = getDisplayOf(this.category);
  },
  methods: {
    onclickSave() {},
    onClickDate() {
      this.$refs.picker.open();
    },
    confirmDate() {
      this.date = this.pickerValue;
    }
  },
  computed: {
    dateDisplay() {
      return formatDate(this.date);
    }
  }
};
</script>

<style scoped>
.input {
  display: inline-block;
  width: 100%;
  border: none;
  height: 40px;
  font-size: 32px;
  text-align: right;
  border-bottom: 1px #dcdcdc solid;
  margin-top: 20px;
  margin-bottom: 20px;
}

::placeholder {
  color: #2c3e50;
  opacity: 1;
}

.label {
  color: #999;
}
</style>
