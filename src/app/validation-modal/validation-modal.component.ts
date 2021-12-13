import { Component, OnDestroy, OnInit } from '@angular/core';
import { File } from 'app/model/file';
import { FileService } from 'app/service/mapping/file.service';
import { ShareDataService } from 'app/service/user/share-data.service';
import { UserAuthService } from 'app/service/user/user-auth.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-validation-modal',
  templateUrl: './validation-modal.component.html',
  styleUrls: ['./validation-modal.component.css']
})
export class ValidationModalComponent implements OnInit {
  
  mappingData: string[] = [];
  filename: string = '';
  originaleFileName: string = '';

  isValidator: boolean;

  fileExitType: string = "";

  constructor(private ShareDataService: ShareDataService,
              private fileService: FileService,
              private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.ShareDataService.fileValidationSubject.pipe(first()).subscribe((data: any) => {
      this.mappingData = data.data;
      this.filename = data.filename;
      this.originaleFileName = data.originaleFileName;
      this.fileExitType = data.fileExitType;
    }, error => console.log(error));

    this.isValidator = this.getCurrentUserRole();
  }

  validateFile() {
    let object = {
      newFileName: this.filename,
      isValidate: "validé",
      fileExitType: this.fileExitType
    }

    console.log(object);

    this.fileService.updateValidationStatus(object).subscribe(() => {
      console.log("Fichier validé avec succès");
      this.deleteFileFromDiskAfterValidation();
      this.ShareDataService.emitValidationStatus();
    },
    error => console.log(error)
    );
  }

  invalidateFile() {
    let object = {
      newFileName: this.filename,
      isValidate: "invalidé",
      fileExitType: this.fileExitType
    }

    this.fileService.updateValidationStatus(object).subscribe(() => {
      console.log("Fichier invalidé avec succès");
      this.ShareDataService.emitValidationStatus();
    },error => console.log(error));

  }

  getCurrentUserRole(): boolean {
    let role = "";
    this.userAuthService.getRoles().forEach((element: any) => {
      role = element.name;
    });

    if(role === 'VALIDATOR') {
      return true;
    }

    return false;
  }

  deleteFileFromDiskAfterValidation() {
    this.fileService.deleteFileFromDiskAfterValidation(this.originaleFileName).subscribe(() => {
      
    }, error => console.log(error));
  }

}
