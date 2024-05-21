import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResults } from '../models/interface/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<ProductResults>{
    return this.http.get<ProductResults>('http://localhost:3000/api/product');
  }
  
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/api/product',product);
  }

  updateProduct(productId: string, updates: Partial<Product>): Observable<Product> {
    const url = `http://localhost:3000/api/product/${productId}`;
    return this.http.patch<Product>(url, updates);
  }

  deleteProduct(productId: string): Observable<void> {
    const url = `http://localhost:3000/api/product/${productId}`;
    return this.http.delete<void>(url);
  }
}
