<template>
  <v-ons-page>
    <Title back title="分类管理"/>
    <div class="wrapper">
      <v-ons-list>
        <draggable v-model="list" group="people" @start="drag=true" @end="drag=false">
          <v-ons-list-item v-for="i in list" :key="i.id" style="background-color:white;">
            <div class="left" @click="hideFromShow(i)">
              <v-ons-icon icon="md-minus-circle" class="item-operation item-delete"></v-ons-icon>
              <v-ons-icon :icon="i.icon" class="icon-category"></v-ons-icon>
            </div>
            <div class="center">{{i.name}}</div>
            <div class="right">
              <v-ons-icon icon="md-menu" class="item-move"></v-ons-icon>
            </div>
          </v-ons-list-item>
        </draggable>
      </v-ons-list>
      <v-ons-list v-if="hideList.length">
        <v-ons-list-header>更多类别</v-ons-list-header>
        <v-ons-list-item v-for="i in hideList" :key="i.id" style="background-color:white;">
          <div class="left" @click="addToShow(i)">
            <v-ons-icon icon="md-plus-circle" class="item-operation item-plus"></v-ons-icon>
            <v-ons-icon :icon="i.icon" class="icon-category"></v-ons-icon>
          </div>
          <div class="center">{{i.name}}</div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>

<script>
import Title from "@/components/Title";
import draggable from "vuedraggable";
export default {
  name: "Category",
  components: {
    Title,
    draggable
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "饮食",
          icon: "md-local-dining",
          hide: false
        },
        {
          id: 2,
          name: "交通",
          icon: "md-directions-bus",
          hide: false
        },
        {
          id: 3,
          name: "零食",
          icon: "md-local-cafe",
          hide: false
        }
      ],
      hideList: [
        {
          id: 4,
          name: "学习",
          icon: "md-local-cafe",
          hide: true
        },
        {
          id: 5,
          name: "健身",
          icon: "md-local-cafe",
          hide: true
        }
      ]
    };
  },
  methods: {
    addToShow(item) {
      item.hide = false;
      this.list.push(item);
      const { hideList } = this;
      const index = hideList.indexOf(item);
      if (index > -1) {
        hideList.splice(index, 1);
      }
    },
    hideFromShow(item) {
      item.hide = true;
      const { list } = this;
      if(list.length == 1) {
        this.$ons.notification.alert('至少要保留一个分类哦');
        return;
      }
      const index = list.indexOf(item);
      if (index > -1) {
        list.splice(index, 1);
      }
      this.hideList.push(item);
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
  color: green;
}

.list-header {
  color: #838383;
}

.list-item {
  color: #5c5c5c;
  font-size: 16px;
}
</style>
