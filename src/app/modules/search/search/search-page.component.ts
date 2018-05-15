import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SearchTypes } from '../../../enums/search-types.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  types = SearchTypes;
  records: any;
  key: string;
  noResultMessage = `Your search didn't return any results. Try something different.`;
  type: any;
  urls: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService,
  ) {
    this.urls[this.types.REQUESTS_SEARCH] = 'v2/requests';
    this.urls[this.types.PEOPLE_SEARCH] = 'v2/search/users';
    this.urls[this.types.SKILLS_SEARCH] = 'v2/skills';
  }

  ngOnInit() {
    this.initiateSearch()
  }

  /**
   * Method to perform search on the Api based on the search based
   *
   * @returns{void}
   */
  initiateSearch() {
    this.route.queryParams.subscribe((queryParams) => {
      this.key = queryParams['value'];
      this.type = parseInt(queryParams['type'], 10)
      const url = this.urls[this.type];
      this.redirectNonAdmin();
      this.searchService.fetchRecords(url, this.key)
        .toPromise()
        .then((response) => {
          this.records = response;
        });
    });
  }

  /**
   * If a user is using the search skills and isn't an Admin he
   * should be redirected to the unauthorized page.
   *
   * @returns {void}
   */
  redirectNonAdmin() {
    if (!this.authService.userInfo.roles.LENKEN_ADMIN && this.type === this.types.SKILLS_SEARCH) {
      this.router.navigateByUrl('/unauthorized');
    }
  }
}
