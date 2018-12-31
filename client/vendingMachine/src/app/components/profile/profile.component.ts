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
  constructor(public _usersService: UsersService) { }

  ngOnInit() {

  }

  public increaseBalance() {
    this._usersService.increaseAmount(this.deposit)
    .subscribe(
      (res) => {console.log(res)},
      (error) => {console.log(error)}
    )
    this.deposit = 0;
    window.location.reload();
  }
}
