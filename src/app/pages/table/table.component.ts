import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { buttonType, GlobalConstant, role, userStatus } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { ShareDataService } from 'app/service/share-data.service';
import { UserService } from 'app/service/user.service';
import { data } from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy{

  constant: GlobalConstant = new GlobalConstant();

  showModal: boolean = false;

  modalRef?: BsModalRef;

  mode!: number;

  showAlertModal: boolean = false;

  user = new FullUser();

  alertMessage: string = '';

  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required]
  });

  accountTypeForm!: FormGroup;

  statusForm!: FormGroup;
  
  status: any;

  modes = [
    { id: 1, name: role.SUPER_ADMINISTRATOR.name },
    { id: 2, name: role.ADMINISTRATOR.name },
    { id: 3, name: role.VALIDATOR.name }
  ];

  allStatus = [
    { id: 0, name: 'Actif' },
    { id: 1, name: 'Inactif' }
  ];

  currentRoute = "/table";
  isUserRoute: boolean;

  deleteUsers: string;
  listId: number[];

  allId: any;

  isClicked:boolean = true;
  typeButton: string = "";

  isCheckAll: boolean = false;
  isChecked: boolean = false;
  singleCheck: boolean = false;

  userList: FullUser[] = [];
  userIdList: number[] = [];

  masterSelected:boolean;
  checklist:FullUser[];
  checkedList:any;

  count: number = 0;

  currentUserName: string;

  emailError: string = '';
  userNameError: string = '';

  editName: string = '';
  editEmail: string = '';

  userId: number;

  currentId: number;

  allUsersSubscription: Subscription;
  usersListSubscription: Subscription;

  editUserId: any[] = [];

  isMultipleDelete: boolean;

  notFoundMessage: string = '';
  
  constructor(private userService: UserService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder) {}

  ngOnDestroy(): void {
    this.usersListSubscription.unsubscribe();
  }

  ngOnInit(){
    this.getUserList();
    
    this.accountTypeForm = this.formBuilder.group({
      value: [0]
    });
      
    this.statusForm = this.formBuilder.group({
      value: [0]
    });  
    
    this.getNotFoundMessage();
  }

  public getNotFoundMessage() {
    this.userService.notFoundMessageSubject.subscribe(data => {
      this.notFoundMessage = data;
    });
  }

  private setDefaultStatus() {
    this.statusForm.setValue(
      {
        value: 'Actif'
      }
    )
  }

  update(updateTemplate) {
        this.modalService.show(updateTemplate,Object.assign({}, { class: 'gray modal-lg' }));
  
  }

  private getUserList() {
    this.userService.getUsers();
    this.usersListSubscription = this.userService.userListSubject.subscribe(data => {
      this.userList = data;
      this.checklist = data;
      this.checklist.forEach(item => {
        item.isSelected = false;
      });
    },
      error => console.log(error)
    ); 
  }

  delete(id: number) {
    if(this.isMultipleDelete) {
      this.allId.forEach(element => {
        this.userService.deleteUser(element).subscribe(() => {
          this.getUserList();
          this.modalService.hide();
        },
        error => console.log(error)
        );
      });
    } else {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUserList();
        this.modalService.hide();
      },
        error => console.log(error)
      );
    }
    this.removeCheck();
  }

  private removeCheck() {
    this.masterSelected = false;
    if(this.allId !== undefined && this.allId.length > 0) {
      this.allId.splice(0, this.allId.length);
    }
  }

  checkUncheckAll() {
    for(let i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    this.allId = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i].isSelected) {
        this.checkedList.push(this.checklist[i]);
      }
    }

    this.setCounter(this.checkedList.length);    
    
    this.checkedList.forEach(element => {
      this.allId.push(element.id);
    });

    this.checkedList = JSON.stringify(this.checkedList);
  }

  private setCounter(count: number) {
    this.count = count;
    if(count > 0) {
      this.listId = this.userIdList;
      this.deleteUsers = '(' + count + ')';
    } else {
      this.deleteUsers = '';
    } 
  }

  // getUserName() {
  //   if(this.allId !== undefined && this.allId.length === 1) {
  //     this.isClicked = false;
  //     this.currentUserName = this.userList.filter(user => user.id === this.allId[0])[0].username;
  //   }
  // }

  setIsClicked() {
    this.isClicked = true;
  }

  setUserName(username: string) {
    if(this.isClicked) {
      this.currentUserName = username;
    }
  }
  
  onModeChanged(value: any) {
    this.mode = value;
  }
  
  onStatusChanged(value: any) {
    this.status = value;
  }
 
  openModal(template: TemplateRef<any>) {
    this.emailError = '';
    this.userNameError = '';
    this.alertMessage = '';
    this.editEmail = '';
    this.editName = '';

    this.typeButton = buttonType.SAVE;
    this.removeUserValueToForm();
    this.setDefaultStatus();
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' }));
  }

  openEditModal(template: TemplateRef<any>, id: number) {
    this.emailError = '';
    this.userNameError = '';
    this.alertMessage = '';
    
    this.typeButton = buttonType.UPDATE;

    this.editUserId.splice(0, this.editUserId.length);
    this.editUserId.push(id);

    this.userService.getUserById(id).subscribe(data => {
      this.user = data;

      this.editEmail = this.user.email;
      this.editName = this.user.username;

      this.setUserValueToForm(this.user);

      this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' }));
    },
    error => console.log(error));
  }

  show(deleteTemplate: TemplateRef<any>, id: number, username: string, isMultipleDelete: boolean) {
    this.isMultipleDelete = isMultipleDelete;

    this.userId = id;
    this.currentUserName = username;
    
    if(this.allId !== undefined) {
      if(this.allId.length === 1 && username === '') {
        this.userService.getUserById(this.allId[0]).subscribe((data: FullUser) => {
          this.currentUserName = data.username;
        },
        error => console.log(error));
      } 
    }
    this.modalRef = this.modalService.show(deleteTemplate);
  }

  setId(id: number) {
    this.currentId = id;
  }

  close() {
    if(this.userNameError !== undefined) {
      if(this.userNameError.length > 0) {
        this.allUsersSubscription.unsubscribe();
      }
    }

    if(this.emailError !== undefined) {
      if(this.emailError.length > 0) {
        this.allUsersSubscription.unsubscribe();
      }
    }
    this.modalService.hide();
  }

  onSubmit() {
    this.user = this.userForm.value;

    const userId = this.editUserId[0];

    if(this.userForm.valid && this.accountTypeForm.value.value !== '' && this.statusForm.value.value !== '') {
      this.alertMessage = '';
      this.user.status = this.statusForm.value.value === userStatus.ACTIVE.value ? 
                            userStatus.ACTIVE.name : userStatus.INACTIVE.name;
                          
      this.modes.forEach(element => {
          if(element.name === this.accountTypeForm.value.value) {
            if(element.name === role.ADMINISTRATOR.name) {
              element.name = role.ADMINISTRATOR.value;
            }
            if(element.name === role.SUPER_ADMINISTRATOR.name) {
              element.name = role.SUPER_ADMINISTRATOR.value;
            }
            if(element.name === role.VALIDATOR.name) {
              element.name = role.VALIDATOR.value;
            }
            this.user.roles = new Array(element); 
          }
      });
      if(this.emailError === '' && this.userNameError === '') {
        if(this.typeButton === buttonType.SAVE) {
          this.userService.registerUser(this.user).subscribe(() => {
            this.userService.emitUserList();
            this.userService.getUsers();
            this.removeCheck();
            this.close();
          },
            error => {
              this.alertMessage = error;
            }
          );  
        } else if (this.typeButton === buttonType.UPDATE) {
          this.userService.updateUser(this.user,userId).subscribe(() => {
            this.userService.emitUserList();
            this.userService.getUsers();
            this.removeCheck();
            this.close();
          },
            error => {
              this.alertMessage = error
            }
          );
        } 
      }
            
      this.modes.forEach(element => {
        if(element.name === role.ADMINISTRATOR.value) {
          element.name = role.ADMINISTRATOR.name;
        }
        if(element.name === role.SUPER_ADMINISTRATOR.value) {
          element.name = role.SUPER_ADMINISTRATOR.name;
        }
        if(element.name === role.VALIDATOR.value) {
          element.name = role.VALIDATOR.name;
        }
      });  
    } else {
      this.alertMessage = 'Veuillez renseigner tous les champs';
    }  
  } 

  getEmailValue(event: any) {
    this.emailError = '';
    this.allUsersSubscription = this.userService.getAllUsers().subscribe(data => {
      data.forEach(user => {
        if(event.target.value === user.email && event.target.value !== this.editEmail) {
          this.emailError = "Adresse email déjà utilisé";
        }
      });
    });
  }

  getUserNameValue(event: any) {
    this.userNameError = '';
    this.allUsersSubscription = this.userService.getAllUsers().subscribe(data => {
      data.forEach(user => {
        if(event.target.value === user.username && event.target.value !== this.editName) {
          this.userNameError = "Le nom d'utilisateur '" + user.username + "' est déjà pris";
        }
      });
    });
  }

  hide() {
    this.alertMessage = '';
  }

  private setUserValueToForm(user: FullUser) {
    this.userForm.setValue({
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      username: user.username
    });

    this.statusForm.setValue({
      value: user.status === 'ACTIVE' ? 'Actif' : 'Inactif'
    });

    this.accountTypeForm.setValue({
      value: this.getRoleValueInForm(user.roles[0].name)
    });
  }

  private getRoleValueInForm(value: string): string {
    if(value === role.SUPER_ADMINISTRATOR.value) {
      value = role.SUPER_ADMINISTRATOR.name;
    } else if(value === role.ADMINISTRATOR.value) {
      value = role.ADMINISTRATOR.name;
    } else if(value === role.VALIDATOR.value) {
      value = role.VALIDATOR.name;
    }

    return value;
  }

  private removeUserValueToForm() {
    this.userForm.setValue({
      lastName: '',
      firstName: '',
      email: '',
      username: ''
    });

    this.statusForm.setValue({
      value: ''
    });

    this.accountTypeForm.setValue({
      value: ''
    });
  }
    
}
