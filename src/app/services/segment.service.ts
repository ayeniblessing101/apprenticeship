import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SegmentService {
  private apiBaseUrl = environment.segmentAPIBaseUrl;

  private headers;

  constructor(private http: Http, options: RequestOptions) {
    this.headers = new Headers();
    this.headers.append('Authorization', `Basic ${btoa(`${environment.segmentAPIKey}:`)}`);
  }

  /**
   * page
   * send current page information to segment page API
   *
   * @param {string} url - current page route
   * @param {object} props - properties to send to segment
   * @returns {void}
   * @memberof SegmentService
   */
  page(url, props) {
      const payload = { name: url, timestamp: Date.now(), userId: 'lenken', properties: { ...props } };
      this.http.post(`${this.apiBaseUrl}/page`, payload, { headers: this.headers }).subscribe();

  }
  /**
   * track
   * send current event to segment track API
   *
   * @param {string} event - event to track
   * @param {object} props - properties to send to segment
   * @returns {void}
   * @memberof SegmentService
   */
  track(event, props?) {
      const payload = { event, timestamp: Date.now(), userId: 'lenken', properties: { ...props } };
      this.http.post(`${this.apiBaseUrl}/track`, payload, { headers: this.headers }).subscribe();
  }
}

