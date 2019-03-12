<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  methods: {
    render() {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: ["饮食", "医疗", "学习", "交通", "健身", "房租"],
        datasets: [
          {
            backgroundColor: "#86cbff",
            data: [80, 120, 240, 240, 900, 239]
          }
        ]
      });
    }
  }
};
</script>