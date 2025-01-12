import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailchambreComponent } from './detailchambre.component';

describe('DetailchambreComponent', () => {
  let component: DetailchambreComponent;
  let fixture: ComponentFixture<DetailchambreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailchambreComponent]
    });
    fixture = TestBed.createComponent(DetailchambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
