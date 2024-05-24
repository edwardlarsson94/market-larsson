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
import { AsyncPipe } from '@angular/common';
import { clearCart } from '../../../state/app.actions';
import { User } from '../../../models/interface/auth/user';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    NzDrawerModule,
    FontAwesomeModule,
    CardsComponent,
    NzButtonModule,
    NzModalModule,
    AsyncPipe
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
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>, private modal: NzModalService, private router: Router, private notification: NzNotificationService,) {
    this.productsInCart$ = this.store.select('productsInCart');
    this.totalItems$ = this.productsInCart$.pipe(
      map(products => products.reduce((acc, product) => acc + product.quantity, 0))
    );
    this.totalPrice$ = this.productsInCart$.pipe(
      map(products => products.reduce((acc, product) => acc + product.price * product.quantity, 0))
    );
    this.user$ = this.store.select('user');
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
      nzOnOk: () => this.clearCart(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
    this.close();
  }

  createNotification(type: string,title:string,description:string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  navigateToTickets(): void {
    this.user$.subscribe(user => {
      if (user?.id) {
        this.router.navigate(['/tickets']);
      } else {
        this.createNotification(
          "error",
          "Login Required 🛑",
          `Oops! It seems like you're not logged in. 
            Please log in to proceed with your purchase. 
            If you don't have an account yet, you can easily create one. Happy shopping!`
        )
      }
    }).unsubscribe();
  }
}
