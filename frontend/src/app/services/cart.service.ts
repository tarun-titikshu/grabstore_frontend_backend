import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8091/api/cart';

  constructor(private http: HttpClient) { }

  // Method to add a product to the cart
    // Fetch cart details
    getCartDetails(cartId: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/details/${cartId}`);
    }
  
    // Fetch product details
    getProductDetails(productId: number, gstId: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/product/${productId}/${gstId}`);
    }
  
    // Add product to the cart
    addProductToCart(cartId: number, productId: number, productName: string, quantity: number, gstId: number): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/add/${cartId}/${productId}/${productName}/${quantity}/${gstId}`, {});
    }
  
    // Delete product from the cart
    deleteProductFromCart(cartId: number, productName: string, quantity: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/delete/${cartId}/${productName}/${quantity}`);
    }
}
