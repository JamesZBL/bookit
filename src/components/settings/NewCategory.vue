<template>
  <div>
    <c-title back title="新建分类"></c-title>
    <div class="wrapper">
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-layout>
            <v-flex xs12 md12>
              <v-select :items="options" label="类别" v-model="type"></v-select>
              <v-text-field
                :autofocus="true"
                v-model="display"
                :rules="nameRules"
                label="分类名称"
                :counter="6"
                required
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn color="info" @click="onClickSubmit" large class="btn" round>确认</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "@/request";
export default {
  name: "new-category",
  data() {
    return {
      valid: false,
      display: "",
      type: "pay",
      options: [
        {
          text: "支出",
          value: "pay"
        },
        {
          text: "收入",
          value: "income"
        }
      ],
      nameRules: [
        v => !!v || "请输入分类名称",
        v => v.length <= 6 || "密码应不多于6个字符",
        v =>
          -1 ==
            this.$store.state.visibleCategories.findIndex(
              c => c.name === v || c.display === v
            ) ||
          -1 ==
            this.$store.state.visibleCategories.findIndex(
              c => c.name === v || c.display === v
            ) ||
          "已经存在相同名称的分类"
      ]
    };
  },
  computed: {},
  methods: {
    onClickSubmit() {
      const { $router, $store } = this;
      const validate = this.$refs.form.validate();
      if (!validate) return;
      this.addCategory();
      this.$router.replace(`/settings/category`);
    },

    addCategory() {
      const { display, type } = this;
      const category = {
        customed: true,
        display,
        type,
        icon: "fa-star",
        name: ""
      };
      this.$store.commit("addCustomedCategory", category);
      const result = this.$store.getters.visibleCategoriesByType(type);
      axios.put("/order", {
        names: result.map(c => c.name || c.display),
        type: type.toUpperCase()
      });
    }
  }
};
</script>