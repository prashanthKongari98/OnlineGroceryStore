import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryExecutivesComponent } from './delivery-executives.component';

describe('DeliveryExecutivesComponent', () => {
  let component: DeliveryExecutivesComponent;
  let fixture: ComponentFixture<DeliveryExecutivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryExecutivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryExecutivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
