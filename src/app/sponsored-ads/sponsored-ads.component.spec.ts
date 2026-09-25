import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoredAdsComponent } from './sponsored-ads.component';

describe('SponsoredAdsComponent', () => {
  let component: SponsoredAdsComponent;
  let fixture: ComponentFixture<SponsoredAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsoredAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsoredAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
