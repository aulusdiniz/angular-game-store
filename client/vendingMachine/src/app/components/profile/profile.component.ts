import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {

  private deposit: number;
  private user: any;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.init();
  }

  async init(){
    // this.user = localStorage.logged;
    this.deposit = 0;
    this.usersService.load();
    this.user = await this.usersService.getUser();
    console.log(this.user, "<<")
  }

  increaseBalance() {
    console.log(this.deposit);
    this.usersService.load();
    this.deposit = 0;
    this.usersService.increaseAmount(this.deposit);
    // window.location.reload();
  }
}
