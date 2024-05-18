import { Component } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardsComponent } from '../cards/cards.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal'
import { Router } from '@angular/router';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    NzDrawerModule,
    FontAwesomeModule,
    CardsComponent,
    NzButtonModule,
    NzModalModule
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {

  constructor(private modal: NzModalService,private router: Router) {}

  faCartShopping = faCartShopping;
  faTrashCan = faTrashCan
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Empty shopping cart',
      nzContent: '<b style="color: red;">Are you sure to empty the shopping cart?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  navigateToTickets() {
    this.router.navigate(['/tickets']);
  }


}