import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardCartComponent } from './product-card-cart.component';

describe('ProductCardCartComponent', () => {
  let component: ProductCardCartComponent;
  let fixture: ComponentFixture<ProductCardCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
