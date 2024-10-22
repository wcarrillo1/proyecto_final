import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyCheckoutReportComponent } from './early-checkout-report.component';

describe('EarlyCheckoutReportComponent', () => {
  let component: EarlyCheckoutReportComponent;
  let fixture: ComponentFixture<EarlyCheckoutReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EarlyCheckoutReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarlyCheckoutReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
