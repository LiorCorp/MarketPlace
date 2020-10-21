import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTreeMenuComponent } from './mat-tree-menu.component';


describe('MenuComponent', () => {
  let component: MatTreeMenuComponent;
  let fixture: ComponentFixture<MatTreeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatTreeMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTreeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
