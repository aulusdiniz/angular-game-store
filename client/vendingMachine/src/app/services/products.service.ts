import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { increaseElementDepthCount } from '@angular/core/src/render3/state';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productList: Array<any>;
  public displayProductList: Array<any>;
  public shoppingCartList: Array<any> = [];
  public categoriesTitle: string;
  public allProductsList: Array<any>;
  public totalBill: number = 0;

  constructor(private usersService: UsersService, private httpClient: HttpClient, private router: Router) {
    this.getProducts()
      .subscribe(data => {
        this.productList = JSON.parse(JSON.stringify(data));
        this.filterBest("Our Best Sellers");
        this.allProductsList = this.productList;
      });
  }

  public getProducts() {
    return this.httpClient.get('http://localhost:3000/items');
  }

  //add to cart button
  public addToCart(productId) {
    if(!this.usersService.currentUser || this.usersService.currentUser == undefined ) {
      this.router.navigate(['/login']);
    }
    this.productList.forEach(product => {
      if (product.id === productId && product.quantity > 0) {
        product.quantity -= 1;
        this.shoppingCartList.push(product);
      } else if (product.id === productId && product.quantity < 1) {
        product.quantity = 'Out of stock';
      }
    });
  }

  public buyProduct() {
    this.totalBill = this.calculateTotal();
    if (this.usersService.userBalance >= this.totalBill) {
      this.purchase({
        products: this.shoppingCartList,
        user: { login: localStorage.logged } // change later to use from users.service
      })
      .subscribe((res: any) => {
        console.log(res);
        if(res.status == 'fail'){
          // TODO: create reverse purchase logic to fix product.quantity on page.
        }
      });
    }
  }

  public purchase(order) {
    return this.httpClient.post('http://localhost:3000/purchase', order);
  }

  public calculateTotal() {
    let totalBill = 0;
    this.shoppingCartList.forEach(product => {
      totalBill += product.price;
    });
    return totalBill;
  }

  public filterByCategory(categoryName) {
    this.displayProductList = this.productList.filter(product => {
      return product.category[0] === categoryName;
    });
    this.categoriesTitle = categoryName;
  }

  public filterBest(categoryName) {
    this.displayProductList = this.productList.filter(product => {
      return product.category[1] === categoryName;
    });
    this.categoriesTitle = categoryName;
  }
}
