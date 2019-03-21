<template>
  <v-ons-page>
    <v-ons-tabbar :swipeable="false">
      <template slot="pages">
        <transition>
          <keep-alive>
            <div class="tab-item">
              <component :is="currentPage"></component>
            </div>
          </keep-alive>
        </transition>
      </template>

      <v-ons-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :label="tab.label"
        :icon="tab.icon"
        @click.prevent="currentPage=tabs[index].name;"
        :active="tab.name === getCurrentPage()"
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
      activeIndex: this.$store.state.activeIndex || 3,
      currentPage: this.getCurrentPage(),
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

  computed: {},

  activated() {
    this.currentPage = this.getCurrentPage();
  },

  mounted() {
    console.log(this.activeIndex);
  },

  methods: {
    getCurrentPage() {
      return this.$store.getters.currentPage || "record";
    }
  },

  watch: {
    currentPage(n, o) {
      this.$store.commit("setCurrentPage", n);
    }
  },

  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-item {
  overflow-y: scroll;
}
</style>
