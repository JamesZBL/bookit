const categories = [
  {
    name: 'food',
    display: '饮食',
    icon: 'md-local-dining',
    type: 'pay'
  }, {
    name: 'transportation',
    display: '交通',
    icon: 'md-car-taxi',
    type: 'pay'
  }, {
    name: 'sport',
    display: '健身',
    icon: 'md-run',
    type: 'pay'
  }, {
    name: 'learning',
    display: '学习',
    icon: 'md-book',
    type: 'pay'
  }, {
    name: 'digital',
    display: '数码',
    icon: 'md-headset',
    type: 'pay'
  }, {
    name: 'salary',
    display: '工资',
    icon: 'md-headset',
    type: 'income'
  }, {
    name: 'financial',
    display: '理财',
    icon: 'md-headset',
    type: 'income'
  }, {
    name: 'part-time',
    display: '兼职',
    icon: 'md-headset',
    type: 'income'
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