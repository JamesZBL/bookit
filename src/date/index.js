const getCurrentDate = function () {
  return new Date();
}

const formatDate = function (v) {
  const year = v.getFullYear();
  const month = v.getMonth() + 1;
  const day = v.getDate();
  return `${year}-${month}-${day}`;
}

export {
  getCurrentDate,
  formatDate
}