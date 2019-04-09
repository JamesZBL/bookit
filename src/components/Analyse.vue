<template id="analyse">
  <div class="scroll">
    <c-title hideTitle>
      <div @click="onClickType">
        {{selectedType.display}}
        <v-ons-icon icon="fa-caret-down" class="icon-down"></v-ons-icon>
      </div>
      <div class="title-tab">
        <div class="tab-container">
          <div class="tabs-wrapper">
            <div
              v-for="(scope, index) in scopes"
              :key="index"
              :class="tabClass(scope)"
              @click="setScope(scope)"
            >{{scope.display}}</div>
          </div>
        </div>
      </div>
    </c-title>
    <div class="tab-wrapper">
      <ChartPage :type="selectedType" :scope="selectedScope"/>
    </div>
    <v-ons-dialog cancelable :visible.sync="dialogVisible" class="select-dialog">
      <v-ons-list class="menus">
        <v-ons-list-item
          @click="selectedType = item; dialogVisible = false;"
          v-for="(item, index) in types"
          :key="index"
          class="check"
        >
          <div class="left">
            <v-ons-icon :icon="item.icon"></v-ons-icon>
          </div>
          <div class="center">
            <span>{{item.display}}</span>
          </div>
          <div class="right">
            <v-ons-icon v-show="item.name === selectedType.name" icon="md-check"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-dialog>
  </div>
</template>

<script>
import Chart from "@/components/chart/Chart";
import ChartPage from "@/components/chart/ChartPage";
export default {
  name: "analyse",
  components: {
    Chart,
    ChartPage
  },
  data() {
    return {
      dialogVisible: false,
      selectedScope: "week",
      scopes: [
        {
          name: "week",
          display: "周"
        },
        {
          name: "month",
          display: "月"
        },
        {
          name: "year",
          display: "年"
        }
      ],
      types: [
        {
          name: "pay",
          display: "支出",
          icon: "fa-sign-out"
        },
        {
          name: "income",
          display: "收入",
          icon: "fa-sign-in"
        }
      ],
      selectedType: null
    };
  },
  created() {
    console.log(this.selectedScope);
    this.selectedType = this.types[0];
  },
  mounted() {},
  methods: {
    onClickType() {
      this.dialogVisible = !this.dialogVisible;
    },
    setScope(s) {
      this.selectedScope = s.name;
    },
    tabClass(scope) {
      const classes = ["tab"];
      if (scope.name === this.selectedScope) classes.push("active");
      return classes;
    }
  }
};
</script>
<style>
.v-tabs__div {
  max-width: 70px !important;
}
.theme--light.v-tabs__bar .v-tabs__div {
  color: rgba(74, 86, 96, 0.8) !important;
}
.v-tabs__container--centered .v-tabs__slider-wrapper + .v-tabs__div,
.v-tabs__container--centered > .v-tabs__div:first-child {
  margin-left: 0 !important;
}
</style>
<style scoped>
.card-wrapper {
  padding-top: 5px;
}
.icon-down {
  font-size: 20px !important;
}
.menus {
  background-image: none;
}
.check {
  color: #4a5660;
}
.tab-wrapper {
  top: 90px;
}
.title-tab {
  height: 38px;
}

.tab-container {
  background-color: #26a2ff;
  line-height: 30px;
  height: 40px;
  padding: 0 10px 0 10px;
}

.tabs-wrapper {
  display: -webkit-inline-box;
  height: 30px;
  border-radius: 5px;
  border: 1px solid white;
  overflow: hidden;
  font-size: 14px;
  font-weight: 100;
  vertical-align: middle;
  width: 100%;
}

.tab {
  border: 1px solid white;
  line-height: 30px;
  margin: -1px;
  border-right: none;
  width: 33.8%;
}

.tab.active {
  background-color: white;
  color: #26a2ff;
}
</style>
