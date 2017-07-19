import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Angulartics2Segment } from 'angulartics2';

import { SegmentAnalytics } from './services/segment-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(Angulartics2Segment: Angulartics2Segment, private _segmentAnalytics: SegmentAnalytics) {
    this._segmentAnalytics.initializeAnalytics;
  };

  title = 'app works!';
}
