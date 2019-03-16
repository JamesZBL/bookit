<template>
  <div>
    <v-ons-list>
      <draggable v-model="visibleCategories" group="people" @start="drag=true" @end="drag=false">
        <v-ons-list-item
          v-for="(i, index) in visibleCategories"
          :key="index"
          style="background-color:white;"
        >
          <div class="left" @click="hideFromShow(i)">
            <v-ons-icon icon="md-minus-circle" class="item-operation item-delete"></v-ons-icon>
            <v-ons-icon :icon="i.icon" class="icon-category"></v-ons-icon>
          </div>
          <div class="center">{{i.display}}</div>
          <div class="right">
            <v-ons-icon icon="md-menu" class="item-move"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </draggable>
    </v-ons-list>
    <v-ons-list v-if="hiddenCategories.length">
      <v-ons-list-header>更多类别</v-ons-list-header>
      <v-ons-list-item v-for="i in hiddenCategories" :key="i.id" style="background-color:white;">
        <div class="left" @click="addToShow(i)">
          <v-ons-icon icon="md-plus-circle" class="item-operation item-plus"></v-ons-icon>
          <v-ons-icon :icon="i.icon" class="icon-category"></v-ons-icon>
        </div>
        <div class="center">{{i.display}}</div>
      </v-ons-list-item>
    </v-ons-list>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "category-content",
  components: {
    draggable
  },
  props: {
    type: String
  },
  data() {
    const { $store } = this;
    const { state, getters } = $store;
    const { visibleCategories, hiddenCategories } = $store.getters;
    const { type } = this;
    return {
      visibleCategories: visibleCategories(type),
      hiddenCategories: hiddenCategories(type)
    };
  },
  methods: {
    addToShow(item) {
      this.visibleCategories.push(item);
      const { hiddenCategories } = this;
      const index = hiddenCategories.indexOf(item);
      if (index > -1) {
        hiddenCategories.splice(index, 1);
      }
    },

    hideFromShow(item) {
      const { visibleCategories } = this;
      if (visibleCategories.length == 1) {
        this.$ons.notification.alert("至少要保留一个分类哦");
        return;
      }
      const index = visibleCategories.indexOf(item);
      if (index > -1) {
        visibleCategories.splice(index, 1);
      }
      if (!item.customed) {
        this.hideDefaultCategory(item);
      }
    },

    hideDefaultCategory(category) {
      const { $store } = this;
      $store.commit("hideDefaultCategory", category);
    }
  }
};
</script>
<style scoped>
.item-operation {
  margin-right: 20px;
  margin-left: 10px;
  font-size: 22px;
}

.item-delete {
  color: red;
}

.icon-category {
  font-size: 24px;
  color: #929292;
  width: 18px;
}

.item-move {
  color: #d0d0d0;
}

.item-plus {
  color: #40dc48;
}

.list-header {
  color: #838383;
}

.list-item {
  color: #5c5c5c;
  font-size: 16px;
}
</style>