import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmPageComponent } from './components/adm-page/adm-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: 'admin', component: AdmPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'shoppingcart', component: ShoppingCartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
