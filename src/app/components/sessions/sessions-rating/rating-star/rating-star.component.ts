import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SegmentService } from '../../../../services/segment.service';

@Component({
  selector:'app-rating-star',
  templateUrl:'rating-star.component.html',
  styleUrls:['rating-star.component.scss'],
})
export class RatingStarComponent {

  constructor(private segmentService: SegmentService) {}

  @Input() ratingMetric: any;
  @Output() updateRatingMetric:EventEmitter<any> = new EventEmitter();
  likertScale: any[]= [{
    id: 'Excellent',
    value: 5,
  },
  {
    id: 'Very Good',
    value:  4,
  },
  {
    id: 'Good',
    value: 3,
  },
  {
    id: 'Fair',
    value: 2,
  },
  {
    id: 'Poor',
    value: 1,
  }];

  onClick(rating:number):void{
    this.ratingMetric.rating = rating;
    this.updateRatingMetric.emit(this.ratingMetric);
  }
}
