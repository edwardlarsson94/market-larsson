import { Component, OnInit } from '@angular/core';
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
import { OrderService } from '../../../services/order/order.service';
import { Ticket, TicketResults } from '../../../models/interface/ticket/ticket';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { defaultTicket } from '../../../models/default/ticket/ticket';

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
  public ordersResults$!: Observable<TicketResults>;
  listOfData: Ticket[] = [defaultTicket];
  isVisible = false;
  isFooter = null;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getAllOrders(): void {
    this.ordersResults$ = this.service.getOrdersList();
    this.ordersResults$.subscribe({
      next: (results) => {
        this.listOfData = results.data;
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
          "Order Get Failed 😕",
          `"Oops! It looks like there was an issue while getting the orders.". ${messageError}. ${codeError}`
        )
      }
    });
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  constructor(private service: OrderService, private notification: NzNotificationService) { }
}