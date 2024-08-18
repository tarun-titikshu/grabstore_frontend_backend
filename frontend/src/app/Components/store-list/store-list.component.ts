import { Component } from '@angular/core';
import { Store } from '../../Models/Store';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../Models/Product';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CurrencyPipe,RouterModule,CommonModule,FormsModule],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.css'
})
export class StoreListComponent {

  selectedStore: Store = new Store();
  selectedStoreProducts: Product[] = [];
  showDetailedStore: boolean = false; 

  constructor(private http: HttpClient, private router: Router) { }

  selectProduct(product: Product) {
    console.log('Adding product to cart and navigating:', product);
    this.http.post("http://localhost:3000/product", product).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/cart']);
    });
  }

}
