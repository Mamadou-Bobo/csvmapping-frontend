import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { role } from 'app/common/global-constant';
import { FileComponent } from 'app/pages/file/file.component';
import { ListMappingComponent } from 'app/pages/list-mapping/list-mapping.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'users',          
      component: TableComponent, 
      canActivate: [AuthGuard],
      data: {roles:[{id:1,name:role.SUPER_ADMINISTRATOR.value}]}
    },
    { path: 'fichiers',       component: FileComponent,
      canActivate: [AuthGuard],
      data: {roles:[{id:2,name:role.ADMINISTRATOR.value}]}
    },
    { path: 'mapping',     
      component: ListMappingComponent,
      canActivate: [AuthGuard],
      data: {roles: [{id:2,name:role.ADMINISTRATOR.value},{id:3,name:role.VALIDATOR.value}]}
    },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent }
];
