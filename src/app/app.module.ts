import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from "@angular/platform-browser";
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthGuard } from "./auth/auth.guard";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { UserService } from "./service/user.service";
import { DeleteModalComponent } from './modal/delete-modal/delete-modal.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ResetDefaultPasswordComponent } from './user/reset-default-password/reset-default-password.component';
import { CubeLoadingComponent } from "./cube-loading/cube-loading.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ForbiddenComponent,
    DeleteModalComponent,
    UpdatePasswordComponent,
    ChangePasswordComponent,
    ResetDefaultPasswordComponent,
    CubeLoadingComponent    
],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    RouterModule,
    NavbarModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
