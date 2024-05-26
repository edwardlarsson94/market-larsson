import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket, TicketResults } from '../../models/interface/ticket/ticket';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersList(): Observable<TicketResults> {
    return this.http.get<TicketResults>(`${this.apiUrl}/order`);
  }

  createOrder(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/order`, ticket);
  }
}