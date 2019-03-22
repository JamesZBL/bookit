<template>
  <div id="vapp">
    <v-app>
      <keep-alive include="Main">
        <router-view></router-view>
      </keep-alive>
    </v-app>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import categories from "@/category";
import books from "@/book";
import "@/fonts/fonts.css";
export default {
  name: "App",
  components: {
    FadeTransition
  },
  created() {
    this.initCategories();
    this.initBooks();
  },
  methods: {
    initCategories() {
      const { $store } = this;
      // TODO: gotten hidden categories
      const hiddenCategories = [];
      // TODO: gotten customedCategories
      const customedCategories = [];
      const visibleCategories = [];
      hiddenCategories.forEach(hidden => {
        const index = categories.findIndex(c => c.name === hidden.name);
        categories.splice(index, 1);
      });
      categories.forEach(c => visibleCategories.push(c));
      customedCategories.forEach(c => visibleCategories.push(c));
      $store.commit("setVisibleCategories", visibleCategories);
      $store.commit("setHiddenCategories", hiddenCategories);
    },

    initBooks() {
      const { $store } = this;
      $store.commit("setBooks", [books[0]]);
      $store.commit("setSelectedBook", books[0]);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
}

body {
  margin: 0;
}

.wrapper {
  position: absolute;
  width: 100%;
  top: 50px;
}

.tab-wrapper {
  position: absolute;
  width: 100%;
  top: 114px;
}

span {
  vertical-align: middle;
}

.mint-header-title {
  font-size: 20px;
}

.mint-navbar {
  padding: 0 24%;
}

.card-wrapper {
  padding-top: 5px;
}

.btn {
  width: 90%;
  margin: auto 5% !important;
}

.mint-navbar .mint-tab-item {
  color: #7d7c7c;
}

.v-btn--floating {
  box-shadow: #26a2ff 0px 2px 10px 0px !important;
  position: fixed !important;
  bottom: 16px !important;
  font-size: 24px !important;
  background-color: #26a2ff !important;
}

.ons-icon.fa {
  font-weight: 600;
  font-size: 14px !important;
}

.application--wrap {
  overflow-y: scroll;
}

.scroll {
  overflow-y: scroll;
}

.amount-slim {
  font-family: "Lato", Arial, Helvetica, sans-serif;
}

.amount-round {
  font-family: "Varela Round", Arial, Helvetica, sans-serif;
}
</style>
