import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.mini-component.html',
  styleUrls: ['./request-detail.mini-component.scss']
})
export class RequestDetailMiniComponent {
  @Input() details: any;
  @Input() menteeDetails: any;
  @Input() actionButtons: Array<Object>;
  @Input() loading: Boolean = false; 
  @Input() hasAlreadyIndicatedInterest: Boolean = false; 
  @Output() buttonClickEmitter = new EventEmitter();

  constructor() {}

  emitClickAction(event) {
    this.buttonClickEmitter.emit(event);
  }

  /**
   * returns a css class for chips based on request status
   *
   * @param {String} status - request status
   * @return {String} className - css class
   */
  getClassName(matchStatus: string): string {
    let className = '';
    
    if (matchStatus) {
      switch (matchStatus.toLowerCase()) {
        case 'open': className = 'rounded-chip-open'; break;
        case 'matched': className = 'rounded-chip-matched'; break;
        case 'closed': className = 'rounded-chip-closed'; break;
        default: className = 'rounded-chip-cancelled';
      }
    }

    return className;
  }
}