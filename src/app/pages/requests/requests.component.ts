import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { SkillService } from '../../services/skill.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
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
  lengthOfMentorship: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  numMonths: Array<any>;
  skills: Array<string> = [];
  selection: Array<string>;

  logSingleString = '';
  logMultipleString = '';

  constructor(
      private requestService: RequestService,
      private router: Router,
      private snackbar: MdSnackBar,
      private skillService: SkillService
  ) {}

    ngOnInit() {
        this.form = new FormGroup({
            requiredSkills: new FormControl('', [Validators.required]),
            otherSkills: new FormControl(''),
            lengthOfMentorship: new FormControl('', [Validators.required]),
            timeControlStart: new FormControl('', [Validators.required]),
            timeControlEnd: new FormControl('', [Validators.required]),
            timeZone: new FormControl('', [Validators.required]),
            monday: new FormControl(),
            tuesday: new FormControl(),
            wednesday: new FormControl(),
            thursday: new FormControl(),
            friday: new FormControl(),
            description: new FormControl('', [Validators.required])
        });
        this.fetchSkills();
        this.initMonths();
    }

    initMonths() {
        this.numMonths = this.lengthOfMentorship.map((item) => {
            return {
                'label' : item,
                'value' : item
            };
        });
    }

    fetchSkills() {
        this.skillService.getSkills().subscribe(
            (res) => { this.setSkills(res); }
        );
    }

    setSkills(obj) {
        this.skills = obj.map((obj) => {
            return {
                'label' : obj.name,
                'value' : obj.name
            };
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

    private logMultiple(msg: string) {
        this.logMultipleString += msg + '\n';
    }

    private logSingle(msg: string) {
        this.logSingleString += msg + '\n';
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

}
