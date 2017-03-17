import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { RequestService } from './requests.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  providers: [RequestService]
})

export class RequestsComponent implements OnInit {
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  form: FormGroup;

    multiple0: boolean = false;
    multiple1: boolean = true;
    options0: Array<any> = [];
    options1: Array<any> = [];
    selection: Array<string>;

    logSingleString: string = '';
    logMultipleString: string = '';

    constructor(private _requestService: RequestService, private _router: Router, private _snackbar: MdSnackBar) {

        let numOptions = 100;
        let opts = new Array(numOptions);

        for (let i = 0; i < numOptions; i++) {
            opts[i] = {
                value: i.toString(),
                label: i.toString()
            };
        }

        this.options0 = opts.slice(0);
        this.options1 = opts.slice(0);
    }

    ngOnInit() {
        this.form = new FormGroup({
            requiredSkills: new FormControl('', [Validators.required]),
            otherSkills: new FormControl('', [Validators.required]),
            lengthOfMentorship: new FormControl('', [Validators.required]),
            timeControlStart: new FormControl('', [Validators.required]),
            timeControlEnd: new FormControl('', [Validators.required]),
            timeZone: new FormControl('', [Validators.required]),
            day: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required])
        });
    }

    onSingleOpened() {
        this.logSingle('- opened');
    }

    onSingleClosed() {
        this.logSingle('- closed');
    }

    onSingleSelected(item) {
        this.logSingle('- selected (value: ' + item.value  + ', label:' +
                       item.label + ')');
    }

    onSingleDeselected(item) {
        this.logSingle('- deselected (value: ' + item.value  + ', label:' +
                       item.label + ')');
    }
    onMultipleOpened() {
        this.logMultiple('- opened');
    }

    onMultipleClosed() {
        this.logMultiple('- closed');
    }

    onMultipleSelected(item) {
        this.logMultiple('- selected (value: ' + item.value  + ', label:' +
                       item.label + ')');
    }

    onMultipleDeselected(item) {
        this.logMultiple('- deselected (value: ' + item.value  + ', label:' +
                       item.label + ')');
    }

  requestMentor(form) {
      const data = form.value;
      let config = new MdSnackBarConfig();
      config.duration = 1500;
      this._requestService.requestMentor(JSON.stringify(data))
      .toPromise().then((data) => {
          this._snackbar.open('Request successfull', 'close', config).afterDismissed().subscribe(() => {
            this._router.navigate(['./dashboard']);
          })
       }
       ).catch((error) => {
           this._snackbar.open('Invalid Request', 'close', config);
       })
    // console.log(form.value);
    // if (1){ return ;}

  }

    private logMultiple(msg: string) {
        this.logMultipleString += msg + '\n';
    }

    private logSingle(msg: string) {
        this.logSingleString += msg + '\n';
    }
}
