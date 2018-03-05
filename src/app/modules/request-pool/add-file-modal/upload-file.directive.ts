import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appUploadFile]',
})
export class UploadFileDirective {

  @HostBinding('style.border') private border = 'dashed 1px #3359db';
  @Output() private fileAddedEmitter: EventEmitter<File> = new EventEmitter();

  constructor() { }

  /**
   * This method is called when the host element's dragover event is emitted
   * @param event
   *
   * @return {void}
   */
  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.border = 'dashed 2px #3359db';
  }

  /**
   * This method is called when the host element's dragleave event is emitted
   * @param event
   *
   * @return {void}
   */
  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.border = 'dashed 1px #3359db';
  }

  /**
   * This method is called when the host element's click event is emitted
   * @param event
   *
   * @return {void}
   */
  @HostListener('click', ['$event']) public onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * This method is called when the host element's drop event is emitted
   * @param event
   *
   * @return {void}
   */
  @HostListener('drop', ['$event']) public onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.border = 'dashed 1px #3359db';

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileAddedEmitter.emit(files[0]);
    }
  }
}
