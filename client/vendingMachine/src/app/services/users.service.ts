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

  public async load() {
    return await this.getUser();
  }

  public async getUser(){
    // refresh the user
    return await this.requestUser().then((res: any) => {
      this.currentUser = res;
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

  //increase amount
  public increaseAmount (increased: number): Observable<Object> {
    console.log("making post..")
    return this.httpClient.post('http://localhost:3000/increaseCash', { increased: increased })
  }
}
