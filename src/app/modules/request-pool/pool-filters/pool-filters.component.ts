import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FilterService } from 'app/services/filter.service';
import { localStorage } from 'app/globals';

@Component({
  selector: 'app-pool-filters',
  templateUrl: './pool-filters.component.html',
  styleUrls: ['./pool-filters.component.scss'],
  providers: [FormBuilder],
})
export class PoolFiltersComponent implements OnInit {
  @Output() applyFilters = new EventEmitter<any>();
  @Output() openSaveFiltersModal = new EventEmitter();
  @Input() savedFiltersNames: string[];
  defaultFilters: object;
  form: FormGroup;
  appliedFilters: any;
  skills: any = [];
  ratings: any = [];
  locations: any = [];
  lengths: any = [];

  constructor(private formBuilder: FormBuilder,
              private filterService: FilterService) {
    this.defaultFilters = {
      category: ['recommended'],
      type: [],
      ratings: [],
      locations: [],
      skills: [],
      lengths: [],
    };
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
   *
   * This applies selected saved filter to form theregy
   * repopulating the request pools
   *
   * @param {any} event
   *
   * @returns {void}
   */
  applySavedFilters(event) {
    const selectedSavedFilters = JSON
      .parse(localStorage
        .getItem('savedFilters'))[event.value];
    this.appliedFilters = { ...this.appliedFilters, ...selectedSavedFilters };
    this.form.setValue(this.appliedFilters);
  }

  /**
   * This resets request filters form to its default
   *
   * @returns void
   */
  resetFiltersForm() {
    this.form.setValue(this.defaultFilters);
  }

  /**
   * Deletes a saved filte
   *
   * @param {event} event standard js event.
   * This is fired when the delete button on a saved filter
   * is clicked
   *
   * @returns {void}
   */
  deleteSavedFilters(event) {
    const savedFilters = JSON
      .parse(localStorage.getItem('savedFilters'));
    delete savedFilters[event.target.id];
    localStorage
      .setItem('savedFilters',
               JSON.stringify(savedFilters));
    this.savedFiltersNames = Object.keys(savedFilters)
  }

  /**
   *  IteEmits an event initiates opening
   * of request filter modal
   *
   * @returns {void}
   */
  openFiltersSaveModal() {
    this.openSaveFiltersModal.emit();
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

    this.appliedFilters = this.defaultFilters;
  }
}

