import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'ngx-accordion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  closed = true ;
  icon_names = ['add_box', 'remove_circle'];
  icon1_name= 'add_box';
  icon2_name= 'add_box';

  constructor() { }

  toggleIcon(itemClickedIndex: Number) {
    this.closed = !this.closed;
    const index = this.closed === true ? 0 : 1;
    itemClickedIndex === 1 ? this.icon1_name = this.icon_names[index] : this.icon2_name = this.icon_names[index];
  }

  ngOnInit() {
  }

}
