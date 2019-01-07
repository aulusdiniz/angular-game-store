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

  private userDetail: Boolean;
  private userLogged: any;
  private userCash: number;
  private user: any;

  constructor(private productsService: ProductsService, private usersService: UsersService,
    private router: Router) {
      this.refresh();
    }

  ngOnInit() {
    this.refresh();
    console.log("ngOnInit");
  }

  ngAfterViewInit() {
    this.refresh();
    console.log("ngAfterViewInit");
  }

  async refresh() {
    this.usersService.load();
    this.user = await this.usersService.getUser();
    console.log(this.user,"~~~menu");
    this.userLogged = this.user.login || "Log in";
    this.userCash = this.user.cash || 0;
  }

  showDetails() {
    this.userDetail = this.userDetail? false : true
  }

  clearLogin() {
    localStorage.logged = "";
    this.userLogged = "Log in";
    this.userDetail = false;
    this.user = undefined;
    this.usersService.clear();
    this.router.navigate(['/home']);
  }
}
