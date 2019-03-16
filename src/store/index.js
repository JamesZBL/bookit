import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    codeType: '',
    visibleCategories: [],
    hiddenCategories: [],
    selectedCategory: {},
  },

  getters: {
    getEmail: s => s.email,
  },

  mutations: {
    setEmail(s, email) {
      s.email = email;
    },

    setCodeType(s, type) {
      s.codeType = type;
    },

    setVisibleCategories(s, visibleCategories) {
      s.visibleCategories = visibleCategories;
    },

    setHiddenCategories(s, hiddenCategories) {
      s.hiddenCategories = hiddenCategories;
    },

    hideDefaultCategory(s, category) {
      const { name } = category;
      const { visibleCategories } = s;
      const find = visibleCategories.find(c => c.name === name);
      const index = visibleCategories.indexOf(find);
      s.visibleCategories.splice(index, 1);
      s.hiddenCategories.push(category);
    },

    showDefaultCategory(s, category) {
      const { name } = category;
      const { hiddenCategories } = s;
      const find = hiddenCategories.find(c => c.name === name);
      const index = hiddenCategories.indexOf(find);
      s.hiddenCategories.splice(index, 1);
      s.visibleCategories.push(category);
    },

    setSelectCategory(s, type) {
      s.selectedCategory = type;
    }
  },

  getters: {
    visiblePayCategories: s => s.visibleCategories.filter(c => c.type === 'pay'),
    visibleIncomeCategories: s => s.visibleCategories.filter(c => c.type === 'income'),
    hiddenPayCategories: s => s.hiddenCategories.filter(c => c.type === 'pay'),
    hiddenIncomeCategories: s => s.hiddenCategories.filter(c => c.type === 'income'),
    visibleCategories: s => type => s.visibleCategories.filter(c => c.type === type),
    hiddenCategories: s => type => s.hiddenCategories.fill(c => c.type === type)
  }
});