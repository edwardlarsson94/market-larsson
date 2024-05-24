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
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/product/products.service';
import { Product, ProductResults } from '../../../models/interface/product/product';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-orders',
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
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {
  public productsAdminResults$!: Observable<ProductResults>;
  editCache: { [key: string]: { edit: boolean; data: Product } } = {};
  listOfData: Product[] = [];
  isVisible = false;
  isFooter = null;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getAllProducts(): void {
    this.productsAdminResults$ = this.service.getProductsList();
    this.productsAdminResults$.subscribe({
      next: (results) => {
        this.listOfData = results.data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  createNotification(type: string,title:string,description:string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  constructor(private service: ProductsService,
    private notification: NzNotificationService,
  ) {
  }
}