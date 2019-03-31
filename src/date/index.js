const getCurrentDate = function () {
  return new Date();
}

const getCurrentDateString = function() {
  return formatDate(getCurrentDate());
}

const formatDate = function (v) {
  return v.toLocaleDateString().split('/').map(n => n < 10 ? `0${n}` : n).join('-');
}

export {
  getCurrentDate,
  formatDate,
  getDateString,
  getCurrentDateString
}