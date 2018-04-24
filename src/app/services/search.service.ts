import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
  searchTerm = new Subject<any>();
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API

  constructor(
    private http: Http,
  ) {}

  /**
    * Fetches requests based on the search term
    *
    * @param {string} url - current page route
    * @param {string} searchTerm - search term parameter
    *
    * @return {Observable} Observable with the requests based on the search term
    */
  fetchRecords(url, searchTerm) {
    return this.http.get(`${this.apiBaseUrl}/${url}?q=${searchTerm}`)
      .map((response) => {
        return response.json();
      })
  }
}
