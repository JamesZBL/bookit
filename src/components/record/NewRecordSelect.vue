<template>
  <v-ons-page>
    <c-title back title="选择分类"></c-title>
    <div class="wrapper">
      <mt-navbar v-model="selected">
        <mt-tab-item id="t1">支出</mt-tab-item>
        <mt-tab-item id="t2">收入</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(i, index) in tabs" :id="i.id" :key="index">
          <RecordContent :type="i.type" :tabId="i.id"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </v-ons-page>
</template>

<script>
import categories from "@/category";
import RecordContent from "@/components/record/RecordContent";
export default {
  name: "new-record-select",
  components: {
    RecordContent
  },
  data() {
    const { $store } = this;
    return {
      selected: "t1",
      tabs: [
        {
          id: "t1",
          type: "pay"
        },
        {
          id: "t2",
          type: "income"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
.mint-tab-container {
  padding-top: 22px;
}
</style>
