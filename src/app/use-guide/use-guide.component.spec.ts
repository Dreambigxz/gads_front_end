import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseGuideComponent } from './use-guide.component';

describe('UseGuideComponent', () => {
  let component: UseGuideComponent;
  let fixture: ComponentFixture<UseGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
