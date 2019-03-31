<template>
  <div>
    <c-title back title="显示设置"></c-title>
    <div class="wrapper card-wrapper">
      <v-ons-list>
        <v-ons-list-item>
          <div class="left">
            <v-ons-icon :style="{color:'#85f188'}" icon="md-eye-off"></v-ons-icon>
          </div>
          <div class="center">隐藏金额</div>
          <div class="right">
            <v-ons-switch v-model="hideAmount"></v-ons-switch>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </div>
</template>

<script>
import axios from '@/request';
export default {
  name: "display-settings",
  data() {
    return {};
  },
  computed: {
    hideAmount: {
      get: function() {
        return this.$store.state.hideAmount;
      },
      set: function(s) {
        axios
          .put("/settings/show-amount", {
            showAmount: !s
          })
          .then(r => {
            this.$store.commit("setHideAmount", s);
          });
      }
    }
  },
  mounted() {
    this.loadSettings();
  },
  methods: {
    loadData() {
      this.loadSettings();
    },

    loadSettings() {
      axios.get("/settings").then(({ data: { showAmount } }) => {
        this.$store.commit("setHideAmount", !showAmount);
      });
    }
  }
};
</script>