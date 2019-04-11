import moment from 'moment';

const weekUnits = (dateOfFirst) => {
  const result = [];
  let p = moment(dateOfFirst).weekday(0);
  do {
    const start = format(p);
    const end = format(p.add(1, 'weeks'));
    p.subtract(1, 'weeks');
    result.push({
      display: getWeekName(p),
      start,
      end
    });
    p.add(1, 'weeks');
  } while (p.isBefore(moment()));
  return result;
}

const getWeekName = (p) => {
  let resultYear = '';
  const yearOfSaturday = p.weekday(6).year();
  if (yearOfSaturday !== moment().year()) {
    resultYear = `${yearOfSaturday}年-`;
  }
  p.weekday(0);
  let resultWeek = '';
  if (p.weekday(7).isSameOrAfter(moment().weekday(0).hour(0).minute(0).second(-1))) {
    resultWeek = '上';
  }
  p.weekday(-7);
  if (p.weekday(7).isAfter(moment())) {
    resultWeek = '本';
  }
  p.weekday(-7);
  if (p.weekday(6) < moment().weekday(-7)) {
    resultWeek = p.weekday(0).week();
  }
  p.weekday(0);
  if (['本', '上'].includes(resultWeek)) {
    resultYear = '';
  }
  return `${resultYear}${resultWeek}周`;
}

const monthUnits = (dateOfFirst) => {
  const result = [];
  let p = moment(dateOfFirst).startOf('month');
  do {
    const start = format(p);
    const end = format(p.endOf('month').add(1, 'second'));
    p.subtract(1, 'months');
    result.push({
      display: getMonthName(p),
      start,
      end
    });
    p.add(1, 'months');
  } while (p.isBefore(moment()));
  return result;
}

const getMonthName = (p) => {
  let year = '';
  let month = '';
  if (p.year() != moment().year()) {
    year = `${p.year()}年-`;
  }
  if (p.endOf('month').isSameOrAfter(moment().startOf('month').hour(0).minute(0).second(-1))) {
    month = '上';
  }
  if (p.endOf('month').isSameOrAfter(moment())) {
    month = '本';
  }
  p.startOf('month');
  if (p.isBefore(moment().startOf('month').subtract(1, 'months'))) {
    month = p.month() + 1;
  }
  if (['本', '上'].includes(month)) {
    year = '';
  }
  return `${year}${month}月`;
}

const yearUnits = (dateOfFirst) => {
  let p = moment(dateOfFirst).startOf('year');
  const result = [];
  do {
    const start = format(p);
    const end = format(p.add(1, 'year'));
    p.subtract(1, 'year');
    result.push({
      display: `${p.year()}年`,
      start,
      end
    });
    p.add(1, 'year');
  } while (p.isBefore(moment()));
  return result;
}

const format = (moment) => moment.format('YYYY-MM-DD');

export default {
  weekUnits,
  monthUnits,
  yearUnits,
  format
};