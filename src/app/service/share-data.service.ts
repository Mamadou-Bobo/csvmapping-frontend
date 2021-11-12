import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  alertMessage: string = '';
  isClicked: boolean = false;

  alertMessageSubject = new Subject<string>();
  isClickedSubject = new Subject<boolean>();

  emitAlertMessage() {
    this.alertMessageSubject.next(this.alertMessage);
  }

  emitIsClicked() {
    this.isClickedSubject.next(this.isClicked);
  }

}
