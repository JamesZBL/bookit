import moment from 'moment';

const getCurrentDate = function () {
  return moment();
}

const getCurrentYearAndMonthString = function () {
  return getCurrentDateString().substring(0, 7);
}

const getCurrentDateString = function () {
  return moment().format('YYYY-MM-DD');
}

const getFirstDayOfCurrentMonth = function () {
  return `${getCurrentDateString().substring(0, 8)}01`;
}

const getCurrentYear = function () {
  return Number(getCurrentDateString().substring(0, 4));
}

const getCurrentMonth = function () {
  return Number(getCurrentDateString().substring(5, 7));
}

const getFirstDayOfNextMonth = function () {
  const month = getCurrentMonth();
  const year = getCurrentYear();
  const december = month === 12;
  const nextMonth = december ? 1 : month + 1;
  const nextYear = december ? year + 1 : year;
  return formatDate(new Date(`${nextYear}-${nextMonth}-01`));
}

const getFirstDayOf = function (dateString) {
  return `${formatDate(dateString).substring(0, 8)}01`;
}

const getFirstDayOfNextMonthOf = function (dateString) {
  const date = formatDate(dateString);
  const month = Number(date.substring(5, 7));
  const year = Number(date.substring(0, 4));
  const december = month === 12;
  const nextMonth = december ? 1 : month + 1;
  const nextYear = december ? year + 1 : year;
  return formatDate(`${nextYear}-${nextMonth}-01`);
}

const formatDate = function (v) {
  return moment(v).format('YYYY-MM-DD');
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