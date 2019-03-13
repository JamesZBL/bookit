<script>
import { Pie } from "vue-chartjs";
import colors from "./colors";
import layout from "./layout";
import title from "./title";
export default {
  extends: Pie,
  data() {
    return {
      data: {
        labels: ["工资", "基金", "兼职", "房租", "红包", "礼金"],
        datasets: [
          {
            backgroundColor: colors,
            data: [18001, 245, 332, 2420, 3900, 893]
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
          text: "收入来源"
        },
        layout
      });
    }
  }
};
</script>