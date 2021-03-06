import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  alertMessage: string = '';
  isClicked: boolean = false;
  headerArray: any[] = [];
  isFileUpload: boolean = false;
  columnSeparator: string = "";
  outPutHeaderArray: string[] = [];
  columnsMapping: string[] = [];
  separatorArray: string[] = [];
  headerlength: number = 0;
  exitType: string = '';
  filename: string = '';
  mappingData: string[] = [];
  fileValidationObject: Object;
  validationStatus: boolean;

  alertMessageSubject = new Subject<string>();
  isClickedSubject = new Subject<boolean>();
  headerArraySubject = new Subject<any[]>();
  isFileUploadSubject = new Subject<boolean>();
  columnSeparatorSubject = new Subject<string>();
  outPutHeaderArraySubject = new Subject<string[]>();
  separatorArraySubject = new Subject<string[]>();
  columnsMappingSubject = new Subject<string[]>();
  headerLengthSubject = new Subject<number>();
  exitTypeSubject = new Subject<string>();
  mappingDataSubject = new Subject<string[]>();
  filenameSubject = new Subject<string>();
  fileValidationSubject = new Subject<Object>();
  validationStatusSubject = new Subject<Object>();

  emitAlertMessage() {
    this.alertMessageSubject.next(this.alertMessage);
  }

  emitIsClicked() {
    this.isClickedSubject.next(this.isClicked);
  }

  emitHeaderArray() {
    this.headerArraySubject.next(this.headerArray);
  }

  emitIsFileUpload() {
    this.isFileUpload = !this.isFileUpload;
    this.isClickedSubject.next(this.isFileUpload);
  }

  emitColumnSeparator() {
    this.columnSeparatorSubject.next(this.columnSeparator);
  }

  emitOutPutHeaderArray() {
    this.outPutHeaderArraySubject.next(this.outPutHeaderArray);
  }

  emitSeparatorArray() {
    this.separatorArraySubject.next(this.separatorArray);
  }

  emitColumnsMapping() {
    this.columnsMappingSubject.next(this.columnsMapping);
  }

  emitHeaderLength() {
    this.headerLengthSubject.next(this.headerlength);
  }

  emitExitType() {
    this.exitTypeSubject.next(this.exitType);
  }

  emitMappingData() {
    this.mappingDataSubject.next(this.mappingData);
  }

  emitFileName() {
    this.filenameSubject.next(this.filename);
  }

  emitFileValidationObject() {
    this.fileValidationSubject.next(this.fileValidationObject);
  }

  emitValidationStatus() {
    this.validationStatus = !this.validationStatus;
    this.validationStatusSubject.next(this.validationStatus);
  }

}
