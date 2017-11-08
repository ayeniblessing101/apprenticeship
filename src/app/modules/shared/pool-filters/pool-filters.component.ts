import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FilterService } from 'app/services/filter.service';

@Component({
  selector: 'app-pool-filters',
  templateUrl: './pool-filters.component.html',
  styleUrls: ['./pool-filters.component.scss'],
  providers: [FormBuilder],
})
export class PoolFiltersComponent implements OnInit {
  @Output() applyFilters = new EventEmitter<any>();
  form: FormGroup;
  appliedFilters: any;
  skills: any = [];
  ratings: any = [];
  locations: any = [];
  lengths: any = [];

  constructor(private formBuilder: FormBuilder,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.initializeFilters();
    this.form = this.formBuilder.group({
      category: ['recommended'],
      type: new FormArray([
        new FormControl(false),
        new FormControl(false),
      ]),
      ratings: [],
      locations: [],
      skills: [],
      lengths: [],
    });
    this.onChanges();
  }

  /**
   * This action it bound to form Object and called each time change occurs
   * on any input element on the form. It then maps the input value to appliedFilters
   * Object and emit that data as component's output to be used by any other component
   * that implements this filter.
   *
   * @return {void}
   */
  onChanges(): void {
    this.form.valueChanges.subscribe((val) => {
      Object.keys(this.appliedFilters).map((inputValue) => {
        this.appliedFilters[inputValue] = val[inputValue];
      });
      this.applyFilters.emit(this.appliedFilters);
    });
  }

  /**
   * Get a list of skills with requests
   *
   * @return {void}
   */
  getSkillsWithRequests(): void {
    this.filterService.getSkillsWithRequests()
      .toPromise()
      .then((skills) => {
        this.skills = skills;
      });
  }

  /**
   * Initializes appliedFilters and sets the display values for filter items
   *
   * @return {void}
   */
  initializeFilters(): void {
    this.getSkillsWithRequests();

    this.locations = [
      { name: 'Kampala' },
      { name: 'Lagos' },
      { name: 'Nairobi' },
    ];

    this.ratings.push({ label: '1 Star', value: 1 });
    [2, 3, 4, 5].forEach((rating) => {
      this.ratings.push({ label: `${rating} Stars`, value: rating })
    });

    this.lengths.push({ label: '1 Month', value: 1 });
    [2, 3, 4, 5].forEach((length) => {
      this.lengths.push({ label: `${length} Months`, value: length })
    });

    this.appliedFilters = {
      category: ['recommended'],
      type: [],
      ratings: [],
      locations: [],
      skills: [],
      lengths: [],
    };
  }
}
