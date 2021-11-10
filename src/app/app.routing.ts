import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ResetDefaultPasswordComponent } from './user/reset-default-password/reset-default-password.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'restart-password',
    component: UpdatePasswordComponent
  },
  {
    path: 'save-password/:token',
    component: ChangePasswordComponent
  },
  {
    path: 'reset-default-password/:id',
    component: ResetDefaultPasswordComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data:{roles:[{id:1,name:'SUPER_ADMINISTRATOR'},{id:2,name:'ADMINISTRATOR'}]},
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
