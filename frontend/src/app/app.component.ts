import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { StoreComponent } from "./Components/store/store.component";
import { CartComponent } from './Components/cart/cart.component';
import { HeaderComponent } from './Components/partials/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StoreGrab';
}
