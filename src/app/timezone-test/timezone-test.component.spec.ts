import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneTestComponent } from './timezone-test.component';

describe('TimezoneTestComponent', () => {
  let component: TimezoneTestComponent;
  let fixture: ComponentFixture<TimezoneTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimezoneTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimezoneTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
