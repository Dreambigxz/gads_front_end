import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoWithdrawComponent } from './crypto-withdraw.component';

describe('CryptoWithdrawComponent', () => {
  let component: CryptoWithdrawComponent;
  let fixture: ComponentFixture<CryptoWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
