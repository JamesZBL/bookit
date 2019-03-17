<template>
  <v-app>
    <c-title title="添加账本" back/>
    <div class="wrapper card-wrapper">
      <v-container grid-list-md text-xs-center>
        <span>请选择账本颜色</span>
        <v-layout row wrap>
          <v-flex v-for="(i,index) in colors" :key="index" xs3>
            <v-card dark :color="i" :height="cardHeight" @click="selectColor(i)">
              <div class="mask" :style="{lineHeight: `${cardHeight}px`}">
                <v-ons-icon icon="md-check" v-if="selectedColor === i" class="bookmark"></v-ons-icon>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-layout>
            <v-flex xs12 md12>
              <v-text-field
                v-model="display"
                :rules="displayRules"
                :counter="6"
                label="账本名称"
                required
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
    <v-btn color="info" @click="onClickSubmit" large>保存</v-btn>
  </v-app>
</template>

<script>
import colors from "@/components/book/colors";
export default {
  name: "new-book",
  data() {
    return {
      display: "",
      valid: false,
      cardHeight: 50,
      colors,
      selectedColor: colors[0],
      displayRules: [
        v => !!v || "请输入账本名称",
        v => v.length <= 6 || "请输入小于6个字符的账本名称",
        v =>
          !this.$store.getters.isBookExisted(v) ||
          "已经存在相同名称的账本了"
      ]
    };
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color;
    },
    onClickSubmit() {
      const { display, selectedColor } = this;
      if (!this.$refs.form.validate()) return;
      this.$store.commit("addBook", {
        color: selectedColor,
        display
      });
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
span {
  font-size: 14px;
  line-height: 40px;
  color: #9b9b9b;
}

.mask {
  line-height: 50px;
}
</style>

