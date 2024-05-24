import { Routes } from '@angular/router';
import { ProductsComponentAdmin } from './modules/admin/products/products.component';
import { OrdersComponent } from './modules/admin/orders/orders.component';
import { TicketComponent } from './modules/catalog/ticket/ticket.component';
import { LayoutComponent } from './modules/admin/layout/layout.component';
import { authGuard } from './guards/auth/auth.guard';
import { adminGuard } from './guards/admin/admin.guard';
import { ProductsComponent } from './modules/catalog/products/products.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'tickets', component: TicketComponent, canActivate: [authGuard] },
  { path: 'admin', component: LayoutComponent, canActivate: [adminGuard], children: [
      { path: 'products', component: ProductsComponentAdmin },
      { path: 'orders', component: OrdersComponent }
    ]
  }
];
