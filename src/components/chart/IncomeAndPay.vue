<script>
import { Line } from "vue-chartjs";
import colorsTransparent from "./colorsTransparent";
import colors from "./colors";
import layout from "./layout";
import title from "./title";
export default {
  extends: Line,
  data() {
    return {
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "支出",
            backgroundColor: colorsTransparent[10],
            data: [40, 20, 12, 39, 120, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: "收入",
            backgroundColor: colorsTransparent[15],
            data: [80, 40, 22, 79, 5, 90, 89, 180, 140, 120, 112, 121]
          }
        ]
      }
    };
  },
  methods: {
    render() {
      this.renderChart(this.data, {
        title: {
          ...title,
          text: "收支趋势"
        },
        layout
      });
    }
  }
};
</script>