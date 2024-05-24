import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { clearUser, clearCart } from '../../../state/app.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzButtonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router, private store: Store<AppState>) {}

  goToProducts(): void {
    this.store.dispatch(clearUser());
    this.store.dispatch(clearCart());
    this.router.navigate(['/']);
  }
}
