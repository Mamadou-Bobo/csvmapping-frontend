import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareDataService } from 'app/service/user/share-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-mapping',
  templateUrl: './line-mapping.component.html',
  styleUrls: ['./line-mapping.component.css']
})
export class LineMappingComponent implements OnInit, OnDestroy {

  data: any[] = [];

  value: string = "";

  array: string[] = [];

  separatorArray: string[] = [];

  outPutHeaderArray: string[] = [];
  outPutHeader: String = "";
  columnsMapping: string[] = [];

  exitTypeSubscription: Subscription;

  columnSeparatorSubscription: Subscription;
  headerArraySubscription: Subscription;

  columnSeparator: string = "";

  exitType: string = '';

  lineSeparator: string = '';

  constructor(private shareDataService: ShareDataService) { }

  ngOnDestroy(): void {
    this.columnSeparatorSubscription.unsubscribe();
    this.exitTypeSubscription.unsubscribe();
  }

  getHeaderArray(): void {
    this.headerArraySubscription = this.shareDataService.headerArraySubject.subscribe(data => {
      this.data = data;
      this.convertArrayToString();
    },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.getHeaderArray();

    this.getSeparator();  

    this.exitTypeSubscription = this.shareDataService.exitTypeSubject.subscribe(data => {
      this.exitType = data;
      if(this.exitType === 'ligne') {
        this.columnSeparator = "\n";
        
      }
    }, error => console.log(error));

  }

  getSeparator(): void {
    this.columnSeparatorSubscription = this.shareDataService.columnSeparatorSubject.subscribe(data => {
      // this.getHeaderArray();
     if(data === " ") {
        this.columnSeparator = "";
      } else {
        this.columnSeparator = data;
      }

      this.lineSeparator = this.columnSeparator;
       
      this.parseArray();
    },
    error => console.log(error));
  }

  convertArrayToString() {
    this.value = this.data.toString();
    this.array.push(this.value);
    this.shareDataService.headerlength = this.array.length;
    this.shareDataService.emitHeaderLength();
  }

  onNameChange($event, index: number) {
    // on ajoute la valeur de l'input dans le tableau à l'index spécifié
    let name = $event.target.value;

    if(this.exitType === 'ligne') {
      name += this.lineSeparator;
    } else if(this.exitType === 'colonne') {
      name += "";
    }

    this.outPutHeaderArray.splice(index,1,name);


    console.log(this.outPutHeaderArray);

    this.shareDataService.outPutHeaderArray = this.outPutHeaderArray;
    this.shareDataService.emitOutPutHeaderArray();

    if($event.target.value === "" || $event.target.value === " ") {
      this.shareDataService.headerlength = 0;
      this.shareDataService.emitHeaderLength();
    } else {
      this.shareDataService.headerlength = this.array.length;
      this.shareDataService.emitHeaderLength();
    }
  }

  onModelChange($event,index: number) {    
    if($event.target.value === this.columnSeparator) {
      alert("Veuillez choisir des séparateurs différents");
      $event.target.value = "";
      this.separatorArray.splice(index,0,"undefined");
    } else if($event.target.value === " " && this.columnSeparator === "") {
      alert("Veuillez choisir des séparateurs différents");
      $event.target.value = "";
      this.separatorArray.splice(index,0,"undefined");
    } else {
      if($event.target.value.length > 1) {
        alert("Le séparateur ne doit pas être supérieur à 1");
        $event.target.value = "";
        this.separatorArray.splice(index,0,"undefined");
      } else {
        this.separatorArray.splice(index,0,$event.target.value);
      }
      if($event.target.value === " ") {
        this.separatorArray.splice(index,0,"");
      }
    }

    this.parseArray();
  }

  parseArray() {
    if(this.exitType === 'ligne') {
      this.columnSeparator = "\n";
    } else if(this.exitType === 'colonne') {
      this.getSeparator();
    }

    const columnSeparator = " " + this.columnSeparator + " ";

    let columnsMappingArray = new Array();

    this.array.forEach(line => {
      columnsMappingArray.push(line.split(","));
    });

    let text = "";

    let mappingArray = new Array();

    for(let i = 0; i < columnsMappingArray.length; i++) {
      text = columnsMappingArray[i].join(" " + this.separatorArray[i] + " ");
      text += columnSeparator;
      mappingArray.push(text);
    }

    let value = "";

    for(let i = 0; i < mappingArray.length; i++) {
      value += mappingArray[i];
    }

    
    if(this.exitType === 'colonne') {
      this.columnsMapping = value.split(" ");
      this.columnsMapping.splice(this.columnsMapping.length-2,2);
    } else if(this.exitType === 'ligne') {
      this.columnsMapping = value.split(" ");
      this.columnsMapping.splice(this.columnsMapping.length-1,1);
    }

    console.log(this.columnsMapping);
    
    this.shareDataService.columnsMapping = this.columnsMapping;
    this.shareDataService.emitColumnsMapping();
  }

  onValuesChange($event, index: number) {
    this.array.splice(index,1,$event.target.value);
  }

  delete(index) {
    this.array.splice(index,1);
  }

}
