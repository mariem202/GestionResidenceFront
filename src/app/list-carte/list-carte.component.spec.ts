import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarteComponent } from './list-carte.component';

describe('ListCarteComponent', () => {
  let component: ListCarteComponent;
  let fixture: ComponentFixture<ListCarteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCarteComponent]
    });
    fixture = TestBed.createComponent(ListCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
