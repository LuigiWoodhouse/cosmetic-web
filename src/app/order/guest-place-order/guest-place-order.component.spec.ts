import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPlaceOrderComponent } from './guest-place-order.component';

describe('GuestPlaceOrderComponent', () => {
  let component: GuestPlaceOrderComponent;
  let fixture: ComponentFixture<GuestPlaceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestPlaceOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestPlaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
