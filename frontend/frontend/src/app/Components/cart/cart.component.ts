import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../Models/Product';
import { Cart } from '../../Models/Cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../partials/header/header.component";
import { FooterComponent } from '../partials/footer/footer.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent,FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product: Product[] = [];
  cart: Cart[] = [];
  quantity: { [productId: number]: number } = {}; // Store quantity for each product
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.showProducts();
  }
  showProducts() {
    this.http.get("http://localhost:3000/product").subscribe(res => {
      this.product = res as Product[];
      this.product.forEach(p => {
        this.quantity[p.id] = 1; // Initialize quantity to 0 for each product
      });
    });
  }
  updateQuantity(productId: number) {
    if (this.quantity[productId] !== undefined) {
      this.quantity[productId] += 1; // Increment quantity by 1
    } else {
      this.quantity[productId] = 1; // Initialize quantity to 1 if not already set
    }
  }
  deleteProduct(productId: number) {
    delete this.quantity[productId];
  }
  decreaseQuantity(productId: number) {
    if (this.quantity[productId] !== undefined && this.quantity[productId] > 0) {
      this.quantity[productId] -= 1; // Decrease quantity by 1
    } else {
      delete this.quantity[productId]; // Remove the product from the quantity object if quantity is 0 or undefined
    }
  }
  removeProductFromCart(productId: number) {
    const updatedCart: Product[] = this.product.filter(p => p.id !== productId);
    this.product = updatedCart;
    delete this.quantity[productId];
  }
}