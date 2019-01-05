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

  constructor(private usersService: UsersService, private httpClient: HttpClient, private router: Router) {
    this.getProducts()
      .subscribe(data => {
        this.productList = JSON.parse(JSON.stringify(data));
        this.filterBest("Our Best Sellers");
        this.allProductsList = this.productList;
      });
  }

  private getProducts() {
    return this.httpClient.get('http://localhost:3000/items');
  }

  //add to cart button
  public addToCart(productId) {
  console.log("currentUser", this.usersService.currentUser);
    if(!this.usersService.currentUser || this.usersService.currentUser == undefined ) {
      this.router.navigate(['/login']);
    }
    this.productList.forEach(product => {
      if (product.id === productId && product.quantity > 1) {
        product.quantity -= 1;
        this.shoppingCartList.push(product);
      } else if (product.id === productId && product.quantity <= 1) {
        product.quantity = 'Out of stock';
      }
    });
  }

  private decreaseQuantity(item) {
    return this.httpClient.post('http://localhost:3000/items', item);
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

  // //Puchase
  // public buyProduct(productId) {
  //   this.productList.forEach(product => {
  //     if (product.id === productId && product.quantity > 0) {
  //       if (this.usersService.currentUser.balance >= product.price) {
  //         product.quantity -= 1;
  //         this.usersService.currentUser.balance -= product.price;
  //       }

  //     }
  //   });
  // }
  public getSumProducts() {
    let sumProducts = 0;
    this.shoppingCartList.forEach(product => {
      sumProducts += product.price;
    });
    return sumProducts;
  }

  public sumProducts: number = 0;

  public buyProduct() {
    this.sumProducts = this.getSumProducts();
    if (this.usersService.userBalance >= this.sumProducts) {
      this.shoppingCartList.forEach(product => {
        this.decreaseQuantity(product)
          .subscribe(res => console.log(res));
      });
      this.sumProducts.toFixed(2);

      this.usersService.payAmount(this.sumProducts)
        .subscribe(
          (result) => {console.log(result)},
          (error) => {console.log(error)}
        )
    }

    //  if (this.usersService.getUser().balance >= this.sumProducts) {
    //     this.usersService.currentUser.balance -= this.sumProducts;
    //  };
  }

  public getTotal() {
    let total = 0;
    this.shoppingCartList.forEach(product => {
      total += product.price;
    });
    return total;
  }

}
