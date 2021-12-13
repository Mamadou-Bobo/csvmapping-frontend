import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { File } from 'app/model/file';
import { FileService } from 'app/service/mapping/file.service';
import { ShareDataService } from 'app/service/user/share-data.service';
import { ValidationModalComponent } from 'app/validation-modal/validation-modal.component';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-list-mapping',
  templateUrl: './list-mapping.component.html',
  styleUrls: ['./list-mapping.component.css']
})
export class ListMappingComponent implements OnInit, OnDestroy {

  mappedFileSubscription: Subscription;
  mappingDataSubscription: Subscription;
  validationStatusSubscription: Subscription;

  fileList: File[] = [];

  filename: string = "";

  constructor(private fileService: FileService,
              public dialog: MatDialog,
              public shareDataService: ShareDataService) { }

  ngOnDestroy(): void {
    this.mappedFileSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getFileList();

    this.validationStatusSubscription = this.shareDataService.validationStatusSubject.subscribe(() => {
      this.getFileList();
    }, error => console.log(error));
  }

  openDialog() {
    this.dialog.open(ValidationModalComponent);
  }

  getFileList(): void {
    this.mappedFileSubscription = this.fileService.getMappedFiles().subscribe((data: File[]) => {
      this.fileList = data;
    }, error => console.log(error));
  }

  retriewMappingData(fileName: string, fileExitType: string, id: number, index: number) {
    this.fileService.getMappedDataFromFile(fileName,fileExitType).pipe(first()).subscribe((data: string[]) => {
      this.shareDataService.mappingData = data;
      
      let object = {
        id: id,
        filename: fileName,
        data: data,
        originaleFileName: this.fileList[index].filename,
        fileExitType: fileExitType
      };
      this.shareDataService.fileValidationObject = object;
      this.shareDataService.emitFileValidationObject();
    }, error => console.log(error));
  }

  download(filename: string, fileExitType: string): void {
    this.fileService.downloadFile(filename,fileExitType).subscribe(blob => {
      saveAs(blob,filename);
    }, error => console.log(error));
  }

}
