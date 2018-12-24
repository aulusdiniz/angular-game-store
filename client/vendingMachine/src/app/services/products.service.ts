import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  public productList: Array<any> =[
    {name: "Rouge Allure", price: 35, quantity: 10, id: 1, category: ["Lipstick", "Our Best Sellers"], image: "/../../assets//pictures/lipsticks_chanel/lipstick1.png"},
    {name: "Rouge COCO Stylo", price: 30, quantity: 10, id: 2, category: ["Lipstick"], image: "/../../assets//pictures/lipsticks_chanel/lipstick2.png"},
    {name: "Rouge Allure Ink", price: 36, quantity: 10, id: 3, category: ["Lipstick"], image: "/../../assets//pictures/lipsticks_chanel/lipstick3.png"},
    {name: "Foundation Matte", price: 11.99, id: 4, quantity: 10, category: ["Foundation","Our Best Sellers"], image:"../../../assets//pictures/foundation_Maybyline/foundation1.png"},
    {name: "Foundation SuperStay", price: 11.99, quantity: 10, id: 5, category: ["Foundation"],  image:"../../../assets//pictures/foundation_Maybyline/foundation2.png"},
    {name: "Foundation Satin Liquid", price: 11.99, quantity: 10, id: 6, category: ["Foundation"], image:"../../../assets//pictures/foundation_Maybyline/foundation3.png"},
    {name: "Eyebrow Brow Zings", price: 34.95, quantity: 10, id: 7, category: ["Eyebrow","Our Best Sellers"], image:"../../../assets//pictures/eyebrows_benefit/eyebrow1.png"},
    {name: "Eyebrow Powder", price: 34.95, quantity: 10, id: 8, category: ["Eyebrow"], image:"../../../assets//pictures/eyebrows_benefit/eyebrow2.png"},
    {name: "Eyebrow Pen", price: 34.95, quantity: 10, id: 9, category: ["Eyebrow"], image:"../../../assets//pictures/eyebrows_benefit/eyebrow3.png"},
    {name: "Mascara Bang", price: 24.99, quantity: 10, id: 10, category: ["Mascara","Our Best Sellers"], image:"../../../assets//pictures/mascara_benefit/mascara1.png"},
    {name: "Mascara Roller", price: 24.99, quantity: 10, id: 11, category: ["Mascara"], image:"../../../assets//pictures/mascara_benefit/mascara2.png"},
    {name: "Mascara Lash", price: 24.99, quantity: 10, id: 12, category: ["Mascara"], image:"../../../assets//pictures/mascara_benefit/mascara3.png"},
    {name: "Warm - Eyeshadow palette", price: 55, quantity: 10, id: 13, category: ["Eyeshadow","Our Best Sellers"], image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow1.png"},
    {name: "Spring - Eyeshadow palette", price: 55, quantity: 10, id: 14, category: ["Eyeshadow"], image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow2.png"},
    {name: "Brown - Eyeshadow palette", price: 55, quantity: 10, id: 15, category: ["Eyeshadow"], image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow3.png"},
    {name: "Liner Plume", price: 19.99, quantity: 10, id: 16, category: ["Eyeliner","Our Best Sellers"], image:"../../../assets//pictures/eyeliner_lancome/eyeliner1.png"},
    {name: "Eyeliner", price: 19.99, quantity: 10, id: 17, category: ["Eyeliner"], image:"../../../assets//pictures/eyeliner_lancome/eyeliner2.png"},
    {name: "Eye Crayon", price: 19.99, quantity: 10, id: 18, category: ["Eyeliner"], image:"../../../assets//pictures/eyeliner_lancome/eyeliner3.png"},
  ]

  public displayProductList: Array<any>;
  public shoppingCartList: Array<any> = [];
  public categoriesTitle: string;
  public allProductsList: Array<any>;

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

  
  //add to cart button
  public clickProduct(productId) {
    this.productList.forEach(product => {
      if (product.id === productId && product.quantity > 0) {
        this.shoppingCartList.push(product);
        product.quantity -= 1; 
        
      }
    });
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

public sumProducts: number = 0;
 public buyProduct() {
   this.shoppingCartList.forEach(product => {
     this.sumProducts += product.price;
   });
   this.sumProducts.toFixed(2);
   if (this.usersService.currentUser.balance >= this.sumProducts) { 
      this.usersService.currentUser.balance -= this.sumProducts;
   };
 }

  public getTotal() {
    let total = 0;
    this.shoppingCartList.forEach(product => {
      total += product.price;
    });
    return total;
  }


  constructor(public usersService: UsersService) { 
    this.displayProductList = this.productList;
    this.allProductsList = this.productList;
  }
}
