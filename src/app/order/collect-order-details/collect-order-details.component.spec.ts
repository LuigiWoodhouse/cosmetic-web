import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectOrderDetailsComponent } from './collect-order-details.component';

describe('CollectOrderDetailsComponent', () => {
  let component: CollectOrderDetailsComponent;
  let fixture: ComponentFixture<CollectOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
