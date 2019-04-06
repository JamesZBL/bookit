<template>
  <v-ons-page>
    <v-ons-tabbar :swipeable="false">
      <template slot="pages">
        <keep-alive>
          <div class="scroll" ref="scroll">
            <component :is="currentPage"></component>
          </div>
        </keep-alive>
      </template>
      <v-ons-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :label="tab.label"
        :icon="tab.icon"
        @click.prevent="currentPage=tab.name;"
        :active="tab.name === currentPage"
      ></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import Analyse from "@/components/Analyse";
import Record from "@/components/Record";
import Book from "@/components/Book";
import About from "@/components/About";
import { TabContainer, TabContainerItem } from "mint-ui";
import { Tabbar, TabItem } from "mint-ui";
import { Header } from "mint-ui";
import { setMainColor } from "@/theme/statusbar";
import axios from "@/request";
import categories from "@/category";
import { getCategoriesByType, categoriesByType } from "@/category";

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
      currentPage: "record",
      tabs: [
        {
          icon: "md-money-box",
          label: "明细",
          badge: "",
          name: "record",
          path: "/record"
        },
        {
          icon: "md-chart",
          label: "图表",
          badge: "",
          name: "analyse",
          path: "/analyse"
        },
        {
          icon: "md-bookmark",
          label: "账本",
          badge: "",
          name: "book",
          path: "/book"
        },
        {
          icon: "md-account",
          label: "我的",
          badge: "",
          name: "about",
          path: "/about"
        }
      ]
    };
  },

  computed: {
    categoryLoaded() {
      return this.$store.state.loaded.category;
    }
  },

  created() {},

  mounted() {
    this.init();
  },

  activated() {
    setMainColor();
    this.currentPage = this.$store.getters.currentPage || "record";
    this.init();
  },

  methods: {
    init() {
      if (this.checkToken()) {
        this.loadIfNeeded();
      }
    },

    checkToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$store.commit("resetAll");
        this.$router.replace("/signin");
        return false;
      }
      return true;
    },

    loadIfNeeded() {
      if (!this.categoryLoaded) {
        this.$store.commit("setLoaded", "category");
        this.loadCategories();
      }
    },

    loadCategories() {
      const { $store } = this;
      for (let type of ["INCOME", "PAY"]) {
        axios
          .get("/order", {
            params: {
              type
            }
          })
          .then(({ data: { names } }) => {
            const DefaultCategories = categoriesByType(type.toLowerCase());
            const visibleCategories = [];
            if (!names.length) {
              this.$store.commit(
                "setVisibleCategoriesByType",
                DefaultCategories
              );
              return;
            }
            for (let name of names) {
              const index = DefaultCategories.findIndex(c => c.name === name);
              const customed = -1 === index;
              const find = DefaultCategories[index];
              visibleCategories.push({
                customed,
                display: customed ? name : find.display,
                name: customed ? name : find.name,
                icon: customed ? "fa-star" : find.icon,
                type: type.toLowerCase()
              });
              if (!customed) DefaultCategories.splice(index, 1);
            }
            const restCategories = DefaultCategories;
            this.$store.commit("setVisibleCategoriesByType", visibleCategories);
            this.$store.commit("setHiddenCategoriesByType", restCategories);
          });
      }
    }
  },

  watch: {
    currentPage(n, o) {
      this.$refs.scroll.scrollTop = 0;
      this.$store.commit("setCurrentPage", n);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-item {
  overflow-y: scroll;
}
</style>

<style>
:checked + .tabbar__button {
  color: #26a2ff !important;
}
</style>

