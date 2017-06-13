import {Component, OnInit, Output, Input} from '@angular/core';
import { MdSnackBar, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

 @Component({
   selector: 'slack-modal',
   templateUrl: './slack-modal.component.html',
   styleUrls: ['./slack-modal.component.scss'],
  })
 export class SlackModal implements OnInit {
   title: String;
   slackHandleForm: FormGroup;
   userId: String;
   slackHandle: string;
   showSpinner: boolean;
   constructor (
     private formBuilder: FormBuilder,
     private userService: UserService,
     private auth: AuthService,
     public snackBar: MdSnackBar,
     public slackRef: MdDialogRef<SlackModal>,
   ) {
     this.title = 'Please provide your Slack username to recieve Lenken notifications';
     this.userId = this.auth.userInfo.id;
   }
   ngOnInit() {
      this.createForm('@example');
   }

   /**
    *  createForm - creates form group to
    *  be populated with the user's
    *  slack handle
    *
    *  @param {String} slackHandle - string the user's slack handle
    */
   createForm(slackHandle) {
     this.slackHandleForm = this.formBuilder.group({
       slackHandle: [slackHandle, [Validators.required]],
     });
   }

   /**
    *  onSubmit - function called when the form
    *  in the modal is submitted
    *
    *  @param {Object} form - has the data(slackHandle)
    *  from the modal
    */
   onSubmit(form) {
     if (form._value.slackHandle.includes('@')) {
       this.slackHandle = form._value.slackHandle;
     } else {
       this.slackHandle = '@'.concat(form._value.slackHandle);
     }
     this.showSpinner = true;
     this.userService.addUserSlackHandle(this.slackHandle)
       .subscribe(
         (data) => {
           this.showSpinner = false;
           this.userService.addSlackHandleStatus(this.userId)
             .then(this.snackBar.open('Your slack handle has been added successfully', 'Success', {
               duration: 8000,
             })),
           this.slackRef.close();
         },
         (err) => {
           this.showSpinner = false;
           this.snackBar.open(`The slack user ${this.slackHandle} does not exist`, 'Error', {
             duration: 8000,
           })
         });
   }
 }
