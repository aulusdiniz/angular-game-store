import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public userLogged: any;
  public userDetail: Boolean;
  private userCash: number;

  constructor(private productsService: ProductsService, private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.userLogged = localStorage.logged || "Log in";
    this.usersService.getUserBalance()
      .subscribe(
        (result: any) => {
          console.log(result);
          this.userCash = result.cash;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  showDetails() {
    this.userDetail = this.userDetail? false : true
  }

  clearLogin() {
    localStorage.logged = "";
    this.userLogged = "Log in";
    this.userDetail = false;
    this.router.navigate(['/']);
  }


}
