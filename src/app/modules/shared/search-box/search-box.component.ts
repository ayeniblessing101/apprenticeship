import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchTypes } from '../../../enums/search-types.enum';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {

  isFieldEmpty: boolean;
  placeholderText: string;
  placeholderTexts = [];
  searchTypes = SearchTypes;
  showSearchIcon = true;

  constructor(private router: Router) {
    this.placeholderTexts[this.searchTypes.PEOPLE_SEARCH] = 'In:People';
    this.placeholderTexts[this.searchTypes.SKILLS_SEARCH] = 'In:Skills';
    this.placeholderTexts[this.searchTypes.REQUESTS_SEARCH] = 'In:Requests';
  }

  ngOnInit() {
  }

  /**
 * Sets the visibility of the search icon when a value is
 * being inputted in the search form.
 *
 * @param event
 */
  setSearchIconVisibilty(event: any) {
    this.isFieldEmpty = false;
    if (event.type === 'blur') {
      this.showSearchIcon = !event.target.value.trim();
      return;
    }
    this.showSearchIcon = false;
  }


  /**
   * Gets search type and value from the html form
   *
   * @param event
   */
  setSearchTerm(event) {
    if (event.value === '') {
      this.isFieldEmpty = true;
    } else {
      this.placeholderText = this.placeholderTexts[event.type];
      this.router.navigate(['/search'], { queryParams: event });
    }
    return;
  }
}
