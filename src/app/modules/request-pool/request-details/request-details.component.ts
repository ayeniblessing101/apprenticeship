import {
   Component,
   OnInit,
   Input,
   EventEmitter,
   Output,
   ViewChild,
   HostListener,
   ElementRef,
   } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  @Input() selectedRequest;
  @Output() close = new EventEmitter();
  @ViewChild('requestModal') requestModal: ElementRef;
  userInfo: object;
  rating: number;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo(this.selectedRequest.mentee_id)
      .toPromise().then((user) => {
        this.userInfo = user;
        this.rating = user.rating;
      });
  }

  /**
   * Listens to a click event outside the request
   * modal. If a user clicks outside the modal, the
   * modal is closed.
   *
   * @return {void}
   */
  @HostListener('click')
  onClick() {
    if (!this.requestModal.nativeElement.contains(event.target)) {
      this.closeRequestModal();
    }
  }

  /**
   * Triggers the emitter event which
   * closes the modal.
   *
   * @return {void}
   */
  closeRequestModal() {
    this.close.emit();
  }
}
