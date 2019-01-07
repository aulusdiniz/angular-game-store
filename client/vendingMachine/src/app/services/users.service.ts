import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public currentUser: any;

  constructor(private httpClient: HttpClient) {
    this.load();
  }

  public async load() {
    console.log(await this.getUser()," <~~~");
    return await this.getUser();
  }

  public async getUser(){
    // refresh the user
    return await this.requestUser().then((res: any) => {
      this.currentUser = res;
      console.log(this.currentUser,"<<...");
      return this.currentUser;
    });
  }

  public requestUser() {
    return new Promise(resolve => {
      this.httpClient.get(`http://localhost:3000/users/${localStorage.logged}`)
      .subscribe(res => {
        resolve(res);
      });
    });
  }

  public clear(){
    this.currentUser = undefined;
  }

  //increase amount
  public increaseAmount (increased: number): Observable<Object> {
    console.log("making post..")
    return this.httpClient.post('http://localhost:3000/increaseCash', { increased: increased })
  }
}
