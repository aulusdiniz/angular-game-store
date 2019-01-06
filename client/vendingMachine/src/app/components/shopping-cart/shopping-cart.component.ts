import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public  shoppingCartList: Array<any>;
  public totalPrice;

  constructor(public productsService: ProductsService) {
    this.totalPrice = productsService.calculateTotal();
  }

  ngOnInit() {

  }
}
