import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class RequestServiceStub {
  constructor() { }

  /**
   * Create a new mentorship request
   *
   * @param {Object} Data containing details of mentorship request
   *
   * @return {Reponse} object
   */
  requestMentor(data) {
    const response = { status: 201, success: true };
    return Observable.of(response);
  }
}
