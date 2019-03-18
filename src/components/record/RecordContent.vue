<template>
  <v-ons-list>
    <v-ons-list-item
      v-for="(i, index) in categories"
      @click="gotoNew(i)"
      :key="index"
      modifier="chevron"
      tappable
    >
      <div class="left">
        <v-ons-icon :icon="i.icon" class="icon-category"></v-ons-icon>
      </div>
      <div class="center">{{i.display}}</div>
    </v-ons-list-item>
  </v-ons-list>
</template>

<script>
export default {
  name: "record-content",
  props: {
    type: String
  },
  data() {
    const { $store } = this;
    const { visibleCategories } = $store.getters;
    return {
      categories: visibleCategories(this.type)
    };
  },
  methods: {
    gotoNew(type) {
      this.$router.replace(`/record/new`);
      this.$store.commit("setSelectCategory", type);
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

.list-item__left {
  padding: 12px 14px 12px 10px;
}
</style>
