import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable, TemplateRef } from '@angular/core';
import { role, userStatus } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

}