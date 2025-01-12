import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlainteSuggestionComponent } from './add-plainte-suggestion.component';

describe('AddPlainteSuggestionComponent', () => {
  let component: AddPlainteSuggestionComponent;
  let fixture: ComponentFixture<AddPlainteSuggestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlainteSuggestionComponent]
    });
    fixture = TestBed.createComponent(AddPlainteSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
