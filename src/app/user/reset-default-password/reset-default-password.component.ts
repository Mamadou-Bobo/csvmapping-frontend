import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstant, role } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { UserAuthService } from 'app/service/user-auth.service';
import { UserService } from 'app/service/user.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-default-password',
  templateUrl: './reset-default-password.component.html',
  styleUrls: ['./reset-default-password.component.css']
})
export class ResetDefaultPasswordComponent implements OnInit {

  
  user = new FullUser();

  alertMessage: string = "";
  link: string = "";

  blockButton: boolean = false;

  type: string = "danger";

  subscription: Subscription;

  userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmNewPassword: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  private login(): void {
    this.user = this.userForm.value;

    const userId = this.activatedRoute.snapshot.params['id'];
    
    if(this.userForm.valid) {
      this.userService.updateDefaultPassword(this.user,userId).subscribe((data: any) => {
        let x = 6;
      
        this.subscription = interval(1000).subscribe(
          () => { 
            this.type = "success";
            this.blockButton = true;
            x--;
            this.alertMessage = data + "Vous allez être rédirigé dans " + x + "s";
            if(x === 0) {
              this.subscription.unsubscribe();
              this.router.navigate(['login']);
            }
          }
        );
      },
      (error: any) => {
        this.alertMessage = error.error;
        this.type = "danger";
      }
      );
    } else {
      this.alertMessage = "Veuillez renseigner tous les champs";
    }
  }

  onSubmit(): void {
    this.login();
  }

}
