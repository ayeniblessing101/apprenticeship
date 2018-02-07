import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpService as Http } from './http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class FileService {
  private apiBaseUrl = environment.apiBaseUrl
  constructor(private http: Http) { }

  /**
   * Gets a url for downloading a file
   *
   * @param {Number}  fileId - ID of the file to download
   *
   * @return {Observable} file details and url link
   */
  getFileDownloadUrl(fileId) {
    return this.http
      .get(`${this.apiBaseUrl}/v2/files/${fileId}`)
      .map((response: Response) => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  /**
   * Deletes a file belonging to a session
   *
   * @param {Number} sessionId - ID of mentorship session
   * @param {Number} fileId - ID of file to be deleted
   *
   * @return {Observable}
   */
  deleteSessionFile(sessionId, fileId) {
    return this.http
      .delete(`${this.apiBaseUrl}/v2/sessions/${sessionId}/files/${fileId}`)
      .map((response: Response) => response.json())
      .catch(error => Observable.throw(error.json()));
  }
}
