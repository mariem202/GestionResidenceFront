import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportChambreComponent } from './rapport-chambre.component';

describe('RapportChambreComponent', () => {
  let component: RapportChambreComponent;
  let fixture: ComponentFixture<RapportChambreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportChambreComponent]
    });
    fixture = TestBed.createComponent(RapportChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
