<template>
  <div id="app">
    <fade-transition>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import categories from "@/category";
import books from "@/book";
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
        const find = categories.find(c => c.name === hidden.name);
        const index = categories.indexOf(find);
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
  margin-top: 50px;
}

span {
  vertical-align: middle;
}

.mint-header-title {
  font-size: 20px;
}

.mark {
  width: 1px;
  height: 1px;
  position: fixed;
  top: 100px;
  margin-left: 1px;
}

.mint-navbar {
  padding: 0 24%;
}

.card-wrapper {
  padding-top: 5px;
}

.btn {
  margin: auto;
  margin-top: auto;
  width: 92%;
  margin-top: 10px;
}

.mint-navbar .mint-tab-item {
  color: #7d7c7c;
}

ons-fab.fab,
ons-speed-dial-item.fab,
button.fab {
  box-shadow: #26a2ff 0px 2px 10px 0px;
}

ons-fab.fab,
ons-speed-dial-item.fab,
button.fab {
  background-color: #26a2ff;
}
</style>
