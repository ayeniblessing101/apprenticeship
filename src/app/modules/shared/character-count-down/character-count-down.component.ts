import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character-count-down',
  templateUrl: './character-count-down.component.html',
  styleUrls: ['./character-count-down.component.scss'],
})

export class CharacterCountDownComponent implements OnInit {
  @Input() strokeDashOffset: number;
  @Input() radius: number;
  @Input() charactersLeft: number;
  @Input() isCharacterLimitClose: boolean;
  @Input() isStrokeDashOffsetLimitClose: boolean;
  @Input() isStrokeDashOffsetEqualZero: boolean;

  constructor() { }

  ngOnInit() {}
}
