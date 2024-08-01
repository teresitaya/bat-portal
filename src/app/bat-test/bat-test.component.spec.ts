import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatTestComponent } from './bat-test.component';

describe('BatTestComponent', () => {
  let component: BatTestComponent;
  let fixture: ComponentFixture<BatTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
