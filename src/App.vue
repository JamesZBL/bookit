<template>
  <div id="app">
    <fade-transition>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
export default {
  name: "App",
  components: {
    FadeTransition
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
</style>
