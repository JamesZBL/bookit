<template>
  <div>
    <c-title back title="选择分类">
      <v-tabs v-model="selected" centered color="#26a2ff" slider-color="yellow" dark fixed-tabs>
        <v-tab v-for="(i, index) in tabs" :key="index" :href="`#${i.id}`">{{ i.display }}</v-tab>
      </v-tabs>
    </c-title>

    <div class="tab-wrapper">
      <v-tabs-items v-model="selected">
        <v-tab-item v-for="(i, index) in tabs" :key="index" :value="`${i.id}`">
          <RecordContent :type="i.type"/>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
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
          type: "pay",
          display: "支出"
        },
        {
          id: "t2",
          type: "income",
          display: "收入"
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
