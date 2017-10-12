import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multiple-bar-chart',
  templateUrl: './multiple-bar-chart.component.html',
  styleUrls: ['./multiple-bar-chart.component.scss']
})
export class MultipleBarChartComponent implements OnInit {
  @Input() skills;
  @Input() status;

  chartType: any;
  data: any;
  options: any;
  colors: any;
  xAxis: any[]= [];
  yAxis: any[]= [];
  constructor() { }

  ngOnInit() {
    this.populateYAxes(this.skills, this.status);
    this.populateXAxes(this.skills);
    this.generateMultipleBarGraph();
  }

  /**
   * Populates the Y axis of the graphs
   *
   * @param {Array} skills - top ten most requested skills
   * @return {Void}
   */
  populateYAxes(skills: any[], statuses: any[]) {
    const backgroundColor = {
      open: '#3359df',
      matched: '#73d278',
      closed: '#ffaf30',
      cancelled: '#ff1665',
    }
    statuses.forEach((status) => {
      const dataSet = {};
      dataSet['label'] = status;
      dataSet['data'] = []
      dataSet['backgroundColor'] = backgroundColor[status]
      skills.forEach((skill) => {
        if (status in skill.percentage) {
          dataSet['data'].push(skill.percentage[status]);
        } else {
          dataSet['data'].push(0);
        }
      })
      this.yAxis.push(dataSet);
    });
  }

  /**
   * Populates the X axis of the graphs
   *
   * @param {Array} skills - top ten most requested skills
   * @return {Void}
   */
  populateXAxes(skills: any[]) {
    skills.forEach((skill) => {
      this.xAxis.push(skill.name);
    });
  }

  /**
   * Generates the vertical bar graphs
   *
   * @return {Void}
   */
  generateMultipleBarGraph() {
    this.chartType = 'bar';
    this.data = {
      labels: this.xAxis,
      datasets: this.yAxis,
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        yAxes: [{
          ticks: {
            callback: (value, index, values) => {
              return value + '%';
            },
          },
        }],
      },
    };
  }
}
