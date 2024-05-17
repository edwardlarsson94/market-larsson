import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule,NzButtonSize } from 'ng-zorro-antd/button';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
}
