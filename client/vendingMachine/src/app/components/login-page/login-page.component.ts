import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../../providers/auth.provider'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  updateFormBuilder: any;
  fType: any;
  registerResponse: any;

  constructor(private authProvider: AuthProvider, private formBuilder: FormBuilder,
     private router: Router, private route: ActivatedRoute, private usersService: UsersService) {
    this.setupFormBuilder();
  }

  ngOnInit() {
    this.fType = 'signin';
  }

  save() {
    let payload = this.updateFormBuilder.value;
    let result = this.authProvider.register(payload).then((res: any) => {
      if(res){
        this.registerResponse = res.status;
      }
    });
  }

  login(){
    let payload = this.updateFormBuilder.value;
    let result = this.authProvider.login(payload).then((res: any) => {
      if(res) {
        if(res.status == 'authorized') {
          localStorage.setItem('logged', payload.login);
          // this.usersService.getUser();
          this.router.navigate(['/']);
        }
        this.registerResponse = res.status;
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
    this.registerResponse = false;
    return (type=="signup")? this.fType = "signup" : this.fType = "signin"
  }
}
