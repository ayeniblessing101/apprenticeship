import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';

import { ScrollPosition } from '../interfaces/scroll-position';

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  scrollHeight: 0,
  scrollTop: 0,
  clientHeight: 0,
};

@Directive({
  selector: '[appInfiniteScroller]',
})
export class InfiniteScrollDirective implements AfterViewInit {

  private scrollEvent;

  private userScrolledDown;

  private requestStream;

  private requestOnScroll;

  @Input()
  scrollCallback;

  @Input()
  immediateCallback;

  @Input()
  scrollPercent = 70;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {

    this.registerScrollEvent();

    this.streamScrollEvents();

    this.requestCallbackOnScroll();

  }

  /**
   * Add a listener for scroll events
   *
   * @return {void}
   */
  private registerScrollEvent() {

    this.scrollEvent = Observable.fromEvent(this.element.nativeElement, 'scroll');

  }

  /**
   * Process the incoming stream of scroll events according
   * to our conditions to determine when to make the API call
   *
   * @return {void}
   */
  private streamScrollEvents() {
    this.userScrolledDown = this.scrollEvent
      .map((event: any): ScrollPosition => ({
        scrollHeight: event.target.scrollHeight,
        scrollTop: event.target.scrollTop,
        clientHeight: event.target.clientHeight,
      }))
      .pairwise()
      .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
  }

  /**
   * Once conditions pass, ScrollCallback is called
   * which in turn calls the API
   *
   * @return {void}
   */
  private requestCallbackOnScroll() {

    this.requestOnScroll = this.userScrolledDown;

    if (this.immediateCallback) {
      this.requestOnScroll = this.requestOnScroll
        .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
    }

    this.requestOnScroll
      .exhaustMap(() => { return this.scrollCallback(); })
      .subscribe(() => { });

  }

  /**
   * Check if the user is scrolling down
   *
   * @return {number}
   */
  private isUserScrollingDown = (positions) => {
    return positions[0].scrollTop < positions[1].scrollTop;
  }

  /**
   * Check if the scroll position is the required percentage
   * relative to the container
   *
   * @return {number}
   */
  private isScrollExpectedPercent = (position) => {
    return ((position.scrollTop + position.clientHeight) / position.scrollHeight) > (this.scrollPercent / 100);
  }
}
