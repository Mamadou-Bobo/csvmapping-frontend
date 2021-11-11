import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstant, role, userStatus } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { ShareDataService } from 'app/service/share-data.service';
import { UserService } from 'app/service/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

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
