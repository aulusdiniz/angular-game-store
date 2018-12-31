import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged: any;
  userDetail: Boolean;

  constructor(public productsService: ProductsService, public usersService: UsersService) { }

  ngOnInit() {
    this.userLogged = localStorage.logged || "Log in";
  }

  showDetails() {
    this.userDetail = this.userDetail? false : true
  }

  clearLogin() {
    localStorage.logged = "";
    this.userLogged = "Log in";
    this.userDetail = false;
  }
}
