import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userBalance: any;
  public currentUser: any;

  constructor(private _httpClient: HttpClient) {
    this.currentUser = localStorage.logged;
    this.getUserBalance().subscribe((result: any) => {
      this.userBalance = result.cash;
    });
  }

  public getUserBalance(): Observable<Object> {
    return this._httpClient.get('http://localhost:3000/cash')
  }

  public payAmount(amount: number): Observable<Object> {
    return this._httpClient.post('http://localhost:3000/payCash', {amount: amount})
  }

  public getUser(){
    console.log(this.currentUser);
    this.currentUser = localStorage.logged;
    return this.currentUser;
  }

  public setUser(user: any){
    console.log(this.currentUser);
    this.currentUser = user;
  }

  //increase amount
  public increaseAmount (increased: number): Observable<Object> {
    return this._httpClient.post('http://localhost:3000/increaseCash', {increased: increased})
  }
  //end of increase amount
}
