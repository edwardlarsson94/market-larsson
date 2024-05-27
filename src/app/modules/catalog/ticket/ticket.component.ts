import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AppState } from '../../../state/app.state';
import { Product } from '../../../models/interface/product/product';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Ticket } from '../../../models/interface/ticket/ticket';
import { defaultTicket } from '../../../models/default/ticket/ticket';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from '../../../models/interface/auth/user';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { BannerComponent } from '../../shared/banner/banner.component';
import { OrderService } from '../../../services/order/order.service';
import { MyValidators } from '../../admin/products/products.component';
import { clearCart } from '../../../state/app.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    BannerComponent,
    NzGridModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    AsyncPipe,
    DecimalPipe,
    NzSelectModule,
    NzModalModule
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  validateForm: FormGroup<{
    fullName: FormControl<string>;
    address: FormControl<string>;
    phoneNumberPrefix: FormControl<'+1' | '+57'>;
    phoneNumber: FormControl<string>;
    comment: FormControl<string>;
  }>;

  productsInCart$: Observable<Product[]>;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;
  user$: Observable<User | null>;
  stateButtonBuy: boolean;
  formData: Ticket = { ...defaultTicket };

  constructor(private fb: NonNullableFormBuilder, 
      private store: Store<AppState>, 
      private notification: NzNotificationService,
      private modal: NzModalService,
      private service: OrderService,
      private router: Router
    ) 
  {
    const { required, maxLength, minLength } = MyValidators;
    this.validateForm = this.fb.group({
      fullName: [{ value: '', disabled: false }, [Validators.required], [this.userNameAsyncValidator]],
      address: [{ value: '', disabled: false }, [Validators.required], [this.userNameAsyncValidator]],
      phoneNumberPrefix: '+1' as '+1' | '+57',
      phoneNumber: ['', [required, minLength(10),maxLength(10)]],
      comment: ['', [Validators.required]]
    });
    this.stateButtonBuy = false;
    this.productsInCart$ = this.store.select('productsInCart');
    this.totalItems$ = this.productsInCart$.pipe(
      map(products => products.reduce((acc, product) => acc + product.quantity, 0))
    );
    this.totalPrice$ = this.productsInCart$.pipe(
      map(products => products.reduce((acc, product) => acc + product.price * product.quantity, 0))
    );
    this.user$ = this.store.select('user');
  }

  submitForm(): void {
    if (this.validateForm.valid) {      
      this.totalPrice$.subscribe(totalPrice => {
        this.formData.total = totalPrice;
        this.formData.tax = totalPrice * 0.08;
      }).unsubscribe();
      
      this.totalItems$.subscribe(totalItems => {
        this.formData.amountProduct = totalItems;
      }).unsubscribe();
      this.formData.fullName = this.validateForm.value.fullName ?? 'No Name';
      this.formData.address = this.validateForm.value.address ?? '';
      this.formData.comment = this.validateForm.value.comment ?? '';
      this.formData.phoneNumber = this.validateForm.value.phoneNumber ?? '';
      this.formData.phoneNumberPrefix = this.validateForm.value.phoneNumberPrefix ?? '';
      this.validateFormAndButton();
    } else {
      this.createNotification(
        "error",
        "Form Incomplete! 🚨",
        `Oops! It looks like you missed filling out some required fields in the form.`
      )
    }
  }

  validateFormAndButton(): void {
    this.stateButtonBuy = true;
    this.validateForm.get('address')?.disable();
    this.validateForm.get('phoneNumberPrefix')?.disable();
    this.validateForm.get('phoneNumber')?.disable();
    this.validateForm.get('comment')?.disable();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  checkout(): void {
    this.service.createOrder(this.formData).subscribe({
      next: (res) => {
        if(res){
          this.store.dispatch(clearCart());
          this.router.navigate(['/']);          
          this.createNotification(
            "success",
            "New Order Alert 🚀",
            `Hey there! 🎉 We're excited to let you know that a new order has been created.`
          )
        }
      },
      error: (error) => {
        let messageError = '';
        let codeError = '';
        if(error?.error){
          messageError = error?.error?.errors?.message;
          codeError = error?.error?.errors?.code;
        }
        this.createNotification(
          "error",
          "Order Creation Failed 😕",
          `"Oops! It looks like there was an issue while creating the order.". ${messageError}. ${codeError}`
        )
      }
    });
  }

  showConfirmBuy(): void {
    this.modal.confirm({
      nzTitle: 'Confirm Purchase 🛒',
      nzContent: '<b">Are you sure you want to proceed with this purchase?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.checkout(),
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'Colombia') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
}
