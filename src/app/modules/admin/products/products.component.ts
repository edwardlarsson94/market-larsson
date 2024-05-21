import { Component,OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ProductsService } from '../../../services/products.service';
import { Product, ProductResults } from '../../../models/interface/product/product';
import { defaultProduct } from '../../../models/default/product/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NzTableModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzModalModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  public productsAdminResults$!: Observable<ProductResults>;
  editCache: { [key: string]: { edit: boolean; data: Product } } = {};
  listOfData: Product[] = [];
  isVisible = false;
  isFooter = null;

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  deleteProduct(id: string): void {
    this.service.deleteProduct(id).subscribe({
      next: () => {
        this.listOfData = this.listOfData.filter(item => item.id !== id);
        this.updateEditCache();
      },
      error: (error) => {
        console.error('There was an error deleting the product!', error);
      }
    });
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    const updatedProduct = this.editCache[id].data;
    this.service.updateProduct(id, updatedProduct).subscribe({
      next: (product) => {
        this.listOfData[index] = product;
        this.editCache[id].edit = false; 
      },
      error: (error) => {
        console.error('There was an error updating the product!', error);
      }
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  createProductNew(product: Product): void {
    this.service.createProduct(product).subscribe({
      next: (product) => {
        console.log('Product created successfully', product);
      },
      error: (error) => {
        console.error('There was an error creating the product!', error);
      }
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.productsAdminResults$ = this.service.getProductsList();
    this.productsAdminResults$.subscribe({
      next: (results) => {
        this.listOfData = results.data;
        this.updateEditCache();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  validateForm: FormGroup;

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: 'Input is required'
    },
    en: {
      required: 'Input is required'
    }
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      const formValues = this.validateForm.value;
      const newProduct: Product = {...defaultProduct,
        name: formValues?.nameNew,
        description: formValues?.descriptionNew,
        price: formValues?.priceNew,
        availableQuantity: formValues?.availabilityNew
      }
      this.createProductNew(newProduct);
      this.isVisible = false;
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: { 'zh-cn': `The text is redundant!`, en: `The text is redundant!` }
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  constructor(private fb: NonNullableFormBuilder, private service: ProductsService) {
    const { required, maxLength, minLength } = MyValidators;
    this.validateForm = this.fb.group({
      nameNew: ['', [required, maxLength(20), minLength(4)], [this.userNameAsyncValidator]],
      descriptionNew: ['', [required, maxLength(100), minLength(6)], [this.userNameAsyncValidator]],
      priceNew: ['', [required, Validators.min(0)]],
      availabilityNew: ['', [required, Validators.min(0)]]
    });
  }
}

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `MinLength is ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `MaxLength is ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }
}