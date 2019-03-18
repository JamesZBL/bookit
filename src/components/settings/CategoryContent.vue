<template>
  <div>
    <v-ons-list>
      <draggable v-model="visibleCategories" handle=".handle" @change="onDragCategories">
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
          <div class="right handle">
            <v-ons-icon icon="md-menu" class="item-move"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </draggable>
    </v-ons-list>
    <v-ons-list v-if="hiddenCategories.length">
      <v-ons-list-header>更多类别</v-ons-list-header>
      <v-ons-list-item
        v-for="(i, index) in hiddenCategories"
        :key="index"
        style="background-color:white;"
      >
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
    return {
      visibleCategories: this.$store.getters.visibleCategories(this.type),
      hiddenCategories: this.$store.getters.hiddenCategories(this.type)
    };
  },
  methods: {
    addToShow(item) {
      const { $store } = this;
      this.visibleCategories.push(item);
      this.hiddenCategories.splice(this.hiddenCategories.indexOf(item), 1);
      $store.commit("showDefaultCategory", item);
    },

    hideFromShow(item) {
      const { visibleCategories } = this;
      if (visibleCategories.length == 1) {
        this.$ons.notification.alert("至少要保留一个分类哦");
        return;
      }
      if (!item.customed) {
        this.hideDefaultCategory(item);
      } else {
        this.deleteCustomedCategory(item);
      }
    },

    hideDefaultCategory(item) {
      const { $store } = this;
      this.hiddenCategories.push(item);
      this.visibleCategories.splice(this.visibleCategories.indexOf(item), 1);
      $store.commit("hideDefaultCategory", item);
    },

    deleteCustomedCategory(category) {},

    onDragCategories() {
      this.$store.commit("reSortVisibleCategories", this.visibleCategories);
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
