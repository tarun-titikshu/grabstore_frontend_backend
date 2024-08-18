import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { StoreComponent } from './Components/store/store.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StoreManagerGuard } from './guards/store-manager-guard.guard';
import { CustomerGuard } from './guards/customer-guard.guard';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'aboutus',component:AboutusComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},  // Default route
  { path: 'home', component: HomeComponent },
  // { path: 'store', component: StoreComponent },
  // { path: 'cart', component: CartComponent },

  { path: 'store', component: StoreComponent, canActivate: [StoreManagerGuard] },
  { path: 'cart', component: CartComponent, canActivate: [CustomerGuard] },
  { path: '**', redirectTo: '/home' }  // Fallback route
];


@NgModule({
  
  imports: [RouterModule.forRoot(routes), MatDialogModule, MatButtonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
