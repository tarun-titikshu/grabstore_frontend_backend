import { Component, HostListener, OnInit } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';
import { StoreWithDistance } from '../../Models/StoreWithDistance';
//import { StoreWithDistance } from '../../Models/StoreWithDistance';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, StoreComponent, CartComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  eRef: any;
  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.storeImages.length);
    return this.storeImages[randomIndex];
  }


  storeImages = [
    "https://i.imgur.com/MN5I00o.jpeg",
    "https://i.imgur.com/hWMY4AQ.jpeg",
    "https://i.imgur.com/i2D0o8E_d.webp?maxwidth=760&fidelity=grand",
    "https://i.imgur.com/JJ5EcfQ_d.webp?maxwidth=760&fidelity=grand",
    "https://i.imgur.com/ITpqU1X_d.webp?maxwidth=760&fidelity=grand",
    "https://i.imgur.com/8WcLo2W_d.webp?maxwidth=760&fidelity=grand",
    "https://i.imgur.com/y3f2mKN_d.webp?maxwidth=1520&fidelity=grand"
  ];

  stores: Store[] = [];
  // stores: Store[] = [];
  storeWithDistances: StoreWithDistance[] = [];
  filteredStores: Store[] = [];
  selectedStoreProducts: Product[] = [];
  searchTerm: string = '';
  selectedStore: Store = new Store();
  // selectedStore: Store | null = null;
  isVisible: boolean = false;
  // bestDiscountStore: Store | null = null;
  bestDiscountStore: Store[] = [];
  searchSuggestions: string[] = [];
  suggestionVisible: boolean = false;

  constructor(private http: HttpClient, private storeService: StoreService, private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getAllStores().subscribe(stores => {
      this.stores = stores;
      this.filteredStores = stores;
      this.getDistancesForStores();
    });
  }
  // loadStores() {
  //   this.storeService.getAllStores().subscribe(
  //     stores => {
  //       this.stores = stores;
  //       this.filteredStores = stores;
  //     },
  //     error => console.error('Error loading stores:', error)
  //   );
  // }

  // loadStores() {
  //   this.storeService.getAllStores().subscribe(
  //     stores => {
  //       this.stores = stores;
  //       this.filteredStores = stores;
        
  //       // Fetch the distance for each store
  //       this.stores.forEach(store => {
  //         this.storeService.getDistanceByStoreName(store.storename, store.gstId).subscribe(
  //           distance => {
  //             store.distance = distance; // Assuming distances is a single number
  //           },
  //           error => console.error('Error fetching distance:', error)
  //         );
  //       });
  //     },
  //     error => console.error('Error loading stores:', error)
  //   );
  // }
  

  getDistancesForStores(): void {
    this.stores.forEach(store => {
      this.storeService.getDistanceByStoreName(store.storename, store.gstId)
        .subscribe(distance => {
          const storeWithDistance = new StoreWithDistance();
          storeWithDistance.storeName = store.storename;
          storeWithDistance.gstId = store.gstId;
          storeWithDistance.distance = distance;
          this.storeWithDistances.push(storeWithDistance);
        });
    });
  }

  // Method to get distance by store name and GST ID
  // getDistanceByStoreName(storeName: string, gstId: number): void {
  //   this.storeService.getDistanceByStoreName(storeName, gstId)
  //     .subscribe(distance => {
  //       // Handle the distance here, e.g., assign it to a specific store in your component
  //       console.log(`Distance for ${storeName} with GST ID ${gstId}: ${distance} km`);
  //     });
  // }

  getDistanceByStoreName(storeName: string, gstId: number): number | string {
    const store = this.bestDiscountStore.find(s => s.storename === storeName && s.gstId === gstId);
    if (store && store.distance !== undefined) {
      return store.distance; // Return the already fetched distance
    }

    this.storeService.getDistanceByStoreName(storeName, gstId).subscribe(distance => {
      if (store) {
        store.distance = distance; // Assign the fetched distance
      }
      console.log(`Distance for ${storeName} with GST ID ${gstId}: ${distance} km`);
    });

    return 'Calculating...'; // Temporary value while the distance is being fetched
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

  getSuggestions() {
    if (this.searchTerm.length > 0) {
      this.storeService.getProductSuggestions(this.searchTerm).subscribe(
        suggestions => {
          this.searchSuggestions = suggestions;
          this.suggestionVisible = true;
        },
        error => {
          console.error('Error fetching product suggestions:', error);
        }
      );
    } else {
      this.searchSuggestions = [];
      this.suggestionVisible = false;
    }
  }
  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
   
    this.suggestionVisible = false; // Hide suggestions after a selection

  }
  // @HostListener('document:click', ['$event'])
  // clickOutside(event: Event) {
  //   if (!this.eRef.nativeElement.contains(event.target)) {
  //     this.suggestionVisible = false;
  //   }
  // }
  showProducts(gstId: number) {
    this.selectedStore.gstId = gstId;
    this.storeService.showProducts(gstId).subscribe(
      products => this.selectedStoreProducts = products,
      error => {
        console.error('Error showing products:', error);
        this.openDialog('Failed to load products. Please try again.');
      }
    );
  }

  selectProduct(product: Product) {
    console.log('Adding product to cart and navigating:', product);
    this.http.post("http://localhost:3000/product", product).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/cart']);
    });
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  showBestDiscount(pname: string) {
    if (pname && pname.trim().length > 0) {
      this.storeService.showBestDiscount(pname).subscribe(
        store => {
          this.bestDiscountStore = store;
          console.log('Best discount store:', store);
        },
        error => {
          console.error('Error showing best discount store:', error);
          if (error.status === 404) {
            this.openDialog('No store found with the best discount for the given product.');
          } else {
            this.openDialog('Failed to load the best discount store. Please try again.');
          }
        }
      );
    } else {
      this.openDialog('Please enter a valid product name.');
    }
  }

  openDialog(message: string) {
    this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Notification',
        message: message
      }
    });
  }


  addProductToCart(product: Product) {
    console.log('Navigating to cart with product:', product);
    // this.router.navigate(['/cart'], { queryParams: { productId: product.id } });

    this.router.navigate(['/cart'], { state: { product } });
  }

  showDetailedStore: boolean = false; 
  // showProducts(gstId: number) {
  //   this.storeService.showProducts(gstId).subscribe((products: any[]) => {
  //     this.selectedStoreProducts = products;
  //     this.selectedStore = this.filteredStores.find(store => store.gstId === gstId) || null;
  //   });
  // }

  showMore(store: Store) {
    this.storeService.showProducts(store.gstId).subscribe((products: any[]) => {
      this.selectedStoreProducts = products;
      this.selectedStore = store;
      this.showDetailedStore = true; // Show detailed store card
      // this.router.navigate(['/store-list']);
    });
  }
}
