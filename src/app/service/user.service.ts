import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { role, userStatus } from 'app/common/global-constant';
import { FullUser } from 'app/model/full-user';
import { Observable, Subject } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080";

  userListSubject = new Subject<FullUser[]>();

  requestHeader = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  );

  userList: FullUser[] = [];

  notFoundMessageSubject = new Subject<string>();

  notFoundMessage: string;

  constructor(private httpClient: HttpClient,
              private userAuthService: UserAuthService) { }

  public login(user: FullUser) {
    return this.httpClient.post(this.baseUrl + "/authenticate", user, {headers: this.requestHeader});
  }

  public registerUser(user: FullUser): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/users/add-user", user);
  }

  public updateUser(user: FullUser, id: any): Observable<Object> {
    return this.httpClient.put(this.baseUrl + "/users/update/" + id, user, {responseType: 'text'});
  }

  public getUserList(): Observable<FullUser[]> {
    return this.httpClient.get<FullUser[]>(this.baseUrl + "/users/findUsers");
  }

  public getAllUsers(): Observable<FullUser[]> {
    return this.httpClient.get<FullUser[]>(this.baseUrl + "/users/findAll");
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j].name) {
            isMatch = true;
            return isMatch;
          } 
        }
      }
    }

    return isMatch;
  }

  public getUserById(id?: number): Observable<FullUser> {
    return this.httpClient.get<FullUser>(this.baseUrl + "/users/user/" + id);
  }

  public deleteUser(id?: number): Observable<Object> {
    return this.httpClient.delete(this.baseUrl + "/users/delete/" + id);
  }

  public deleteMultipleUser(usersId: number[]): Observable<Object> {
    return this.httpClient.delete(this.baseUrl + "/users/multiple/delete");
  }

  public emitUserList() {
    this.userListSubject.next(this.userList);
  }

  public userListConverter(userList: FullUser[]): FullUser[] {
    userList.forEach(user => {
      user.status = user.status === userStatus.ACTIVE.name ? userStatus.ACTIVE.value 
                                                           : userStatus.INACTIVE.name ? 
                                                            userStatus.INACTIVE.value : '';

      if(user.roles[0].name === role.SUPER_ADMINISTRATOR.value) {
        user.roles[0].name = role.SUPER_ADMINISTRATOR.name;
      } else if(user.roles[0].name === role.ADMINISTRATOR.value) {
        user.roles[0].name = role.ADMINISTRATOR.name;
      } else if(user.roles[0].name === role.VALIDATOR.value) {
        user.roles[0].name = role.VALIDATOR.name;
      }
    });

    return userList;
  }

  public emitNotFoundMessage() {
    this.notFoundMessageSubject.next(this.notFoundMessage);
  }
  
  public getUsers() {
    this.getUserList().subscribe(data => {
      this.userList = this.userListConverter(data);
      this.emitUserList();
    });
  }

  public sendEmail(user: FullUser): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/email/send", user, {headers: this.requestHeader});
  }

  public updatePassword(token: string, user: FullUser): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/users/user/reset-password/" + token, user, {headers: this.requestHeader, responseType: 'text'});
  }

  public checkIfPasswordReset(id: number, isFirstConnexion: boolean): Observable<Object> {
    return this.httpClient.get<boolean>(this.baseUrl + "/users/user/check-first-connexion/" + id + "/" + isFirstConnexion, {headers: this.requestHeader});
  }

  public updateDefaultPassword(user: FullUser, id: number): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/users/user/reset-default-password/" + id, user, {headers: this.requestHeader, responseType: 'text'});
  }
}
