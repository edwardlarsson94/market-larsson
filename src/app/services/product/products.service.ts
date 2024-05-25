import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResults } from '../../models/interface/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<ProductResults>{
    return this.http.get<ProductResults>('https://market-larsson-api.azurewebsites.net/product');
  }
  
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('https://market-larsson-api.azurewebsites.net/product',product);
  }

  updateProduct(productId: string, updates: Partial<Product>): Observable<Product> {
    const url = `https://market-larsson-api.azurewebsites.net/product/${productId}`;
    return this.http.patch<Product>(url, updates);
  }

  deleteProduct(productId: string): Observable<void> {
    const url = `https://market-larsson-api.azurewebsites.net/product/${productId}`;
    return this.http.delete<void>(url);
  }
}
