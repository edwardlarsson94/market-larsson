import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule,NzButtonSize } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  size: NzButtonSize = 'large';
}
