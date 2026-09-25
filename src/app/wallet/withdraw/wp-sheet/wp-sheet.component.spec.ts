import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpSheetComponent } from './wp-sheet.component';

describe('WpSheetComponent', () => {
  let component: WpSheetComponent;
  let fixture: ComponentFixture<WpSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WpSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WpSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
