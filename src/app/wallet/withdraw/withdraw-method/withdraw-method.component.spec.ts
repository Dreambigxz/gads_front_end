import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawMethodComponent } from './withdraw-method.component';

describe('WithdrawMethodComponent', () => {
  let component: WithdrawMethodComponent;
  let fixture: ComponentFixture<WithdrawMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
