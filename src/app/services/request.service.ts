import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {
  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: Http) { }

  /**
   * Return details of a particular request
   *
   * @param requestId the mentoship request Id
   *
   * @return Observable containing details of request
   */
  getRequestDetails(requestId: number) {
    return this.http.get(`${this.apiBaseUrl}/requests/${requestId}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Return status of request e.g Open, Canceled, Closed
   *
   * @return Observable containing collection of possible statuses
   */
  getStatus(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/status`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return latest mentorship requests
   *
   * @param Number Limit number of requests to return
   *
   * @return Observable containing latest requests
   */
  getRequests(limit: number): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/requests?limit=${limit}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return mentorship requests for a particular mentee
   *
   * @param Number Limit number of requests to return
   *
   * @return Observable containing the mentee requests
   */
  getMenteeRequests(limit: number): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/requests?mentee=true&limit=${limit}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Create a new mentorship request
   *
   * @param Object Data containing details of mentorship request
   *
   * @return Reponse object
   */
  requestMentor(data) {
    const formattedData = this.formatRequestForm(data);
    return this.http.post(`${this.apiBaseUrl}/requests`, formattedData)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return all open mentorship requests
   *
   * @param Number limit number of requests to return
   *
   * @return Observable containing all open requests
   */
  getMentorRequests(limit): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/requests?status=open&limit=${limit}&offset=0`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Update a mentorship request interested field
   *
   * @param id the mentorship request Id
   * @param data the update data
   *
   * @return Observable containing the updated request
   */
  updateMentorRequestInterested(id: number, data): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/requests/${id}/update-interested`, data);
  }


  /**
   * Format Request Form data
   *
   * @param {Object} formValue
   *
   * @return {Object}
   */
  formatRequestForm(formValue) {
    const result =  {
      title: formValue.title,
      description: formValue.description,
      primary: formValue.requiredSkills,
      secondary: formValue.otherSkills,
      duration: formValue.duration,
      pairing: {
        start_time: formValue.timeControlStart,
        end_time: formValue.timeControlEnd,
        days: formValue.selectedDays,
        timezone: formValue.timeZone
      }
    };

    return result;
  }

  /**
   * Send PUT request to update mentorship request status
   *
   * @param {Number} id the id of the request
   * @param {Object} data the update data
   */
  updateRequestStatus(id, data) {
    return this.http.put(`${this.apiBaseUrl}/requests/${id}`, data)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Return data as JSON
   *
   * @param Response res an Observable
   *
   * @return Object containing data from Observable
   */
  extractData(res: Response) {
    const body = res.json();
    return body.data || [];
  }

  /**
   * Handle errors
   *
   * @param Response http error
   *
   * @return ErrorObservable
   */
  handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
