import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalInformationCreatedComponent } from './nutritional-information-created.component';

describe('NutritionalInformationCreatedComponent', () => {
  let component: NutritionalInformationCreatedComponent;
  let fixture: ComponentFixture<NutritionalInformationCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionalInformationCreatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionalInformationCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
