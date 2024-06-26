import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponentAdmin } from './products.component';

describe('ProductsComponentAdmin', () => {
  let component: ProductsComponentAdmin;
  let fixture: ComponentFixture<ProductsComponentAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponentAdmin]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsComponentAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
