import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileService } from '../../../services/files.service';
import { AlertService } from '../../../services/alert.service';
import { SessionService } from '../../../services/session.service';


@Component({
  selector: 'app-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['./add-file-modal.component.scss'],
})

export class AddFileModalComponent {
  @Output() closeFileModal = new EventEmitter();
  @Output() modifiedSession = new EventEmitter();
  @ViewChild('fileToUpload') fileToUploadElementRef: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() sessionId;
  @Input() requestId;
  @Input() sessionDate;
  file: File;
  loading: boolean;
  uploadedFileName;
  maxFileSize = (5 * Math.pow(1024, 2));

  constructor(
    private fileService: FileService,
    private sessionService: SessionService,
    private alertService: AlertService) { }

  /**
   * This method is called when a file is added on the file input.
   *
   * @param event - html event from the file input containing the file
   *
   * @return {void}
   */
  fileInputChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  /**
   * Handle the submission of the form.
   *
   * @param form - form containing the file detils
   *
   * @return {void}
   */
  submitForm(form) {
    const uploadedFileName = form.value['fileTitle'];
    this.uploadedFileName = uploadedFileName.trim();
    if (this.sessionId  === null) {
      const formData = new FormData();
      formData.append('date', this.sessionDate);
      this.sessionService.createSession(formData, this.requestId)
        .toPromise()
        .then((response) => {
          this.sessionId = response.id;
          this.uploadFile();
        });
    } else {
      this.uploadFile();
    }

  }

  /**
   * Uploads a file to a particular session
   *
   * @return {void}
   */
  uploadFile() {
    if (this.file && this.file.size < this.maxFileSize) {
      const formData = new FormData();
      formData.append('file', this.file);
      if (this.uploadedFileName !== undefined && this.uploadedFileName.length !== 0) {
        formData.append('name', this.uploadedFileName);
      }

      this.loading = true;
      this.fileService.addFile(formData, this.sessionId)
        .toPromise()
        .then((response) => {
          this.modifiedSession.emit(response);
          this.loading = false;
          this.closeAddFileModal();
        });
    } else if (this.file.size > this.maxFileSize) {
      const confirmationMessage = `File size limit of 5MB has been exceeded, please try again.`;
      this.alertService.showMessage(confirmationMessage);
    }

  }

/**
 * Emits event to the parent component in order to close the modal
 *
 * @return {void}
 */
  closeAddFileModal() {
    this.closeFileModal.emit();
  }

  /**
  *Removes the file object from the component and removes the file added to input file element
  *
  * @return {void}
  */
  removeUploadedFile() {
    this.file = null;
    this.fileInput.nativeElement.value = '';
  }
}
