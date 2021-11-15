import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstant, role } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { ShareDataService } from 'app/service/share-data.service';
import { UserAuthService } from 'app/service/user-auth.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new FullUser();

  constant = new GlobalConstant();

  userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required]
  });

  alertMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private shareDataService: ShareDataService) { }

  ngOnInit(): void {
  }

  private login(): void {
    this.user = this.userForm.value;

    if(this.userForm.valid) {
      this.userService.login(this.user).subscribe((data: any) => {      
        const isFirstConnexion = true;
  
        const userRole = data.user.roles[0].name;
  
        this.userService.checkIfPasswordReset(data.user.id,isFirstConnexion).subscribe(value => {
          if(value) {
            this.userAuthService.setUsername(data.user.username);
            this.router.navigate(['reset-default-password']);
          } else {
            this.userAuthService.setToken(data.jwtToken);
            this.userAuthService.setRoles(data.user.roles);
            this.userAuthService.setEmail(data.user.email);
            if(userRole === role.SUPER_ADMINISTRATOR.value) {
              this.router.navigate(['users']);
            } else if(userRole === role.ADMINISTRATOR.value) {
              this.router.navigate(['fichiers']);
            }  
          }
        },
        error => console.log(error)
        );
        
      },
      error => {
        this.alertMessage = error.error;
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
