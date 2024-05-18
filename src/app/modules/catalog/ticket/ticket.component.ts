import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    BannerComponent
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

}
