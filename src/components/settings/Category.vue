<template>
  <v-ons-page>
    <c-title back title="分类管理"/>
    <div class="wrapper">
      <mt-navbar v-model="selected">
        <mt-tab-item id="t1">支出</mt-tab-item>
        <mt-tab-item id="t2">收入</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="t1">
          <CategoryContent type="pay"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="t2">
          <CategoryContent type="income"/>
        </mt-tab-container-item>
      </mt-tab-container>
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
      selected: "t1"
    };
  },
  methods: {}
};
</script>

<style scoped>
.mint-tab-item.is-selected {
  z-index: 1;
}

.mint-tab-container {
  padding-top: 22px;
}
</style>
