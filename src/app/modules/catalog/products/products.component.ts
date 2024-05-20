import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardsComponent } from '../cards/cards.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ProductsService } from '../../../services/products.service';
import { Observable } from 'rxjs';
import { ProductResults } from '../../../models/product';

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
export class ProductsComponent implements OnInit {
  public productsResults$!: Observable<ProductResults>;
  constructor(private service: ProductsService){};

  ngOnInit(): void {
    this.productsResults$ = this.service.getProductsList();
  }
}
