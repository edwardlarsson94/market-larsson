import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NzCardModule,
    FontAwesomeModule,
    NzButtonModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  faTrash = faTrash
  faPlus = faPlus
  faMinus = faMinus
}
