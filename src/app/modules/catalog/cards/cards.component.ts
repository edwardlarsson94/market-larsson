import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Product } from '../../../models/interface/product/product';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../../state/app.actions';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
    FontAwesomeModule,
    AsyncPipe,
    JsonPipe,
    NgIf
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  size: NzButtonSize = 'large';
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  productsInCart$: Observable<Product[]>;

  @Input() productsInfo!: Product;

  constructor(private store: Store<AppState>) {
    this.productsInCart$ = this.store.select('productsInCart');
  }

  addToCart(product: Product): void {
    this.store.dispatch(addToCart({ product }));
  }

  removeFromCart(productId: string): void {
    this.store.dispatch(removeFromCart({ productId }));
  }

  increaseQuantity(productId: string): void {
    this.store.dispatch(increaseQuantity({ productId }));
  }

  decreaseQuantity(productId: string): void {
    this.store.dispatch(decreaseQuantity({ productId }));
  }

  isProductInCart(productId: string): boolean {
    let inCart = false;
    this.productsInCart$.subscribe(products => {
      inCart = products.some(item => item.id === productId);
    }).unsubscribe();
    return inCart;
  }

  getProductQuantity(productId: string): number {
    let quantity = 0;
    this.productsInCart$.subscribe(products => {
      const product = products.find(item => item.id === productId);
      quantity = product ? product.quantity : 0;
    }).unsubscribe();
    return quantity;
  }

  checkIfNotInCart(productsInfoId: string, cartProducts: Product[]): boolean {
    const isInCart = cartProducts.some(item => item.id === productsInfoId);
    return !isInCart;
  }

}
