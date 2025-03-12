import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShcedulesMonthComponent } from './shcedules-month.component';

describe('ShcedulesMonthComponent', () => {
  let component: ShcedulesMonthComponent;
  let fixture: ComponentFixture<ShcedulesMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShcedulesMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShcedulesMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
