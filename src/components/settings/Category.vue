<template>
  <v-ons-page>
    <c-title back title="分类管理">
      <v-tabs v-model="selected" centered color="#26a2ff" slider-color="yellow" dark fixed-tabs>
        <v-tab v-for="(i, index) in tabs" :key="index" :href="`#${i.id}`">{{ i.display }}</v-tab>
      </v-tabs>
    </c-title>
    <div class="tab-wrapper">
      <v-tabs-items v-model="selected">
        <v-tab-item v-for="(i, index) in tabs" :key="index" :id="`${i.id}`">
          <CategoryContent :type="i.type"/>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-ons-page>
</template>

<script>
import CategoryContent from "./CategoryContent";
export default {
  name: "Category",
  components: {
    CategoryContent
  },
  data() {
    const { $store } = this;
    const { state, getters } = $store;
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
.mint-tab-item.is-selected {
  z-index: 1;
}
</style>
