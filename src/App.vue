<template>
  <div id="vapp">
    <v-app>
      <ZoomCenterTransition>
        <keep-alive include="Main">
          <router-view></router-view>
        </keep-alive>
      </ZoomCenterTransition>
    </v-app>
  </div>
</template>

<script>
import { ZoomCenterTransition } from "vue2-transitions";
import DefaultCategories from "@/category";
import { getCategoriesByType } from "@/category";
import books from "@/book";
import "@/fonts/fonts.css";
import axios from "@/request";
export default {
  name: "App",
  components: {
    ZoomCenterTransition
  },
  created() {
    this.initCategories();
    this.initBooks();
  },
  methods: {
    initCategories() {
      const { $store } = this;

      // fetch category order
      for (let type of ["INCOME", "PAY"]) {
        axios
          .get("/order", {
            params: {
              type
            }
          })
          .then(({ data: { names } }) => {
            const visibleCategories = [];
            for (let name of names) {
              let index = DefaultCategories.findIndex(c => c.name === name);
              let customed = -1 === index;
              let find = DefaultCategories[index];
              visibleCategories.push({
                customed,
                display: customed ? name : find.display,
                name: customed ? name : find.name,
                icon: customed ? "fa-star" : find.icon,
                type: type.toLowerCase()
              });
              if (!customed) DefaultCategories.splice(index, 1);
            }
            const restCategories = getCategoriesByType(type.toLowerCase());
            this.$store.commit("setVisibleCategoriesByType", visibleCategories);
            this.$store.commit("setHiddenCategoriesByType", restCategories);
          });
      }
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

.fab-wrapper {
  padding-bottom: 100px;
}

.center {
  color: #4a5660 !important;
}

.toast {
  margin: 60px 10px !important;
  background-color: rgba(55, 71, 79, 0.8) !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
}
</style>
