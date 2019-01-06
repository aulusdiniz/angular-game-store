import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userBalance: any;
  public currentUser: any;

  constructor(private httpClient: HttpClient) {
    this.load();
  }

  public load() {
    this.currentUser = localStorage.logged;
    this.getUserBalance().subscribe((result: any) => {
      this.userBalance = result.cash;
      console.log("userBalance", this.userBalance);
    });
  }

  public getUserBalance(): Observable<Object> {
    return this.httpClient.get('http://localhost:3000/cash')
  }

  public getUser(){
    console.log(this.currentUser);
    this.currentUser = localStorage.logged;
    return this.currentUser;
  }

  public setUser(user: any){
    this.currentUser = user;
    console.log(this.currentUser);
  }

  //increase amount
  public increaseAmount (increased: number): Observable<Object> {
    console.log("making post..")
    return this.httpClient.post('http://localhost:3000/increaseCash', { increased: increased })
  }
}
