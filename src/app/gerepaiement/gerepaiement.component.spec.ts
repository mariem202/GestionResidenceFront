import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerepaiementComponent } from './gerepaiement.component';

describe('GerepaiementComponent', () => {
  let component: GerepaiementComponent;
  let fixture: ComponentFixture<GerepaiementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerepaiementComponent]
    });
    fixture = TestBed.createComponent(GerepaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
