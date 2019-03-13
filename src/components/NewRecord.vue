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
      </v-ons-card>
      <mt-button
        class="btn"
        @click.native="onClickSave"
        size="large"
        type="default"
      >保存</mt-button>
    </div>
  </v-ons-page>
</template>

<script>
import { getDisplayOf } from "@/category";
export default {
  data() {
    return {
      amount: "￥0.00",
      comment: null
    };
  },
  created() {
    this.comment = getDisplayOf(this.$route.params.category);
  },
  methods: {
    onclickSave() {

    }
  },
  computed: {}
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
