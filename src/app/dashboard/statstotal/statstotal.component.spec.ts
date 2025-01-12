import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatstotalComponent } from './statstotal.component';

describe('StatstotalComponent', () => {
  let component: StatstotalComponent;
  let fixture: ComponentFixture<StatstotalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatstotalComponent]
    });
    fixture = TestBed.createComponent(StatstotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
