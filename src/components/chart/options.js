import moment from 'moment';
import Date from './date';


const monthLabels = () => {
  const tmp = [];
  let i = 0;
  while (12 > i++) {
    tmp.push(i);
  }
  return tmp.map(n => `${n}月`);
};

const dayLabels = (days) => {
  const tmp = [];
  let i = 0;
  while (days > i++) {
    tmp.push(i)
  }
  return tmp.map(n => `${n}`);
};

const datesBetween = (s, e) => {
  const start = moment(s);
  const end = moment(e);
  const result = [];
  while (start.isBefore(end)) {
    result.push(Date.format(start));
    start.add(1, 'days');
  }
  return result;
};

const weekLabels = (s, e) => {
  return datesBetween(s, e).map(d => d.substring(5, 10));
};

const dataSetItem = () => ({
  pointBackgroundColor: "rgb(38, 162, 255)",
  pointStyle: "round",
  borderWidth: 1,
  borderColor: "rgba(0, 0, 0, 0.40)",
  lineTension: 0.1,
  fill: false,
});

const options = () => ({
  responsive: true,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontSize: 10
        },
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }
    ]
  }
});

export default {
  monthLabels,
  dayLabels,
  weekLabels,
  datesBetween,
  options,
  dataSetItem
};