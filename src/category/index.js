const categories = [
  {
    name: 'salary',
    display: '工资',
    icon: 'fa-yen-sign',
    type: 'income'
  }, {
    name: 'financial',
    display: '理财',
    icon: 'fa-piggy-bank',
    type: 'income'
  }, {
    name: 'part-time',
    display: '兼职',
    icon: 'fa-user-md',
    type: 'income'
  },
  {
    name: 'food',
    display: '饮食',
    icon: 'fa-utensils',
    type: 'pay'
  }, {
    name: 'transportation',
    display: '交通',
    icon: 'fa-bus',
    type: 'pay'
  }, {
    name: 'sport',
    display: '健身',
    icon: 'fa-volleyball-ball',
    type: 'pay'
  }, {
    name: 'learning',
    display: '学习',
    icon: 'fa-book',
    type: 'pay'
  }, {
    name: 'digital',
    display: '数码',
    icon: 'fa-mobile-alt',
    type: 'pay'
  }, {
    name: 'shopping',
    display: '购物',
    icon: 'fa-shopping-bag',
    type: 'pay'
  }, {
    name: 'daily-use',
    display: '日用',
    icon: 'fa-gratipay',
    type: 'pay'
  }, {
    name: 'game',
    display: '娱乐',
    icon: 'fa-gamepad',
    type: 'pay'
  }, {
    name: 'vegetable',
    display: '蔬菜',
    icon: 'fa-leaf',
    type: 'pay'
  }, {
    name: 'fruit',
    display: '水果',
    icon: 'fa-apple-alt',
    type: 'pay'
  }, {
    name: 'snack',
    display: '零食',
    icon: 'fa-cookie-bite',
    type: 'pay'
  }, {
    name: 'communication',
    display: '通讯',
    icon: 'fa-phone',
    type: 'pay'
  }, {
    name: 'clothes',
    display: '服饰',
    icon: 'fa-tshirt',
    type: 'pay'
  }, {
    name: 'beauty',
    display: '美容',
    icon: 'fa-eye',
    type: 'pay'
  }, {
    name: 'housing',
    display: '住房',
    icon: 'fa-building',
    type: 'pay'
  }, {
    name: 'home',
    display: '居家',
    icon: 'fa-home',
    type: 'pay'
  }, {
    name: 'child',
    display: '孩子',
    icon: 'fa-child',
    type: 'pay'
  }, {
    name: 'social',
    display: '社交',
    icon: 'fa-user-friends',
    type: 'pay'
  }, {
    name: 'travel',
    display: '旅行',
    icon: 'fa-plane-departure',
    type: 'pay'
  }, {
    name: 'smoke-wine',
    display: '烟酒',
    icon: 'fa-wine-glass-alt',
    type: 'pay'
  }, {
    name: 'car',
    display: '汽车',
    icon: 'fa-car',
    type: 'pay'
  }, {
    name: 'medical',
    display: '医疗',
    icon: 'fa-capsules',
    type: 'pay'
  }, {
    name: 'pet',
    display: '宠物',
    icon: 'fa-crow',
    type: 'pay'
  }, {
    name: 'gift',
    display: '礼金',
    icon: 'fa-gift',
    type: 'pay'
  }, {
    name: 'office',
    display: '办公',
    icon: 'fa-paperclip',
    type: 'pay'
  }, {
    name: 'fix',
    display: '维修',
    icon: 'fa-wrench',
    type: 'pay'
  }, {
    name: 'donate',
    display: '捐赠',
    icon: 'fa-donate',
    type: 'pay'
  }, {
    name: 'lottery-ticket',
    display: '彩票',
    icon: 'fa-ticket-alt',
    type: 'pay'
  }, {
    name: 'friends',
    display: '亲友',
    icon: 'fa-user-friends',
    type: 'pay'
  }, {
    name: 'delivery',
    display: '快递',
    icon: 'fa-truck',
    type: 'pay'
  }
]

const getShowList = function () {
  const list = [];
  categories.forEach((item, id) => list.push({ id, ...item }))
  return list;
}

const initCategories = function () {
  const stored = localStorage.getItem(KEY_CATEGORIES);
  if (!stored)
    localStorage.setItem(
      KEY_CATEGORIES,
      categories.map(i => {
        return {
          ...i,
          hide: false
        };
      })
    );
}

const getDisplayOf = function (name) {
  return categories.find(i => i.name === name).display;
}

const KEY_CATEGORIES = "categories";

export default categories;
export {
  KEY_CATEGORIES,
  getShowList,
  initCategories,
  getDisplayOf
}