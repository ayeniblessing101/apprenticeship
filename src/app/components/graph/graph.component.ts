import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @Input() skills;

  chartType: any;
  data: any;
  options: any;
  colors:any;
  xAxis: any[]= [];
  yAxis: any[]= [];
  topTenSkills: any[];
  constructor() { }

  ngOnInit() {
    this.populateAxes(this.skills);
    this.generateBarGraph();
  }

  /**
   * populates the X and Y axis of the graphs
   *
   * @param {Array} skills - top ten most requested skills
   * @return {Void}
   */
  populateAxes(skills: any[]){
    this.topTenSkills = skills.slice(0,10);
    for (let skill of this.topTenSkills){
      this.xAxis.push(skill.name);
      this.yAxis.push(skill.percentage);
    }   
  }
  
 /**
   * generates the vertical bar graphs
   *
   * @return {Void}
   */
  generateBarGraph(){
    this.chartType = 'bar';
    this.data = {
    labels: this.xAxis,
    datasets: [
     {
       label: 'Top Ten Skills',
       data: this.yAxis
     }
    ]
   };
    this.options = {
    responsive: true,
    maintainAspectRatio: true,  
   };
  }
}
