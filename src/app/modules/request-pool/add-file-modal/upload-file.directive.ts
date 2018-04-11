import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appUploadFile]',
})
export class UploadFileDirective {

  @HostBinding('style.border') private border = 'dashed 1px #3359db';
  @Output() private fileAddedEmitter: EventEmitter<File> = new EventEmitter();

  constructor() { }

  /**
   * This menthod increases the border thickness
   *
   * @param event - html event
   *
   * @return {void}
   */
  increaseBorderThickness(event) {
    event.preventDefault();
    event.stopPropagation();
    this.border = 'dashed 2px #3359db';
  }

  /**
   * This menthod decreases the border thickness
   *
   * @param event - html event
   *
   * @return {void}
   */
  decreaseBorderThickness(event) {
    event.preventDefault();
    event.stopPropagation();
    this.border = 'dashed 1px #3359db';
  }

  /**
   * This method is called when the host element's dragover event is emitted
   *
   * @param event - html event
   *
   * @return {void}
   */
  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.increaseBorderThickness(event);
  }

  /**
   * This method is called when the host element's mouseover event is emmited
   *
   * @param event - html event
   *
   * @return {void}
   */
  @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
    this.increaseBorderThickness(event);
  }

  /**
   * This method is called when the host element's mouseleave event is emitted
   *
   * @param event - html event
   *
   * @return {void}
   */
  @HostListener('mouseleave', ['$event']) onmouseleave(event) {
    this.decreaseBorderThickness(event);
  }

  /**
   * This method is called when the host element's dragleave event is emitted
   *
   * @param event - html event
   *
   * @return {void}
   */
  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    this.decreaseBorderThickness(event);
  }

  /**
   * This method is called when the host element's click event is emitted
   *
   * @param event - html event
   *
   * @return {void}
   */
  @HostListener('click', ['$event']) public onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * This method is called when the host element's drop event is emitted
   *
   * @param event - html event
   *
   * @return {void}
   */
  @HostListener('drop', ['$event']) public onDrop(event) {
    this.decreaseBorderThickness(event);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileAddedEmitter.emit(files[0]);
    }
  }
}
