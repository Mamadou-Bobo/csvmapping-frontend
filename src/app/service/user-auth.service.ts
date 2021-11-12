import { Injectable } from '@angular/core';
import { Role } from 'app/model/role';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: Role[]): void {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public setEmail(email: string): void {
    localStorage.setItem("email", email);
  }

  public getEmail(): string {
    return localStorage.getItem("email");
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem("roles"));
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem("jwtToken");
  }

  public clear() {
    localStorage.clear();
  }

  public loggedIn() {
    return this.getRoles() && this.getToken();
  }
}
