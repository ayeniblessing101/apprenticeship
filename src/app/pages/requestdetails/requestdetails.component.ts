import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from './../../services/skill.service';
import { RequestService } from './../../services/request.service';
import { Observable } from "rxjs/Rx";
import { CancelRequestDialog } from '../cancelrequest/cancelrequest.component';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss'],
})
export class RequestdetailsComponent implements OnInit, OnDestroy {
  skills: any;
  details: any;
  sub: any;
  requestId: number;

  constructor(
    private skillsService: SkillService,
    private requestsService: RequestService,
    private route: ActivatedRoute,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
     this.requestId = this.route.snapshot.params['id'];
      this.skillsService.getSkills().toPromise().then((res) => {
          this.skills = res.data;
      });

      this.requestsService.getRequestDetails(this.requestId).toPromise().then((res) => {
          this.details = res.data[0];
      });
  }

  cancelRequest() {
      const dialogRef = this.dialog.open(CancelRequestDialog);
      dialogRef.afterClosed().subscribe((result => {

        if (result) {
            const body = { id: this.requestId, status: 3 };
            this.requestsService.updateRequestStatus(body);
        }
      }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

