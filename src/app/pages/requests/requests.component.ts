import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/startWith';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
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

    constructor() {

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
        this.form = new FormGroup({});
        this.form.addControl('selectSingle', new FormControl(''));
        this.form.addControl('selectMultiple', new FormControl(''));
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

    private logMultiple(msg: string) {
        this.logMultipleString += msg + '\n';
    }

    private logSingle(msg: string) {
        this.logSingleString += msg + '\n';
        
        
    }
}


