import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { Router} from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild( MenuComponent ) menu: MenuComponent ;

  public  shoppingCartList: Array<any>;
  public totalPrice;

  constructor(public productsService: ProductsService, private router: Router,
    public usersService: UsersService) {
    this.totalPrice = productsService.calculateTotal();
  }

  ngOnInit() {

  }

  async buy() {
    await this.productsService.buyProduct();
    await this.usersService.getUser();
    this.totalPrice = 0;
    this.shoppingCartList = [];
    this.menu.refresh();
    this.router.navigate(['/']);
  }
}
