import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpService as Http } from './http.service';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';

@Injectable()
export class FileService extends BaseService {
  private apiBaseUrl = environment.apiBaseUrl

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
      .map(this.handleResponse)
      .catch(this.handleError);
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
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * Uploads a file to a given session.
   *
   * @param {Object} requestData
   * @param {number} sessionId
   *
   * @returns {Observable<any>}
   */
  addFile(uploadFile: Object, sessionId) {
    return this.http.post(`${this.apiBaseUrl}/v2/sessions/${sessionId}/files`, uploadFile)
      .map(this.handleResponse);
  }

}
