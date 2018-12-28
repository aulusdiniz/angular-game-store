import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthProvider {

  constructor(private http: HttpClient) {
  }

  register(payload) {
    return new Promise(resolve => {
      this.http.post('http://0.0.0.0:3000/register', payload, {
        headers: new HttpHeaders({
          // 'Authorization': `Bearer ${ this.user.stsTokenManager.accessToken }`
        })
      })
      .subscribe(response => {
        resolve(response);
      });
    });
  }

  login(payload) {
    return new Promise(resolve => {
      this.http.post('http://0.0.0.0:3000/login', payload,{
        headers: new HttpHeaders({
          // 'Authorization': `Bearer ${ this.user.stsTokenManager.accessToken }`
        })
      })
      .subscribe(response => {
        console.log(response);
        resolve(response);
      });
    });
  }

}
