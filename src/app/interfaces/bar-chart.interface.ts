/**
 * @interface BarChart
 * Blueprint for the bar chart object
 */
export interface BarChart {
  data: {
    labels: any[]
    datasets: any[],
  },
  destroy: any
}
