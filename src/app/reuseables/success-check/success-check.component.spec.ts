import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCheckComponent } from './success-check.component';

describe('SuccessCheckComponent', () => {
  let component: SuccessCheckComponent;
  let fixture: ComponentFixture<SuccessCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
