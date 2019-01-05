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
  }

  public increaseBalance() {
    this.usersService.increaseAmount(this.deposit)
    .subscribe(
      (res) => {console.log(res)},
      (error) => {console.log(error)}
    )
    this.deposit = 0;
    window.location.reload();
  }
}
