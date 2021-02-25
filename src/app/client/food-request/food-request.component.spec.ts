import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodRequestComponent } from './food-request.component';

describe('FoodRequestComponent', () => {
  let component: FoodRequestComponent;
  let fixture: ComponentFixture<FoodRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});