import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehindTheScenesComponent } from './behind-the-scenes.component';

describe('BehindTheScenesComponent', () => {
  let component: BehindTheScenesComponent;
  let fixture: ComponentFixture<BehindTheScenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehindTheScenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehindTheScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
