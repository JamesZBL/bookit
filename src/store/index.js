import Vue from 'vue';
import Vuex from 'vuex';
import books from '@/book';

Vue.use(Vuex);

const defaultState = () => ({
  activeIndex: '',
  currentPage: '',
  email: '',
  codeType: '',
  code: '',
  visibleCategories: [],
  hiddenCategories: [],
  selectedCategory: {},
  books: [],
  selectedBook: {},
  hideAmount: false,
  recordType: '',
  pickerDate: '',
  record: {
    list: [],
    income: 0,
    pay: 0,
    amountVisible: false
  },
  profile: {
    user: {
      nickName: "",
      email: "",
      avatar: ""
    },
    stats: {
      day: 0,
      record_count: 0,
      check_count: 0
    },
  },
  chart: {
    dateUnits: [],
    rankList: [],
    dataList: [],
    type: 'pay',
    scope: 'week',
    unitIndex: -1,
  },
  loaded: {
    record: false,
    about: false,
    book: false,
    category: false,
    fixBug: false,
    chart: false,
  },
  defaultBook: {
    income: 0,
    pay: 0
  },
  loading: {
    amount: false,
    rank: false,
  }
});

export default new Vuex.Store({
  state: defaultState(),
  mutations: {
    resetAll(s) {
      Object.assign(s, defaultState());
    },

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

    setVisibleCategoriesByType(s, visibleCategories) {
      if (!visibleCategories.length) return;
      const type = visibleCategories[0].type;
      for (let category of s.visibleCategories) {
        if (category.type === type) {
          const index = s.visibleCategories.indexOf(category);
          s.visibleCategories.splice(index, 1);
        }
      }
      for (let category of visibleCategories)
        s.visibleCategories.push(category);
    },

    setHiddenCategoriesByType(s, hiddenCategories) {
      if (!hiddenCategories.length) return false;
      const type = hiddenCategories[0].type;
      for (let category of s.hiddenCategories) {
        if (category.type === type) {
          const index = s.hiddenCategories.indexOf(category);
          s.hiddenCategories.splice(index, 1);
        }
      }
      for (let category of hiddenCategories)
        s.hiddenCategories.push(category);
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
      s.hiddenCategories.unshift(category);
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

    setBooks(s, bks) {
      const DefaultBooks = books();
      s.books = [DefaultBooks[0]];
      for (let b of bks) {
        s.books.push({
          ...b,
          type: 'customed'
        });
      }
    },

    setSelectedBook(s, book) {
      if (null == book.id) {
        const DefaultBooks = books();
        s.selectedBook = DefaultBooks[0];
        return;
      }
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
    },

    setRecordList(s, list) {
      s.record.list = list;
    },

    setRecordIncome(s, income) {
      s.record.income = income;
    },

    setRecordPay(s, pay) {
      s.record.pay = pay;
    },

    setRecordAmountVisible(s, visible) {
      s.record.amountVisible = visible;
    },

    setUser(s, user) {
      s.profile.user = user;
    },

    setUserNickName(s, name) {
      s.profile.user.nickName = name;
    },

    setUserAvatar(s, avatar) {
      s.profile.user.avatar = avatar;
    },

    setStats(s, stats) {
      s.profile.stats = {
        ...s.profile.stats,
        ...stats
      };
    },

    setCode(s, code) {
      s.code = code;
    },

    setLoaded(s, object) {
      if ("object" === typeof object) {
        const { name, value } = object;
        s.loaded[name] = value;
      }
      else {
        const origin = s.loaded[object];
        s.loaded[object] = !origin;
      }
    },

    setDefaultBook(s, book) {
      const { income, pay } = book;
      s.defaultBook = {
        income,
        pay
      };
    },

    setPickerDate(s, date) {
      s.pickerDate = date;
    },

    removeRecordById(s, rid) {
      for (let day of s.record.list) {
        const index = day.list.findIndex(r => r.id === rid);
        if (-1 < index) {
          day.list.splice(index, 1);
          if (!day.list.length) {
            const index = s.record.list.indexOf(day);
            s.record.list.splice(index, 1);
          }
        }
      }
    },

    setChartDateUnits(s, units) {
      s.chart.dateUnits = units;
    },

    setChartRankList(s, rank) {
      s.chart.rankList = rank;
    },

    setChartDataList(s, data) {
      s.chart.dataList = data;
    },

    setChartUnitIndex(s, index) {
      s.chart.unitIndex = index;
    },

    setChartType(s, type) {
      s.chart.type = type;
    },

    setChartScope(s, scope) {
      s.chart.scope = scope;
    },

    setLoading(s, object) {
      s.loading[object.name] = object.value;
    },

    resetLoading(s) {
      for (let key in s.loading) {
        s.loading[key] = false;
      }
    }
  },

  getters: {
    getEmail: s => s.email,
    visibleCategoriesByType: s => type => s.visibleCategories.filter(c => c.type === type),
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