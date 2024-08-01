import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageTestComponent } from './storage-test.component';

describe('StorageTestComponent', () => {
  let component: StorageTestComponent;
  let fixture: ComponentFixture<StorageTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
