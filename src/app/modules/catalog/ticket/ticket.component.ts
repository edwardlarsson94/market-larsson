import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BannerComponent } from '../../../shared/banner/banner.component';
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
    NzSelectModule
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  validateForm: FormGroup<{
    address: FormControl<string>;
    phoneNumberPrefix: FormControl<'+1' | '+57'>;
    phoneNumber: FormControl<string>;
    comment: FormControl<string>;
  }>;

  productsInCart$: Observable<Product[]>;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;
  stateButtonBuy:boolean;

  constructor(private fb: NonNullableFormBuilder, private store: Store<AppState>,private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      address: [{ value: '', disabled: false }, [Validators.required], [this.userNameAsyncValidator]],
      phoneNumberPrefix: '+1' as '+1' | '+57',
      phoneNumber: ['', [Validators.required]],
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
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData: Ticket = { ...defaultTicket };
      this.totalPrice$.subscribe(totalPrice => {
        formData.amountProduct = totalPrice;
        formData.tax = totalPrice * 0.08;
      });
      this.totalItems$.subscribe(totalItems => {
        formData.total = totalItems;
      });
      formData.address = this.validateForm.value.address ?? '';
      formData.comment = this.validateForm.value.comment ?? '';
      formData.phoneNumber = this.validateForm.value.phoneNumber ?? '';
      formData.phoneNumberPrefix = this.validateForm.value.phoneNumberPrefix ?? '';
      this.stateButtonBuy = true;
      this.validateForm.get('address')?.disable();
      this.validateForm.get('phoneNumberPrefix')?.disable();
      this.validateForm.get('phoneNumber')?.disable();
      this.validateForm.get('comment')?.disable();
    } else {
      this.createNotification(
        "error",
        "Form Incomplete! 🚨",
        `Oops! It looks like you missed filling out some required fields in the form.`
      )
    }
  }
  

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  createNotification(type: string,title:string,description:string): void {
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
