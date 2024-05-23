import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { AppState } from '../../../state/app.state';
import { Product } from '../../../models/interface/product/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardsComponent } from '../cards/cards.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    NzDrawerModule,
    FontAwesomeModule,
    CardsComponent,
    NzButtonModule,
    NzModalModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  faCartShopping = faCartShopping;
  faTrashCan = faTrashCan;
  visible = false;
  productsInCart$: Observable<Product[]>;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;

  constructor(private store: Store<AppState>, private modal: NzModalService, private router: Router) {
    this.productsInCart$ = this.store.select('productsInCart');
    this.totalItems$ = this.productsInCart$.pipe(
      map(products => products.reduce((acc, product) => acc + product.quantity, 0))
    );
    this.totalPrice$ = this.productsInCart$.pipe(
      map(products => products.reduce((acc, product) => acc + product.price * product.quantity, 0))
    );
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Empty shopping cart',
      nzContent: '<b style="color: red;">Are you sure to empty the shopping cart?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  navigateToTickets() {
    this.router.navigate(['/tickets']);
  }
}