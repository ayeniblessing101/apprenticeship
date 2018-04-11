import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Rating } from '../../../interfaces/rating.interface';
import { SessionService } from '../../../services/session.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-confirm-session-modal',
  templateUrl: './confirm-session-modal.component.html',
  styleUrls: ['./confirm-session-modal.component.scss'],
})
export class ConfirmSessionModalComponent implements OnInit {
  @Output() emitSessionObject = new EventEmitter<any>();
  @Output() closeConfirmSessionModal = new EventEmitter<string>();
  @Input() request: any;
  @Input() session: any;
  @ViewChild('confirmSessionModal') confirmSessionModal: ElementRef;
  confirmSessionForm: FormGroup;
  startTime: string;
  endTime: string;
  readonly ratingScale: number = 5;

  constructor(
    private sessionService: SessionService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.startTime = this.request.pairing.start_time;
    this.endTime = this.request.pairing.end_time;

    const sessionDuration = this.computeSessionDuration(this.startTime, this.endTime);
    const hours = sessionDuration === 1 ? `${sessionDuration} hour` : `${sessionDuration} hours`;

    this.confirmSessionForm = new FormGroup({
      comment: new FormControl(''),
      availability: new FormControl(0),
      reliability: new FormControl(0),
      knowledge: new FormControl(0),
      teaching: new FormControl(0),
      usefulness: new FormControl(0),
    });
  }

  /**
   * Closes the modal when the area around the modal is clicked
   */
  @HostListener('click') onClick() {
    if (!this.confirmSessionModal.nativeElement.contains(event.target)) {
      this.closeConfirmSession();
    }
  }

  /**
   * Confirms already logged session
   *
   * @returns {void}
  */
  confirmSession() {
    const approver = this.session.mentor_logged ?
      this.request.mentee.id : this.request.mentor.id;

    const payload = {
      user_id: approver,
      comment: this.confirmSessionForm.value.comment,
      ratings: this.getRatings(),
      rating_scale: this.ratingScale,
    };

    this.sessionService.confirmSession(this.session.id, payload).toPromise()
      .then((response) => {
        this.alertService.showMessage('You have successfully confirmed this session');
        this.emitSessionObject.emit(this.session);
        this.closeConfirmSession();
      });
  }

  /**
   * Closes the confirm session modal
   *
   * @returns {void}
  */
  closeConfirmSession() {
    this.closeConfirmSessionModal.emit();
  }

  /**
   * Collates all the ratings from the ratings component.
   *
   * @returns {Object} - The ratings object
   */
  private getRatings(): Rating {
    const {
      availability,
      reliability,
      knowledge,
      teaching,
      usefulness,
    } = this.confirmSessionForm.value;

    if (availability ||
      reliability ||
      knowledge ||
      teaching ||
      usefulness
    ) {
      return {
        availability,
        reliability,
        knowledge,
        teaching,
        usefulness,
      }
    }

    return null;
  }

  /**
   * Computes the duration of a session in hours
   *
   * @param startTime - Session start time
   * @param endTime - Session end time
   *
   * @returns {Object} - A moment object containing the duration in hours
   */
  private computeSessionDuration(startTime, endTime) {
    const timeDifference = moment(endTime, 'hh:mm')
      .diff(moment(startTime, 'hh: mm'));

    return  moment.duration(timeDifference).asHours();
  }
}
