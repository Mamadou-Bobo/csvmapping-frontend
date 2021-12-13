import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'app/modal/modal.component';
import { File } from 'app/model/file';
import { FileService } from 'app/service/mapping/file.service';
import { ShareDataService } from 'app/service/user/share-data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit, OnDestroy {

  fileList: File[] = [];

  fileListSubscription: Subscription;
  
  constructor(private fileService: FileService,
              public dialog: MatDialog) {
              }

  ngOnDestroy(): void {
    this.fileListSubscription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }

  ngOnInit(){
    this.getUserList();
  }

  private getUserList() {
    this.fileService.getFiles();
    this.fileListSubscription = this.fileService.fileListSubject.subscribe(data => {
      this.fileList = data;
    },
      error => console.log(error)
    ); 
  }

}
