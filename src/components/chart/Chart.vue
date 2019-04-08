<script>
import { Line } from "vue-chartjs";
import colorsTransparent from "./colorsTransparent";
import colors from "./colors";
import layout from "./layout";
import title from "./title";
export default {
  extends: Line,
  props: {
    chartData: Object,
    options: Object
  },
  data() {
    return {};
  },
  methods: {
    render() {
      this.renderChart(this.chartData, this.options);
    }
  }
};
</script>