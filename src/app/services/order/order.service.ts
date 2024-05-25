import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket, TicketResults } from '../../models/interface/ticket/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrdersList(): Observable<TicketResults>{
    return this.http.get<TicketResults>('https://market-larsson-api.azurewebsites.net/api/order');
  }
  
  createOrder(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>('https://market-larsson-api.azurewebsites.net/api/order', ticket);
  }
}