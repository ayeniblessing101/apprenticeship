import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { AccordionModule } from 'ngx-accordion';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filtersObject;
  @Input() autoFilterStatus;
  @Output('onChecked') onChecked: EventEmitter<any> = new EventEmitter<any>();

  userId: string;
  currentPage: string;
  errorMessage: string;
  skills: any;
  status: any;
  radioChecked: boolean;
  filteredDate: number;

  iconNames = ['expand_more', 'expand_less'];
  icon1Name = 'expand_more';
  icon2Name = 'expand_more';
  icon3Name = 'expand_more';
  icon4Name = 'expand_more';

  dateRange: any;
  dateRangeMap: any[];

  constructor(
    private skillService: SkillService,
    private requestService: RequestService,
    private filterService: FilterService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.dateRange = {
      'Last day': 1,
      'Last 7 days': 7,
      'Last 14 days': 14,
      'Last month': 30,
      'All time': 0,
    };

    this.dateRangeMap = Object.keys(this.dateRange);
    this.userId = this.authService.userInfo.id;
  }

  /**
  * pluck out the top level keys to populate the filter with
  */
  get filterKeys() {
    return Object.keys(this.filtersObject);
  }

  /**
  * toggleIcon
  *
  * toggles the state of the caret on the filter options
  *
  * @param Integer itemClickedIndex
  */
  toggleIcon(itemClickedIndex: Number) {
    if (itemClickedIndex === 1) {
      this.icon1Name = this.icon1Name === 'expand_more' ? 'expand_less' : 'expand_more';
    } else if (itemClickedIndex === 2) {
      this.icon2Name = this.icon2Name === 'expand_more' ? 'expand_less' : 'expand_more';
    } else if (itemClickedIndex === 3) {
      this.icon3Name = this.icon3Name === 'expand_more' ? 'expand_less' : 'expand_more';
    } else if (itemClickedIndex === 4) {
      this.icon4Name = this.icon4Name === 'expand_more' ? 'expand_less' : 'expand_more';
    }
  }

  ngOnInit() {
  }

  selectedDate(index: number) {
    this.filteredDate = index;
  }

  /**
  * onChange
  *
  * function that uses the event emitter instance and gets the
  * filter selected and the corresponding item checked
  *
  * @param {$event} event onChange event can either be a click
  * from the checkbox or value from a radio button
  * @param {string} filtername name of the filter array selected
  * @param {string} itemName the filter value selected
  */
  onChange(event, item, key) {
    const eventData = {
      eventType: event.checked || event.value,
      itemName: item.name,
      filterName: key,
    };

    this.onChecked.emit(eventData);
  }
}
