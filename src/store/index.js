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
    books: [],
    selectedBook: {},
    hideAmount: false
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
    },

    setBooks(s, books) {
      s.books = books;
    },

    setSelectedBook(s, book) {
      s.selectedBook = book;
    },

    addBook(s, book) {
      s.books.push({
        ...book,
        type: 'customed'
      });
    },

    removeBook(s, book) {
      const find = s.books.find(b => b.display === book.display);
      s.books.splice(s.books.indexOf(find), 1);
    },

    setBookDefault(s) {
      s.selectedBook = s.books[0];
    },

    setHideAmount(s, b) {
      s.hideAmount = b;
    }
  },

  getters: {
    getEmail: s => s.email,
    visiblePayCategories: s => s.visibleCategories.filter(c => c.type === 'pay'),
    visibleIncomeCategories: s => s.visibleCategories.filter(c => c.type === 'income'),
    hiddenPayCategories: s => s.hiddenCategories.filter(c => c.type === 'pay'),
    hiddenIncomeCategories: s => s.hiddenCategories.filter(c => c.type === 'income'),
    visibleCategories: s => type => s.visibleCategories.filter(c => c.type === type),
    hiddenCategories: s => type => s.hiddenCategories.filter(c => c.type === type),
    findCategoryByName: s => name => s.visibleCategories.find(c => c.name === name) ||
      s.hiddenCategories.find(c => c.name === name),
    isBookExisted: s => display => !!s.books.find(b => b.display === display)
  }
});