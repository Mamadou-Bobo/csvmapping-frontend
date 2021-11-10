import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstant } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { UserAuthService } from 'app/service/user-auth.service';
import { UserService } from 'app/service/user.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  
  user = new FullUser();

  constant = new GlobalConstant();

  userForm = this.formBuilder.group({
    code: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmNewPassword: ['', Validators.required]
  });

  alertMessage: string = "";
  link: string = "";

  isClicked: boolean = false;

  blockButton: boolean = false;

  type: string = "danger";

  subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  private updatePassword(): void {
    this.user = this.userForm.value;


    if(this.userForm.valid) {
      const token = this.activatedRoute.snapshot.params['token'];
      this.userService.updatePassword(token,this.user).subscribe(
        (data: any) => {
          console.log(data);
          let x = 6;
            this.subscription = interval(1000).subscribe(
              () => { 
                x--;
                this.alertMessage = data + ". Vous allez être rédirigé dans " + x + "s";
                if(x === 0) {
                  this.subscription.unsubscribe();
                  this.router.navigate(['login']);
                }
              }
            );
            this.blockButton = true;
            this.type = "success";
        }, error => {
          this.link = "";
          if(error.error.includes(".")) {
            let splits = error.error.split(".");
            this.alertMessage = splits[0];
            this.alertMessage += "." + splits[1];
            this.link = splits[2];
          } else {
            this.alertMessage = error.error;
          }
          this.type = "danger";
        } 
      );
    } else {
      this.alertMessage = "Veuillez renseigner tous les champs";
    }
  }

  onSubmit(): void {
    this.updatePassword();
  }

}
