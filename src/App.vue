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
import books from "@/book";
import "@/fonts/fonts.css";
import axios from "@/request";
export default {
  name: "App",
  components: {},
  created() {},
  methods: {}
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
  padding-top: 20px;
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
  font-family: "Titillium Web", Arial, Helvetica, sans-serif;
}

.fab-wrapper {
  padding-bottom: 118px;
}

.center {
  color: #4a5660 !important;
  font-size: 16px;
}

.toast {
  margin: 60px 10px !important;
  background-color: rgba(55, 71, 79, 0.8) !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
}

.item-icon {
  width: 18px;
  margin-left: 6px;
  text-align: center;
}

.mint-indicator * {
  z-index: 3 !important;
}

.list-item__center,
.list-item__right {
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#e2e2e2),
    color-stop(50%, #e2e2e2),
    color-stop(50%, transparent)
  ) !important;
  background-image: linear-gradient(
    0deg,
    #e2e2e2,
    #e2e2e2 50%,
    transparent 50%
  ) !important;
}

.dialog-mask,
.action-sheet-mask,
.alert-dialog-mask {
  background-color: rgba(9, 39, 61, 0.3) !important;
}

.progress-bar__primary,
.progress-bar__secondary {
  background-color: #26a2ff !important;
  border-radius: 4px;
}

.progress-bar {
  height: 6px !important;
}

.select-dialog {
  top: 90px;
}

.select-dialog .dialog {
  top: 43px !important;
  min-width: 100% !important;
  min-height: 87px;
}

.select-dialog .dialog-container {
  border-radius: 0 !important;
}

.no-data {
  position: absolute;
  top: 30%;
  margin: auto;
  display: block;
  opacity: 0.3;
}

.no-data img {
  width: 100%;
  height: 90px;
}

.no-data span {
  width: 100%;
  text-align: center;
  display: inline-block;
  line-height: 40px;
}
</style>
