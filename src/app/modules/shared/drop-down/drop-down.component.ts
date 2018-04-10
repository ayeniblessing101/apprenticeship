import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit, OnChanges {
  @Input() list: any[];
  @Input() defaultValue: string;
  @Input() height: string;
  @Output() changes = new EventEmitter();

  formattedValue: string;

  showDropDownContent = false;
  disabled = false;

  constructor() {
    this.defaultValue = '';
  }

  ngOnInit() {
    this.formatDefaultValue(this.defaultValue);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formattedValue = this.defaultValue;

    if (this.formattedValue.length < 3) {
      const currentDefaultValue = changes.defaultValue ? changes['defaultValue'].currentValue : this.defaultValue;
      if (currentDefaultValue === '1') {
        this.formattedValue = currentDefaultValue + ' Month';
      } else {
        this.formattedValue = currentDefaultValue + ' Months';
      }
    }
  }

  /**
   * Accepts and emits the selected item.
   *
   * @param item
   *
   * return {void}
   */
  setSelectedValue(item) {
    this.showDropDownContent = false;
    this.changes.emit(item);
  }

  /**
   * Adds the suffix 'Months' or 'Month' depending on the value and
   * length of the string.
   *
   * @param {string} value
   *
   * return {void}
   */
  formatDefaultValue(value: string) {
    if (value.length < 3) {
      if (value === '1') {
        this.formattedValue = value + ' Month';
      } else {
        this.formattedValue = value + ' Months';
      }
    }
  }
}
