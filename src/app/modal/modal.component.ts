import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { File } from 'app/model/file';
import { FileService } from 'app/service/mapping/file.service';
import { ShareDataService } from 'app/service/user/share-data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';


interface ExitType {
  value: string;
}

interface DataType {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  header: string;
  length: number;
  mandatory: string;
  type: string;
  format: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {header: 'ID', length: 1, mandatory: 'ID', type: 'H', format: 'yes'},
  {header: 'Nom', length: 1, mandatory: 'Nom', type: 'He', format: 'yes'},
  {header: 'Prénom', length: 1, mandatory: 'Prénom', type: 'Li', format: 'yes'},
  {header: 'Age', length: 1, mandatory: 'Age', type: 'Be', format: 'yes'},
  {header: 'Genre', length: 1, mandatory: 'Genre', type: 'B', format: 'yes'},
  {header: 'Genre', length: 1, mandatory: 'Genre', type: 'B', format: 'yes'},
  {header: 'Genre', length: 1, mandatory: 'Genre', type: 'B', format: 'yes'},
];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['header', 'length', 'mandatory', 'type','format'];
  dataSource = ELEMENT_DATA;

  selectedValue: string;
  value: string;
  mandatorySelectedValue: string;

  typeArray: DataType[] = [
    {
      value: '',
      viewValue: ''
    },
    {
      value: 'integer',
      viewValue: 'Entier'
    },
    {
      value: 'decimal',
      viewValue: 'Décimal'
    },
    {
      value: 'boolean',
      viewValue: 'Booléen'
    },
    {
      value: 'date',
      viewValue: 'Date'
    },
    {
      value: 'string',
      viewValue: 'Chaîne de caractère'
  }];

  file: any;

  formatArray: String[] = [];

  selectedType: string;

  mandatoryArray: string[] = [];

  exitType: ExitType[] = [
    {value: 'ligne'},
    {value: 'colonne'}
  ];

  dataType: DataType[] = [
    {value: '', viewValue: ''},
    {value: 'integer', viewValue: 'Entier'},
    {value: 'string', viewValue: 'Chaîne de caractère'},
    {value: 'decimal', viewValue: 'Décimal'},
    {value: 'boolean', viewValue: 'Booléen'},
    {value: 'date', viewValue: 'Date'}
  ];

  formats: DataType[] = [
    {value: '', viewValue: ''},
    {value: 'N/A', viewValue: 'N/A'},
    {value: 'true/false', viewValue: 'true/false'},
    {value: 'vrai/faux', viewValue: 'vrai/faux'},
    {value: '1/0', viewValue: '1/0'},
    {value: 'yes/no', viewValue: 'Yes/No'},
    {value: 'dd/mm/yy', viewValue: 'dd/mm/yy'},
    {value: 'yyyy/mm/dd', viewValue: 'yyyy/mm/dd'},
    {value: 'yy/mm/dd', viewValue: 'yy/mm/dd'}
  ];

  mandatory: DataType[] = [
    {value: '', viewValue: ''},
    {value: 'yes', viewValue: 'Oui'},
    {value: 'no', viewValue: 'Non'}
  ];

  selectedFormatValue: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  isEditable = false;

  modalRef?: BsModalRef;

  fileList: File[] = [];

  config: File;

  fileListSubscription: Subscription;

  display: boolean = false;

  // todo = ['age', 'sex', 'bmi', 'children', 'smoker', 'region', 'charges']; 

  // header = [{libele: 'age', count: 0}]

  headerArray: any[] = [];
  dataTypeArray: any[];
  dataLengthArray: any[];

  outPutHeaderArraySubscription: Subscription;

  outPutHeaderArray: string[] = [];
  checkBoxValueArray: any[] = [];
  columnsMapping: string[] = [];

  files: any[] = [];

  columnSeparator: string = "";

  numberOfLines: number = 0;

  isNextButtonDisabled: boolean = true;

  outPutHeader: string = "";
  columnsMappingSubscription: Subscription;
  numberOfLineLengthSubscription: Subscription;
  close: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private shareDataService: ShareDataService,
              private fileService: FileService) { }

  ngOnDestroy(): void {
    this.outPutHeaderArraySubscription.unsubscribe();
    this.columnsMappingSubscription.unsubscribe();
    this.numberOfLineLengthSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      newFileName: ['', Validators.required],
      separator: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      exitType: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({

    });
    
    this.outPutHeaderArraySubscription = this.shareDataService.outPutHeaderArraySubject.subscribe(data => {
      this.outPutHeaderArray = data;
    }, error => console.log(error));

    this.columnsMappingSubscription = this.shareDataService.columnsMappingSubject.subscribe(data => {
      this.columnsMapping = data;
    }, error => console.log(error));

    this.numberOfLineLengthSubscription = this.shareDataService.headerLengthSubject.subscribe(data => {
      this.numberOfLines = data;
    }, error => console.log(error));
  }

  getData() {
    if(this.headerArray !== undefined && this.headerArray.length > 0) {
      this.headerArray.splice(0,this.headerArray.length);
    }
    this.display = true;
    let separator = this.secondFormGroup.get("separator").value;
    console.log(separator);
    console.log(this.files[0].name);
    this.fileService.getDataStructure(separator,this.files[0].name).subscribe((data: any) => { 
      data.header.forEach(element => {
        const header = {libelle: element}
        this.headerArray.push(header);
      });

      this.display = false;
    },
    error => console.log(error));

  }

  emitExitType() {
    this.shareDataService.exitType = this.thirdFormGroup.get('exitType').value;
    this.shareDataService.emitExitType();
  }

  onSeparatorValueChange() {
    this.shareDataService.columnSeparator = this.columnSeparator;
    this.shareDataService.emitColumnSeparator();
  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.headerArray = event.container.data;
    this.filterCheckBoxArray(event.container.data);
  }

  setValueToArray(event) {
    if(event.target.checked) {
      this.checkBoxValueArray.push(event.target.name);
    } else {
      let index = this.checkBoxValueArray.indexOf(event.target.name);
      if(index > -1) {
        this.checkBoxValueArray.splice(index,1);
      }
    }
    this.filterCheckBoxArray(this.headerArray);
  }

  filterCheckBoxArray(array) {
    let newArray = new Array();
    if(this.checkBoxValueArray.length > 1) {
      array.forEach(value => {
        if(this.checkBoxValueArray.filter(x => x === value.libelle).toString() !== "") 
          newArray.push(this.checkBoxValueArray.filter(x => x === value.libelle).toString());
      });
      this.checkBoxValueArray = newArray;
    }    
  }

  setValidator() {
    this.firstFormGroup.get('firstCtrl').setValidators(Validators.required);
    this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
  }

  restartValidator() {
    this.firstFormGroup.get('firstCtrl').clearValidators();
    this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
  }

  add() {
    if(this.checkBoxValueArray.length > 0) {
      this.shareDataService.headerArray = this.checkBoxValueArray;
      this.shareDataService.emitHeaderArray();
    }
  }

  generateFile() {
    if(this.numberOfLines === this.outPutHeaderArray.length && this.columnSeparator !== "") {
      if(this.checkColumnsMapping()) {
        alert("Veuillez renseigner tous les champs");
      } else {
        this.close = true;
        if(this.secondFormGroup.get('newFileName').value !== "" && 
           this.thirdFormGroup.get('exitType').value !== "" && 
           this.secondFormGroup.get('separator').value !== "" && 
           this.thirdFormGroup.get("exitType").value === 'colonne') {

            // concaténation avec le séparateur pour former une chaîne de caractère
            this.outPutHeader = this.outPutHeaderArray.join(this.columnSeparator);
             
            let object = {filename: this.secondFormGroup.get('newFileName').value, 
                          exitType: this.thirdFormGroup.get('exitType').value,
                          separator: this.secondFormGroup.get('separator').value,
                          dataComposition: this.columnsMapping,
                          outPutHeader: this.outPutHeader};
            
            this.file = object;

            this.fileService.generateFile(this.file).subscribe(data => {
              console.log(data);
            }, error => console.log(error));

            console.log(this.file);
           } else if(this.secondFormGroup.get('newFileName').value !== "" &&  
                     this.thirdFormGroup.get('exitType').value !== "" && 
                     this.secondFormGroup.get('separator').value !== "" && 
                     this.thirdFormGroup.get("exitType").value === 'ligne') {

                      let object = {filename: this.secondFormGroup.get('newFileName').value, 
                        exitType: this.thirdFormGroup.get('exitType').value,
                        separator: this.secondFormGroup.get('separator').value,
                        dataComposition: this.columnsMapping,
                        header: this.outPutHeaderArray};

                        this.file = object;

                        this.fileService.generateFileLineOutput(this.file).subscribe(data => {
                          console.log(data);
                        }, error => console.log(error));

           }
      }    
    } else {
      alert("Veuillez renseigner tous les champs");
    }
  }

  checkColumnsMapping(): boolean {
    if(this.columnsMapping.length >= 1) {
      this.columnsMapping.forEach(row => {
        if(row === 'undefined') {
          return true;
        } 
      });
    } else if(this.columnsMapping.length === 0) {
      return true;
    }
    
    return false;
  }

  setFormatArray(value,index) {
    this.formatArray[index] = value;
    
    console.log(this.formatArray);
  }

  setMandatoryArray(value,index) {
    this.mandatoryArray[index] = value;
    
    console.log(this.mandatoryArray);
  }

  setTypeArray(value,index) {
    this.typeArray[index] = value;
    
    console.log(this.typeArray);
  }
  
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.isNextButtonDisabled = true;
    this.files.splice(index, 1);
    this.shareDataService.emitIsFileUpload();
    console.log(this.shareDataService.isFileUpload);
    this.setValidator();
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            this.restart();
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    if(this.files.length === 0) {
      for (const item of files) {
        item.progress = 0;
        this.files.push(item);
      }
      this.uploadFilesSimulator(0);
    } else {
      console.log("impossible d'ajouter un autre fichier");
    }
  }

  restart(): void {
    this.isNextButtonDisabled = false;
    this.shareDataService.emitIsFileUpload();

    if(this.shareDataService.isFileUpload) {
      this.restartValidator();
    }
  }

  uploadFile() {
    this.secondFormGroup.setValue({
      newFileName: this.secondFormGroup.get("newFileName").value + ".csv",
      separator: this.secondFormGroup.get("separator").value 
    });
    
    const formData = new FormData();
    this.config = this.secondFormGroup.value;    

    formData.append("file", this.files[0]);
    formData.append("config", JSON.stringify(this.config));

    this.fileService.uploadFile(formData).subscribe(
      (error) => {
        // console.log(error);
      } 
    );
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
