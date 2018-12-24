import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public productList: Array<any>;
  // = [
  //   {name: "Lipstic", price: "€35", category: "lipstick", image: "/../../assets//pictures/lipsticks_chanel/lipstick1.png"},
  //   {name: "Lipstic", price: "€30", category: "lipstick", image: "/../../assets//pictures/lipsticks_chanel/lipstick2.png"},
  //   {name: "Lipstic", price: "€36", category: "lipstick", image: "/../../assets//pictures/lipsticks_chanel/lipstick3.png"},
  //   {name: "Foundation Matte", price: "€11.99", category: "foundation", image:"../../../assets//pictures/foundation_Maybyline/foundation1.png"},
  //   {name: "Foundation SuperStay", price: "€11.99", category: "foundation",  image:"../../../assets//pictures/foundation_Maybyline/foundation2.png"},
  //   {name: "Foundation Satin Liquid", price: "€11.99", category: "foundation", image:"../../../assets//pictures/foundation_Maybyline/foundation3.png"},
  //   {name: "Eyebrow Brow Zings", price: "€34.95", category: "eyebrow", image:"../../../assets//pictures/eyebrows_benefit/eyebrow1.png"},
  //   {name: "Eyebrow Powder", price: "€34.95", category: "eyebrow", image:"../../../assets//pictures/eyebrows_benefit/eyebrow2.png"},
  //   {name: "Eyebrow Pen", price: "€34.95", category: "eyebrow", image:"../../../assets//pictures/eyebrows_benefit/eyebrow3.png"},
  //   {name: "Mascara Bang", price: "€24.99", category: "mascara", image:"../../../assets//pictures/mascara_benefit/mascara1.png"},
  //   {name: "Mascara Roller", price: "€24.99", category: "mascara", image:"../../../assets//pictures/mascara_benefit/mascara2.png"},
  //   {name: "Mascara Lash", price: "€24.99", category: "mascara", image:"../../../assets//pictures/mascara_benefit/mascara3.png"},
  //   {name: "Eyeshadow", price: "€55", category: "eyeshadow", image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow1.png"},
  //   {name: "Eyeshadow", price: "€55", category: "eyeshadow", image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow2.png"},
  //   {name: "Eyeshadow", price: "€55", category: "eyeshadow", image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow3.png"},
  //   {name: "Eyeliner", price: "€19.99", category: "eyeliner", image:"../../../assets//pictures/eyeliner_lancome/eyeliner1.png"},
  //   {name: "Eyeliner", price: "€19.99", category: "eyeliner", image:"../../../assets//pictures/eyeliner_lancome/eyeliner2.png"},
  //   {name: "Eyeliner", price: "€19.99", category: "eyeliner", image:"../../../assets//pictures/eyeliner_lancome/eyeliner3.png"},
  // ]
  constructor(public productsService: ProductsService) {}
    

  ngOnInit() {
  }

}
