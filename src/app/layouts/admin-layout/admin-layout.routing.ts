import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { role } from 'app/common/global-constant';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'users',          
      component: TableComponent, 
      canActivate: [AuthGuard],
      data: {roles:[{id:1,name:role.SUPER_ADMINISTRATOR.value}]}
    },
    { path: 'fichiers',       component: TypographyComponent,
      canActivate: [AuthGuard],
      data: {roles:[{id:2,name:role.ADMINISTRATOR.value}]}
    },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
