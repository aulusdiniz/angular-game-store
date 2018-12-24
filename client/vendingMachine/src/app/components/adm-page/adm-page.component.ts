import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../../providers/auth.provider'

@Component({
  selector: 'app-adm-page',
  templateUrl: './adm-page.component.html',
  styleUrls: ['./adm-page.component.css']
})
export class AdmPageComponent implements OnInit {

  constructor(private authProvider: AuthProvider) { }

  ngOnInit() {
  }

  submit() {
    let result = this.authProvider.login().then((res) => {
      console.log("trying to submit data: ", result);
    });
  }

}
