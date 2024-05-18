import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardsComponent } from '../cards/cards.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NzGridModule,
    CardsComponent,
    HeaderComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
}
