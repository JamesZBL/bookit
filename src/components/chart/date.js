import moment from 'moment';

export const weekUnits = (dateOfFirst) => {
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
  let start = format(p);
  p.add(1, 'months');
  while (p.isBefore(moment().add(1, 'months'))) {
    result.push({
      display: `${moment().year() !== moment().year() && `${p.year()}-` || ''}${p.isAfter(moment()) && '本' || p.isSameOrAfter(moment().startOf('month').hour(0).minute(0).second(-1)) && '上' || p.month()}月`,
      start,
      end: format(p)
    });
    start = format(p);
    p.add(1, 'months');
  }
  return result;
}

const format = (moment) => moment.format('YYYY-MM-DD');