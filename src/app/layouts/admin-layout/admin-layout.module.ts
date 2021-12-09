import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListUserComponent } from 'app/user/list-user/list-user.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LoadingComponent } from 'app/loading/loading.component';
import { FileComponent } from 'app/pages/file/file.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DndDirective } from 'app/mapping/dnd.directive';
import { DragAndDropComponent } from 'app/mapping/drag-and-drop/drag-and-drop.component';
import { ProgressComponent } from 'app/mapping/progress/progress/progress.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LineMappingComponent } from 'app/mapping/component/line-mapping/line-mapping.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from 'app/modal/modal.component';
import { CubeLoadingComponent } from 'app/cube-loading/cube-loading.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    DragDropModule,
    MatDialogModule,
    ButtonsModule.forRoot()
  ],
  exports: [FileComponent],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    ListUserComponent,
    LoadingComponent,
    FileComponent,
    ModalComponent,
    DragAndDropComponent,
    DndDirective,
    ProgressComponent,
    LineMappingComponent,
    CubeLoadingComponent
  ]
})

export class AdminLayoutModule {}
