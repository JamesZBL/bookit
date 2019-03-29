import Vue from 'vue';
import Vuex from 'vuex';
import DefaultBooks from '@/book';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeIndex: '',
    currentPage: '',
    email: '',
    codeType: '',
    visibleCategories: [],
    hiddenCategories: [],
    selectedCategory: {},
    books: [],
    selectedBook: {},
    hideAmount: false,
    recordType: ''
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

    reSortVisibleCategories(s, categories) {
      const { type } = categories[0];
      s.visibleCategories.filter(c => c.type === type).forEach(c => {
        s.visibleCategories.splice(s.visibleCategories.indexOf(c), 1);
      });
      categories.forEach(c => s.visibleCategories.push(c));
    },

    hideDefaultCategory(s, category) {
      const { name } = category;
      const { visibleCategories } = s;
      const index = visibleCategories.findIndex(c => c.name === name);
      s.visibleCategories.splice(index, 1);
      s.hiddenCategories.push(category);
    },

    showDefaultCategory(s, category) {
      const { name } = category;
      const { hiddenCategories } = s;
      const index = hiddenCategories.findIndex(c => c.name === name);
      s.hiddenCategories.splice(index, 1);
      s.visibleCategories.push(category);
    },

    setSelectCategory(s, type) {
      s.selectedCategory = type;
    },

    addCustomedCategory(s, category) {
      s.visibleCategories.push(category);
    },

    removeCategory(s, category) {
      s.visibleCategories.splice(s.visibleCategories.findIndex(c => c.name === category.name), 1);
    },

    setBooks(s, books) {
      s.books = [DefaultBooks[0]];
      for (let b of books) {
        s.books.push({
          ...b,
          type: 'customed'
        });
      }
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
      const index = s.books.findIndex(b => b.display === book.display);
      s.books.splice(index, 1);
    },

    setBookDefault(s) {
      s.selectedBook = s.books[0];
    },

    setHideAmount(s, b) {
      s.hideAmount = b;
    },

    setActiveIndex(s, index) {
      s.activeIndex = index;
    },

    setCurrentPage(s, page) {
      s.currentPage = page;
    },

    setRecordType(s, type) {
      s.recordType = type;
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
    isBookExisted: s => display => !!s.books.find(b => b.display === display),
    activeIndex: s => s.activeIndex,
    currentPage: s => s.currentPage
  }
});