import { Component, OnInit, Input } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {
  @Input() currentUser: Object;
  constructor() { }

  ngOnInit() {
  }
}
