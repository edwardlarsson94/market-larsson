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
    return this.http.get<TicketResults>('http://localhost:3000/api/order');
  }
  
  createOrder(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>('http://localhost:3000/api/order', ticket);
  }
}