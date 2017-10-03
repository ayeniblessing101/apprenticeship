import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-mentor-profile',
    templateUrl: './mentor-profile-modal.component.html',
    styleUrls: ['./mentor-profile-modal.component.scss', '../../profile/profile.component.scss']
})
export class MentorProfileModalComponent {
  requestId: number;
  userId: string;
  picture: string;
  fullName: string;
  skillsTitle: string;
  cohort: string;
  loggedHours: number;
  mentor: any;
  requestDetails: any;
  loading: any;
  rating: number;

  constructor(
    private authService: AuthService,
    public dialogRef: MdDialogRef<MentorProfileModalComponent>,
    @Inject(MD_DIALOG_DATA) public request: any
  ) {
    this.userId = this.authService.userInfo.id;
    this.requestId = this.request.requestDetails.id;
    this.loading = {};
    this.mentor = this.request.mentorDetails;
    this.picture = this.mentor.picture;
    this.fullName = this.mentor.name;
    this.skillsTitle = this.mentor.skills.length > 1 ? 'MENTOR SKILLS' : 'MENTOR SKILL';
    this.loggedHours = this.mentor.logged_hours;
    this.rating = this.mentor.rating;
  }
}
