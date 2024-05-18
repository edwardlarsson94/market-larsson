import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    BannerComponent,
    NzGridModule
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

}
