import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})

export class RequestsComponent implements OnInit {
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  form: FormGroup;

    multiple0 = false;
    multiple1 = true;
    options0: Array<any> = [];
    options1: Array<any> = [];
    selection: Array<string>;

    logSingleString = '';
    logMultipleString = '';

    constructor(private requestService: RequestService, private router: Router, private snackbar: MdSnackBar) {

        const numOptions = 100;
        const opts = new Array(numOptions);

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
      const config = new MdSnackBarConfig();
      config.duration = 1500;
      this.requestService.requestMentor(JSON.stringify(data))
        .toPromise()
        .then(() => {
          this.snackbar.open('Request successfull', 'close', config).afterDismissed().subscribe(() => {
            this.router.navigate(['./dashboard']);
          });
       }
       ).catch((error) => {
           this.snackbar.open('Invalid Request', 'close', config);
       });
  }

    private logMultiple(msg: string) {
        this.logMultipleString += msg + '\n';
    }

    private logSingle(msg: string) {
        this.logSingleString += msg + '\n';
    }
}
