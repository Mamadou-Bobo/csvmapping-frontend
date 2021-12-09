import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'app/service/user/share-data.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(public router: Router,
              private shareDataService: ShareDataService) {

              }

  isClicked: boolean = true;

  message: string = '';

  ngOnInit() {
    this.shareDataService.isClickedSubject.subscribe(
      data => {
        this.isClicked = data;
      },
      error => console.log(error)
    );

    this.shareDataService.alertMessageSubject.subscribe(
      data => {
        this.message = data;
        this.isClicked = false;
        setTimeout(() => {
          this.shareDataService.isClicked = true;
          this.shareDataService.emitIsClicked();
        }, 4000);
      },
      error => console.log(error)
    );
  }
  close() {
    this.isClicked = true;
    this.message = '';
  }

}
