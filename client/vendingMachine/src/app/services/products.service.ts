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
  public async addToCart(productId) {
    let user = localStorage.logged;
    // console.log(user);
    if(!user || user == undefined || user == "" ) {
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

  public async buyProduct(form) {
    this.totalBill = this.calculateTotal();
    let user = await this.usersService.getUser();
    // console.log("--}", form);
    if (user.cash < this.totalBill) return;
    this.purchase({
      products: this.shoppingCartList, user: localStorage.logged, form: form // change later to use from users.service
    });
  }

  public purchase(order) {
    // console.log(order);
    return new Promise(resolve => {
      this.httpClient.post('http://localhost:3000/purchase', order)
      .subscribe((res: any) => {
        // console.log("buying ", res);
        if(res.status == 'success'){
          // TODO: create reverse purchase logic to fix product.quantity on page.
          this.shoppingCartList = [];
        }
        resolve(res);
      });
    });
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
