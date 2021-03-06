import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class SearchService extends BaseService {
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API

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
