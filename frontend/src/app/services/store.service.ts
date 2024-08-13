import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../Models/Store';
import { Product } from '../Models/Product';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private baseUrl = 'http://localhost:8092/api/store';

  constructor(private http: HttpClient) { }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/getallstores`);
  }

  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${this.baseUrl}/addstore`, store);
  }

  deleteStore(gstId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletestore/${gstId}`);
  }
  

  updateStore(gstId: number, store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.baseUrl}/updatestore/${gstId}`, store);
  }

  addProduct(gstId: number, product: Product): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/addProduct/${gstId}`, product);
  }

  deleteProduct(gstId: number, pname: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/deleteproduct/${gstId}/${pname}`);
  }

  showProducts(gstId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/showproducts/${gstId}`);
  }

  updateProduct(gstId: number, pname: string, product: Product): Observable<Store> {
    return this.http.put<Store>(`${this.baseUrl}/updateproduct/${gstId}/${pname}`, product);
  }

  showBestDiscount(pname: string): Observable<Store> {
    return this.http.get<Store>(`${this.baseUrl}/showbestdiscount/${pname}`);
  }

  // addProductToCart(gstId: number, pname: string, qty: number): Observable<void> {
  //   return this.http.post<void>(`${this.baseUrl}/addproducttocart/${gstId}/${pname}/${qty}`, {});
  // }

  // deleteProductInCart(gstId: number, pname: string, qty: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/deleteproducttocart/${gstId}/${pname}/${qty}`);
  // }
}
