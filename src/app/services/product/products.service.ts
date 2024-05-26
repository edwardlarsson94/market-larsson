import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResults } from '../../models/interface/product/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<ProductResults> {
    return this.http.get<ProductResults>(`${this.apiUrl}/product`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/product`, product);
  }

  updateProduct(productId: string, updates: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/product/${productId}`, updates);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/${productId}`);
  }
}