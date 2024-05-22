import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Product } from '../../../models/interface/product/product';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
    FontAwesomeModule,
    JsonPipe
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  size: NzButtonSize = 'large';
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  productsInCart: Product[] = [];

  @Input() productsInfo!: Product;

  addToCart(product: Product): void {
    const existingProductIndex = this.productsInCart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      this.productsInCart[existingProductIndex].quantity++;
      this.productsInfo = this.productsInCart[0];
    } else {
      product = {...product,quantity:1}
      this.productsInCart = [product];
      this.productsInfo = this.productsInCart[0];
    }
  }

  removeFromCart(productId: string): void {
    const existingProductIndex = this.productsInCart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      this.productsInfo = {...this.productsInfo,quantity:0}
      this.productsInCart.splice(existingProductIndex, 1);
    }
  }

  increaseQuantity(productId: string): void {
    const existingProduct = this.productsInCart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    }
  }

  decreaseQuantity(productId: string): void {
    const existingProduct = this.productsInCart.find(item => item.id === productId);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        this.removeFromCart(productId);
      }
    }
  }

  isProductInCart(productId: string): boolean {
    return this.productsInCart.some(item => item.id === productId);
  }

  getProductQuantity(productId: string): number {
    const product = this.productsInCart.find(item => item.id === productId);
    return product ? product.quantity : 0;
  }
}
