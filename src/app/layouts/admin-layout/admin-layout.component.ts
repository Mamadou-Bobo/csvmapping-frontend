import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'app/service/user/share-data.service';
import { UserAuthService } from 'app/service/user/user-auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(public router: Router,
              private shareDataService: ShareDataService,
              private userAuthService: UserAuthService) {

              }

  isClicked: boolean = true;
  role: string = "";

  message: string = '';

  ngOnInit() {
    this.userAuthService.getRoles().forEach((value:any) => {
      this.role = value.name;
    });

    this.shareDataService.isClickedSubject.subscribe(
      data => {
        this.isClicked = data;
        console.log(this.isClicked);
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
