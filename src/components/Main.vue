<template>
  <div>
    <v-ons-tabbar :tabs="tabs" :index.sync="activeIndex" animation="none"></v-ons-tabbar>
  </div>
</template>

<script>
import Analyse from "@/components/Analyse";
import Record from "@/components/Record";
import Book from "@/components/Book";
import About from "@/components/About";
import { TabContainer, TabContainerItem } from "mint-ui";
import { Tabbar, TabItem } from "mint-ui";
import { Header } from "mint-ui";
import categories from "@/category";

export default {
  name: "Main",
  components: {
    Analyse,
    Record,
    Book,
    About
  },
  data() {
    return {
      activeIndex: Number(sessionStorage.getItem("activeIndex")) || 0,
      tabId: "t1",
      tabs: [
        {
          icon: "md-money-box",
          label: "明细",
          badge: "",
          key: "record",
          page: Record
        },
        {
          icon: "md-chart",
          label: "图表",
          badge: "",
          key: "analyse",
          page: Analyse
        },
        {
          icon: "md-bookmark",
          label: "账本",
          badge: "",
          key: "book",
          page: Book
        },
        {
          icon: "md-account",
          label: "我的",
          badge: "",
          key: "about",
          page: About
        }
      ]
    };
  },

  methods: {
    initCategories() {
      const { $store } = this;
      // gotten hidden categories
      const hiddenCategories = [];
      // gotten customedCategories
      const customedCategories = [];
      const visibleCategories = [];
      hiddenCategories.forEach(hidden => {
        const find = categories.filter(c => c.name === hidden.name)[0];
        const index = categories.indexOf(find);
        categories.splice(index, 1);
      });
      categories.forEach(c => visibleCategories.push(c));
      customedCategories.forEach(c => visibleCategories.push(c));
      $store.commit("setVisibleCategories", visibleCategories);
      $store.commit("setHiddenCategories", hiddenCategories);
    }
  },

  watch: {
    activeIndex(n, o) {
      sessionStorage.setItem("activeIndex", n);
    }
  },

  created() {
    this.initCategories();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
