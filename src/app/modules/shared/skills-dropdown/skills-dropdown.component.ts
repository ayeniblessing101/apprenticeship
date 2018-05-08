import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skills-dropdown',
  templateUrl: './skills-dropdown.component.html',
  styleUrls: ['./skills-dropdown.component.scss'],
})
export class SkillsDropdownComponent implements OnChanges {
  @Input() list: any[];
  @Input() defaultValue: string;
  @Input() dropDownIdentifier: string;
  @Input() skillsLength: number;
  @Input() isEmptyBasicSkills: boolean;

  @Output() changes = new EventEmitter();

  currentSelectedValue: string;
  skillsMessage = '';
  showDropDownContent = false;
  showSkillsMessage = true;
  disabled = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list) {
      this.skillsMessage = changes.list.firstChange ? 'Retrieving list of skills.' : 'No results found';

      if (changes.list.currentValue.length > 0) {
        this.showSkillsMessage = false;
      }
    }
    const currentSkillsLengthValue = changes.skillsLength ? changes.skillsLength.currentValue : this.skillsLength;

    this.disabled = currentSkillsLengthValue === 3;
    if (currentSkillsLengthValue !== 0) {
      this.isEmptyBasicSkills = false;
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
    this.currentSelectedValue = item;
    this.changes.emit(item);
  }
}
