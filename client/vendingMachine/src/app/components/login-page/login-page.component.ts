import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../../providers/auth.provider'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  updateFormBuilder: any;
  fType: any;
  // router: Router;

  constructor(private authProvider: AuthProvider, private formBuilder: FormBuilder, private router: Router) {
    this.setupFormBuilder();
  }

  ngOnInit() {
    this.fType = 'signin';
  }

  save() {
    let payload = this.updateFormBuilder.value;
    let result = this.authProvider.register(payload).then((res) => {
      console.log("result: ", res);
    });
  }

  login(){
    let payload = this.updateFormBuilder.value;
    let result = this.authProvider.login(payload).then((res: any) => {
      console.log("result: ", res);
      if(res.status == 'authorized') {
        this.router.navigate(['/home', { id: 'heroId', foo: 'foo' }]);
        localStorage.setItem('logged', payload.login);
      }
    });
  }

  setupFormBuilder() {
    let controlConfig = {
      'login': ['', Validators.required],
      'password': ['', Validators.minLength(6)],
    };
    this.updateFormBuilder = this.formBuilder.group(controlConfig);
  }

  //the form is for sign up ou sign in?
  UIFormControl(type) {
    return (type=="signup")? this.fType = "signup" : this.fType = "signin"
  }

}
