import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../Models/Store';
import { Product } from '../../Models/Product';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from '../store/store.component';
import { CartComponent } from '../cart/cart.component';
import { HeaderComponent } from '../partials/header/header.component';
import { FooterComponent } from '../partials/footer/footer.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, StoreComponent, CartComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
getRandomImage() : string {
  const randomIndex = Math.floor(Math.random() *this. storeImages.length);
  console.log(this.storeImages[randomIndex]);
  return this.storeImages[randomIndex];
}
 storeImages  = [
  "https://i.imgur.com/MN5I00o.jpeg",
  "https://i.imgur.com/hWMY4AQ.jpeg",
  "https://i.imgur.com/i2D0o8E_d.webp?maxwidth=760&fidelity=grand",
  "https://i.imgur.com/JJ5EcfQ_d.webp?maxwidth=760&fidelity=grand",
  "https://i.imgur.com/ITpqU1X_d.webp?maxwidth=760&fidelity=grand",
  "https://i.imgur.com/8WcLo2W_d.webp?maxwidth=760&fidelity=grand",
  "https://i.imgur.com/y3f2mKN_d.webp?maxwidth=1520&fidelity=grand"
];
  stores: Store[] = [];
  filteredStores: Store[] = [];
  selectedStoreProducts: Product[] = [];
  searchTerm: string = '';
  selectedStore: Store = new Store();
  isVisible: boolean = false;
  bestDiscountStore: Store | null = null;
  constructor(private http: HttpClient,private storeService: StoreService, private router: Router) { }
  ngOnInit(): void {
    this.loadStores();
  }
  loadStores() {
    this.storeService.getAllStores().subscribe(
      stores => {
        this.stores = stores;
        this.filteredStores = stores;
      },
      error => console.error('Error loading stores:', error)
    );
  }
  searchProduct() {
    if (this.searchTerm) {
      this.filteredStores = this.stores.filter(store =>
        store.products.some(product =>
          product.pname.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.filteredStores = this.stores;
    }
  }
  showProducts(gstId: number) {
    this.selectedStore.gstId = gstId;
    this.storeService.showProducts(gstId).subscribe(
      products => this.selectedStoreProducts = products,
      error => {
        console.error('Error showing products:', error);
        alert('Failed to load products. Please try again.');
      }
    );
  }
  selectProduct(product: Product) {
    console.log('Adding product to cart and navigating:', product);
    this.http.post("http://localhost:3000/product", product).subscribe((res)=> {
      console.log(res);
      this.router.navigate(['/cart'], );
    })
    // Add product to cart
          // Check if the HTTP status is 200
          // if (response.status === 200) {
          //   console.log('Product added to cart successfully:', response);
          //   // Navigate to cart with cartId
          //   this.router.navigate(['/cart',this.cartId], );
          // } else {
          //   console.error('Unexpected status code:', response.status);
          //   alert('Failed to add product to cart. Please try again.');
          // }
  }
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  showBestDiscount(pname: string) {
    this.storeService.showBestDiscount(pname).subscribe(
      store => {
        this.bestDiscountStore = store;
        console.log('Best discount store:', store);
      },
      error => {
        console.error('Error showing best discount store:', error);
        if (error.status === 404) {
          alert('No store found with the best discount for the given product.');
        } else {
          alert('Failed to load the best discount store. Please try again.');
        }
      }
    );
  }
  // Renamed method to avoid duplication and confusion
  addProductToCart(product: Product) {
    console.log('Navigating to cart with product:', product);
    this.router.navigate(['/cart'], { state: { product } });
  }
}