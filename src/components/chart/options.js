export default {
  monthLabels: () => {
    const tmp = [];
    let i = 0;
    while (12 > i++) {
      tmp.push(i);
    }
    return tmp.map(n => `${n}月`);
  },

  dayLabels: (days) => {
    const tmp = [];
    let i = 0;
    while (days > i++) {
      tmp.push(i)
    }
    return tmp.map(n => `${n}`);
  },

  dataSetItem: () => ({
    pointBackgroundColor: "rgb(38, 162, 255)",
    pointStyle: "round",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.40)",
    lineTension: 0.1,
    fill: false,
  }),

  options: () => ({
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
  })
}