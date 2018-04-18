import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss'],
})
export class NoResultComponent implements OnInit {
  @Input() message: string;
  constructor() {}

  ngOnInit() {
    this.setDefaultMessage();
  }

  setDefaultMessage () {
    if (!this.message) {
      this.message = `Your request didn't return any result`;
    }
  }
}
