import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public usersList: Array<any> = [
    {name: 'Jane A.', balance: 900}
  ]

  public currentUser;

  constructor() {
    this.currentUser = this.usersList[0];
  }
}
