import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.scss'],
})
export class ExportButtonComponent {
  @Input() isDisabled: boolean;
  @Output() exportEvent = new EventEmitter<any>();

  /**
   * emit the exportEvent when the button is clicked
   *
   * @returns {void}
  */
  onExportRequest() {
    this.exportEvent.emit()
  }
}
