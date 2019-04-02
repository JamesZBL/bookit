const getCurrentDate = function () {
  return new Date();
}

const getCurrentYearAndMonthString = function () {
  return formatDate(getCurrentDate()).split(0, 7);
}

const getCurrentDateString = function () {
  return formatDate(getCurrentDate());
}

const getFirstDayOfCurrentMonth = function () {
  return `${getCurrentDateString().substring(0, 8)}01`;
}

const getFirstDayOfNextMonth = function () {
  const date = new Date(getCurrentDateString());
  const month = 1 + date.getMonth();
  const year = date.getFullYear();
  const december = month === 12;
  const nextMonth = december ? 1 : month + 1;
  const nextYear = december ? year + 1 : year;
  return formatDate(new Date(`${nextYear}-${nextMonth}-01`));
}

const getFirstDayOf = function (dateString) {
  const date = new Date(dateString);
  return `${formatDate(date).substring(0, 8)}01`;
}

const getFirstDayOfNextMonthOf = function (dateString) {
  const date = new Date(formatDate(new Date(dateString)));
  const month = 1 + date.getMonth();
  const year = date.getFullYear();
  const december = month === 12;
  const nextMonth = december ? 1 : month + 1;
  const nextYear = december ? year + 1 : year;
  return formatDate(new Date(`${nextYear}-${nextMonth}-01`));
}

const formatDate = function (v) {
  return v.toLocaleDateString().split('/').map(n => n < 10 ? `0${n}` : n).join('-');
}

export {
  getCurrentDate,
  formatDate,
  getDateString,
  getCurrentDateString,
  getFirstDayOfCurrentMonth,
  getFirstDayOfNextMonth,
  getFirstDayOf,
  getFirstDayOfNextMonthOf,
  getCurrentYearAndMonthString
}