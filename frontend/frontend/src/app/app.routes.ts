import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { StoreComponent } from './Components/store/store.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'aboutus',component:AboutusComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},  // Default route
  { path: 'home', component: HomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '/home' }  // Fallback route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
