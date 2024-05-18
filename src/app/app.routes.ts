import { Routes } from '@angular/router';
import { ProductsComponent } from './modules/catalog/products/products.component';
import { TicketComponent } from './modules/catalog/ticket/ticket.component';


export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'tickets', component: TicketComponent }
];
