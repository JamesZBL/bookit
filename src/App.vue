<template>
  <div id="app">
    <fade-transition>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>

<script>
import categories from "@/category";
import { FadeTransition } from "vue2-transitions";
export default {
  name: "App",
  components: {
    FadeTransition
  },
  created() {
    
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

</style>
