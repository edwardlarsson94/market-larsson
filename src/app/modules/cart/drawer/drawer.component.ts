import { Component } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardsComponent } from '../cards/cards.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    NzDrawerModule,
    FontAwesomeModule,
    CardsComponent,
    NzButtonModule
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  faCartShopping = faCartShopping;
  faTrashCan = faTrashCan
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}