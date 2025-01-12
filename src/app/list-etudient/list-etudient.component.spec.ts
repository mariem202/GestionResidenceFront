import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudientComponent } from './list-etudient.component';

describe('ListEtudientComponent', () => {
  let component: ListEtudientComponent;
  let fixture: ComponentFixture<ListEtudientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEtudientComponent]
    });
    fixture = TestBed.createComponent(ListEtudientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
