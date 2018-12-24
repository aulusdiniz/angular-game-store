import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmPageComponent } from './components/adm-page/adm-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    AdmPageComponent,
    HomePageComponent,
    HomePageComponent,
    MenuComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
