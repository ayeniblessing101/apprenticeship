import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response, URLSearchParams } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { RequestService } from './request.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BaseService } from './base.service';

@Injectable()
export class ReportsService extends BaseService {
  private apiBaseUrl = environment.apiBaseUrl;

  /**
   * Gets inactive mentorship data
   *
   * @param startDate - Start date
   * @param endDate - End date
   *
   * @returns {Observable} - Inactive mentorship data
   */
  getInactiveMentorships(startDate: string, endDate?: string) {
    return this.http.get(`${this.apiBaseUrl}/v1/reports/inactive-mentorships?start_date=${startDate}&end_date=${endDate}`)
        .map(this.handleResponse)
        .catch(this.handleError);
  }
}
