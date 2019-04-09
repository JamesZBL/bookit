<template id="analyse">
  <div class="scroll">
    <c-title hideTitle>
      <div @click="onClickType">
        {{selectedType.display}}
        <v-ons-icon icon="fa-caret-down" class="icon-down"></v-ons-icon>
      </div>
      <v-tabs v-model="selected" centered color="#26a2ff" slider-color="yellow" dark fixed-tabs>
        <v-tab v-for="(i, index) in tabs" :key="index" :href="`#${i.id}`">{{ i.display }}</v-tab>
      </v-tabs>
    </c-title>
    <div class="tab-wrapper">
      <v-tabs-items v-model="selected">
        <v-tab-item v-for="(item, index) in tabs" :key="index" :value="item.id">
          <ChartPage/>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-ons-dialog cancelable :visible.sync="dialogVisible" class="select-dialog">
      <v-ons-list class="menus">
        <v-ons-list-item
          @click="selectedType = item; dialogVisible = false;"
          v-for="(item, index) in types"
          :key="index"
        >
          <div class="left"></div>
          <div class="center">
            <span>{{item.display}}</span>
          </div>
          <div class="right check">
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
      selected: "t1",
      tabs: [
        {
          id: "t1",
          type: "week",
          display: "周"
        },
        {
          id: "t2",
          type: "month",
          display: "月"
        },
        {
          id: "t3",
          type: "year",
          display: "年"
        }
      ],
      types: [
        {
          name: "pay",
          display: "支出"
        },
        {
          name: "income",
          display: "收入"
        }
      ],
      selectedType: null
    };
  },
  created() {
    this.selectedType = this.types[0];
  },
  mounted() {},
  methods: {
    onClickType() {
      this.dialogVisible = !this.dialogVisible;
    }
  }
};
</script>
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
</style>
