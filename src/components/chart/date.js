import moment from 'moment';

export const weekUnits = (dateOfFirst) => {
  const result = [];
  let p = moment(dateOfFirst).weekday(1);
  let start = format(p);
  p.add(6, 'days');
  const now = moment();
  while (p < now) {
    result.push({
      display: `${p.year() === now.year() ? '' : `${p.year()}-`}${p.week()}周`,
      start: start,
      end: format(p)
    });
    p.add(1, 'days');
    start = format(p);
    p.add(6, 'days');
  }
  return result;
}

const format = (moment) => moment.format('YYYY-MM-DD');