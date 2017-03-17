import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class RequestService {
    url = 'http://private-729ea-lenken.apiary-mock.com/requests';
    response: any;
    constructor(private _http: Http) { }

    requestMentor(data) {
        return this._http.post(this.url, data).map((response: Response) => response.json());
    }

    handleError(){}
}
