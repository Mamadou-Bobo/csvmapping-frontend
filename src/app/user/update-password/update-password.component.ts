import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstant, role } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { User } from 'app/model/user';
import { UserAuthService } from 'app/service/user-auth.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  user = new FullUser();

  constant = new GlobalConstant();

  userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required]
  });

  type: string;

  isClicked: boolean = false;

  blockButton: boolean = false;

  alertMessage: string = "";

  dissmissible = true;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  private sendEmail(): void {
    this.user = this.userForm.value;

    if(this.userForm.valid) {
      this.alertMessage = "";
      this.isClicked = true;
      this.blockButton = true;
      this.userService.sendEmail(this.user).subscribe(() => {
        this.isClicked = false;
        this.type = "success";
        this.alertMessage = "Le code a été envoyé avec succès. Merci de vérifier votre boîte email."
      }, (error) => {
        this.type = "danger";
        this.isClicked = false;
        this.blockButton = false;
        this.alertMessage = error.error;
      }
      );
    } else {
      this.alertMessage = "Veuillez renseigner tous les champs.";
    }
  }

  onSubmit(): void {
    this.sendEmail();
  }

}
