import { Component, OnInit } from '@angular/core';
import { Store } from '../../Models/Store';
import { StoreService } from '../../services/store.service';
import { Product } from '../../Models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../partials/header/header.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [FormsModule, CommonModule,HeaderComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  selectedStore: Store = new Store();
  stores: Store[] = [];
  selectedStoreProducts: Product[] = [];
  bestDiscountStore: Store | null = null;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores() {
    this.storeService.getAllStores().subscribe(
      stores => this.stores = stores,
      error => console.error('Error loading stores:', error)
    );
  }

  addStore() {
    this.storeService.addStore(this.selectedStore).subscribe(
      store => {
        this.stores.push(store);
        this.selectedStore = new Store();
        alert('Store added successfully!');
      },
      error => {
        console.error('Error adding store:', error);
        alert('Failed to add store. Please try again.');
      }
    );
  }

  updateStore() {
    this.storeService.updateStore(this.selectedStore.gstId, this.selectedStore).subscribe(
      updatedStore => {
        const index = this.stores.findIndex(store => store.gstId === updatedStore.gstId);
        if (index !== -1) {
          this.stores[index] = updatedStore;
        }
        this.selectedStore = new Store();
        alert('Store updated successfully!');
      },
      error => {
        console.error('Error updating store:', error);
        alert('Failed to update store. Please try again.');
      }
    );
  }

  deleteStore(gstId: number) {
    if (confirm('Are you sure you want to delete this store?')) {
      this.storeService.deleteStore(gstId).subscribe(
        () => {
          this.stores = this.stores.filter(store => store.gstId !== gstId);
          this.selectedStoreProducts = [];
          alert('Store deleted successfully!');
        },
        error => {
          console.error('Error deleting store:', error);
          alert('Failed to delete store. Please try again.');
        }
      );
    }
  }

  

  showProducts(gstId: number) {
    this.selectedStore.gstId = gstId; 
    this.storeService.showProducts(gstId).subscribe(
      products => {
        this.selectedStoreProducts = products;
      },
      error => {
        console.error('Error showing products:', error);
        alert('Failed to load products. Please try again.');
      }
    );
  }
  

  addProductToStore(pname: string, price: string, unit: string, discount: string) {
    if (!this.selectedStore.gstId) {
      console.error('Store GST ID is not set.');
      alert('Store GST ID is not set.');
      return;
    }

    const product: Product = {
      pname: pname,
      price: +price,
      unit: +unit,
      discount: +discount,
      id: 0  
    };

    this.storeService.addProduct(this.selectedStore.gstId, product).subscribe(
      response => {
        console.log('Product added successfully');
        alert('Product added successfully!');
        this.showProducts(this.selectedStore.gstId);  
      },
      error => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      }
    );
  }

  updateProduct(pname: string, price: string, unit: string, discount: string) {
    if (!this.selectedStore.gstId) {
      console.error('Store GST ID is not set.');
      alert('Store GST ID is not set.');
      return;
    }

    const product: Product = {
      pname: pname,
      price: +price,
      unit: +unit,
      discount: +discount,
      id: 0  // Assuming ID is auto-generated by backend
    };

    this.storeService.updateProduct(this.selectedStore.gstId, pname, product).subscribe(
      () => {
        console.log('Product updated successfully');
        alert('Product updated successfully!');
        this.showProducts(this.selectedStore.gstId);  // Refresh the product list
      },
      error => {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
      }
    );
  }


  deleteProductFromStore(pname: string) {
    if (!this.selectedStore.gstId) {
      console.error('Store GST ID is not set.');
      alert('Store GST ID is not set.');
      return;
    }

    this.storeService.deleteProduct(this.selectedStore.gstId, pname).subscribe(
      () => {
        console.log('Product deleted successfully');
        alert('Product deleted successfully!');
      },
      error => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    );
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

}





