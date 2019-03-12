<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  methods: {
    render() {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "支出",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: "收入",
            backgroundColor: "#ffc182",
            data: [80, 40, 22, 79, 60, 90, 89, 180, 140, 120, 112, 121]
          }
        ]
      });
    }
  }
};
</script>