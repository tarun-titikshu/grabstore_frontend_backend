import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '../Models/Store';
import { Product } from '../Models/Product';
// import { StoreWithDistance } from '../Models/StoreWithDistance';

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

  // addStore(store: Store): Observable<string> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post<string>(`${this.baseUrl}/addstore`, store, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(errorMessage);
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

  //showBestDiscount(pname: string): Observable<Store> {
  //   return this.http.get<Store>(`${this.baseUrl}/showbestdiscount/${pname}`);
  // }

  showBestDiscount(pname: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/best-discount-distance/${pname}`);
  }
  

  // Method to get product name suggestions
  getProductSuggestions(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/suggestions?query=${query}`);
  }

  // Uncomment and modify these methods if needed for your cart functionality
  // addProductToCart(gstId: number, pname: string, qty: number): Observable<void> {
  //   return this.http.post<void>(`${this.baseUrl}/addproducttocart/${gstId}/${pname}/${qty}`, {});
  // }

  // deleteProductInCart(gstId: number, pname: string, qty: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/deleteproducttocart/${gstId}/${pname}/${qty}`);
  // }

  
  getDistanceByStoreName(storeName: string, gstId: number): Observable<number> {
    const url = `${this.baseUrl}/distance/${storeName}/${gstId}`;
    return this.http.get<number>(url);
  }
}
