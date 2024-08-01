import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebApisTestComponent } from './web-apis-test.component';

describe('WebApisTestComponent', () => {
  let component: WebApisTestComponent;
  let fixture: ComponentFixture<WebApisTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebApisTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebApisTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
