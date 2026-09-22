import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanagePasswordComponent } from './chanage-password.component';

describe('ChanagePasswordComponent', () => {
  let component: ChanagePasswordComponent;
  let fixture: ComponentFixture<ChanagePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChanagePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChanagePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
