import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCartComponent } from './overview-cart.component';

describe('OverviewCartComponent', () => {
  let component: OverviewCartComponent;
  let fixture: ComponentFixture<OverviewCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
