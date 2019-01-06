import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {

  public deposit: number;
  public user: any;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    // this.user = localStorage.logged;
    this.deposit = 0;
    this.user = this.usersService.getUser();
    this.usersService.load();
  }

  increaseBalance() {
    console.log(this.deposit);
    this.usersService.increaseAmount(this.deposit);
    this.deposit = 0;
    // window.location.reload();
    this.usersService.load();
    console.log(this.usersService.userBalance);
  }
}
