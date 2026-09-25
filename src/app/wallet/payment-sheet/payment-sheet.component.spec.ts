import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSheetComponent } from './payment-sheet.component';

describe('PaymentSheetComponent', () => {
  let component: PaymentSheetComponent;
  let fixture: ComponentFixture<PaymentSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
