import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { Router} from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild( MenuComponent ) menu: MenuComponent ;

  public  shoppingCartList: Array<any>;
  public totalPrice;
  private updateFormBuilder: any;
  private fType: any;

  constructor(public productsService: ProductsService, private router: Router,
    public usersService: UsersService, private formBuilder: FormBuilder) {
    this.totalPrice = productsService.calculateTotal();
    this.setupFormBuilder();
  }

  ngOnInit() {
    this.fType = 'signin';
  }

  async buy() {
    this.setupFormBuilder();
    console.log(this.updateFormBuilder.value);
    await this.productsService.buyProduct(this.updateFormBuilder.value);
    await this.usersService.getUser();
    this.totalPrice = 0;
    this.shoppingCartList = [];
    this.menu.refresh();
    this.router.navigate(['/']);
  }

  setupFormBuilder() {
    let controlConfig = {
      'cco': [''],
      'ccn': [''],
      'cvc': [''],
      'date': ['']
      // 'cco': ['', Validators.required],
      // 'ccn': ['', Validators.minLength(6)],
      // 'cvc': ['', Validators.minLength(6)],
      // 'date': ['', Validators.minLength(6)]
    };
    this.updateFormBuilder = this.formBuilder.group(controlConfig);
    // console.log(this.updateFormBuilder, "<<<<<======");
  }

  //the form is for sign up ou sign in?
  UIFormControl(type) {
    return (type=="signup")? this.fType = "signup" : this.fType = "signin"
  }
}
