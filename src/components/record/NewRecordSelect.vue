<template>
  <v-ons-page>
    <c-title back title="选择分类"></c-title>
    <div class="wrapper">
      <mt-navbar v-model="selected">
        <mt-tab-item id="t1">支出</mt-tab-item>
        <mt-tab-item id="t2">收入</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="t1">
          <v-ons-list>
            <v-ons-list-item
              @click="gotoNew(i)"
              v-for="i in payCategories"
              :key="i.id"
              modifier="chevron"
              tappable
            >
              <div class="left">
                <v-ons-icon :icon="i.icon" class="icon-category"></v-ons-icon>
              </div>
              <div class="center">{{i.display}}</div>
            </v-ons-list-item>
          </v-ons-list>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </v-ons-page>
</template>

<script>
import categories from "@/category";
export default {
  name: "new-record-select",
  data() {
    const { $store } = this;
    const { state, getters } = $store;
    const { visibleCategories } = $store.getters;
    return {
      selected: "t1",
      payCategories: visibleCategories("pay"),
      incomeCategories: visibleCategories("income")
    };
  },
  methods: {
    gotoNew(type) {
      this.$router.replace(`/record/new`);
      this.$store.commit('setSelectCategory', type);
    }
  }
};
</script>
<style scoped>
.icon-category {
  font-size: 24px;
  color: #929292;
  width: 18px;
}

.mint-tab-container {
  padding-top: 22px;
}

.list-item__left {
  padding: 12px 14px 12px 10px;
}
</style>
