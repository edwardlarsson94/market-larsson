import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NzGridModule,
    CardsComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
}
