import { Directive, ElementRef, AfterViewChecked, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMatchPoolHeaderWidthToParent]',
})
export class MatchPoolHeaderWidthToParentDirective implements AfterViewChecked {

  constructor(private el: ElementRef) {
  }

  ngAfterViewChecked() {
    this.matchWidth(this.el.nativeElement);
  }

  /**
   * Matches the width of a class to the width of its parent and divide it's width
   * equally amoung it's children.
   *
   * @param {HTMLElement}  element The element to match to its parent.
   *
   * @return {void}
   */
  matchWidth(element: HTMLElement) {
    const parent: any = element.parentNode;
    element.style.width = `${parent.getBoundingClientRect().width}px`;
    const children: any = element.querySelectorAll('.header > div');
    children.forEach((child) => {
      child.style.width = `${Math.round(element.getBoundingClientRect().width * (1 / children.length))}px`;
    });
  }

  @HostListener('window:resize')
  /**
   * It calls the setWidth function whenever there is a screen resize.
   *
   * @return {void}
   */
    onResize() {
    this.matchWidth(this.el.nativeElement);
  }
}
