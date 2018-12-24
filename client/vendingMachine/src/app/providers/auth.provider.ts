import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthProvider {

  constructor(private http: HttpClient) {

  }

  login() {
    if (false) {
      return Promise.resolve(null);
    }
    return new Promise(resolve => {
      this.http.get('http://0.0.0.0:3000/login', {
        headers: new HttpHeaders({
          // 'Authorization': `Bearer ${ this.user.stsTokenManager.accessToken }`
        })
      })
      .subscribe(response => {
        console.log("server response: ", response);
        resolve(response);
      });
    });
  }
}
