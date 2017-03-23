import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'ngx-accordion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  closed = true ;
  iconNames = ['add_box', 'remove_circle'];
  icon1Name= 'add_box';
  icon2Name= 'add_box';

  constructor() { }

  toggleIcon(itemClickedIndex: Number) {
    this.closed = !this.closed;
    const index = this.closed === true ? 0 : 1;
    itemClickedIndex === 1 ? this.icon1Name = this.iconNames[index] : this.icon2Name = this.iconNames[index];
  }

  ngOnInit() {
  }

}
