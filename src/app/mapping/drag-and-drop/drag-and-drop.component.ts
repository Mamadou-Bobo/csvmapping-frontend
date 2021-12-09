import { Component, OnInit } from '@angular/core';
import { FileService } from 'app/service/mapping/file.service';
import { ShareDataService } from 'app/service/user/share-data.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  // constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  // files: any[] = [];

  // /**
  //  * on file drop handler
  //  */
  // onFileDropped($event) {
  //   this.prepareFilesList($event);
  // }

  // /**
  //  * handle file from browsing
  //  */
  // fileBrowseHandler(files) {
  //   this.prepareFilesList(files);
  // }

  // /**
  //  * Delete file from files list
  //  * @param index (File index)
  //  */
  // deleteFile(index: number) {
  //   this.files.splice(index, 1);
  // }

  // /**
  //  * Simulate the upload process
  //  */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           this.uploadFiles();
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  // /**
  //  * Convert Files list to normal array list
  //  * @param files (Files List)
  //  */
  // prepareFilesList(files: Array<any>) {
  //   if(this.files.length === 0) {
  //     for (const item of files) {
  //       item.progress = 0;
  //       this.files.push(item);
  //     }
  //     this.uploadFilesSimulator(0);
  //   } else {
  //     console.log("impossible d'ajouter un autre fichier");
  //   }
  // }

  // uploadFiles() {
  //   this.files.forEach(file => {
  //     this.uploadFile(file);
  //   });
  // }

  // uploadFile(file) {
  //   const formData = new FormData();

  //   formData.append("file", file);

  //   this.fileService.uploadFile(formData).subscribe(
  //     (error) => {
  //       console.log(error);
  //     } 
  //   );
  // }

  // /**
  //  * format bytes
  //  * @param bytes (File size in bytes)
  //  * @param decimals (Decimals point)
  //  */
  // formatBytes(bytes, decimals) {
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals || 2;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }

}
