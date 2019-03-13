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
        labels: ["饮食", "医疗", "学习", "交通", "健身", "房租"],
        datasets: [
          {
            backgroundColor: colors,
            data: [80, 120, 240, 240, 900, 239]
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
          text: "消费方向"
        },
        layout
      });
    }
  }
};
</script>