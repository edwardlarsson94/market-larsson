import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule,NzButtonSize } from 'ng-zorro-antd/button';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Product } from '../../../models/interface/product/product';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  size: NzButtonSize = 'large';
  faTrash = faTrash
  faPlus = faPlus
  faMinus = faMinus

  @Input() productsInfo!: Product;
}
