<template>
  <div>
    <c-title back title="记一笔"></c-title>
    <div class="wrapper card-wrapper">
      <v-ons-card>
        <div>
          <label class="label" for="date">日期</label>
          <span id="date" class="input" @click="onClickDate">{{dateDisplay}}</span>
        </div>
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
            min="0.01"
            max="999999"
            placeholder="￥0.00"
            step="0.01"
            v-model="amount"
            required
          >
        </div>
      </v-ons-card>
      <v-btn class="btn" @click.native="onClickSave" color="info" large dark round>保存</v-btn>
    </div>
    <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" @confirm="confirmDate"></mt-datetime-picker>
  </div>
</template>

<script>
import { getDisplayOf } from "@/category";
import { getCurrentDate, formatDate } from "@/date";
import axios from "@/request";
export default {
  data() {
    const {
      selectedCategory: { name, display },
      recordType,
      selectedBook
    } = this.$store.state;
    return {
      amount: "",
      comment: display,
      category: name || display,
      pickerValue: new Date(),
      date: new Date(),
      type: recordType,
      selectedBook
    };
  },
  created() {},
  methods: {
    onClickDate() {
      this.$refs.picker.open();
    },
    confirmDate() {
      this.date = this.pickerValue;
    },
    onClickSave() {
      const {
        amountValue,
        comment,
        category,
        type,
        dateValue,
        selectedBook
      } = this;
      axios
        .post("/record", {
          type,
          categoryName: category,
          amount: amountValue,
          comment,
          createdAt: dateValue,
          bookId: selectedBook.id
        })
        .then(r => {
          this.$store.commit("setLoaded", "record");
          this.$router.replace("/");
        });
    }
  },
  computed: {
    dateDisplay() {
      return formatDate(this.date);
    },
    dateValue() {
      return formatDate(this.date);
    },
    amountValue() {
      const amount = this.amount || 0;
      return this.type == "PAY" ? -amount : amount;
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
