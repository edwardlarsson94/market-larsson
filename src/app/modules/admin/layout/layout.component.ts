import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ProductsComponent } from '../products/products.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    ProductsComponent,
    NzButtonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  goToProducts(): void {
    this.router.navigate(['/']);
  }
}
