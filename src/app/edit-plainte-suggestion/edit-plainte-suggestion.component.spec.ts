import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlainteSuggestionComponent } from './edit-plainte-suggestion.component';

describe('EditPlainteSuggestionComponent', () => {
  let component: EditPlainteSuggestionComponent;
  let fixture: ComponentFixture<EditPlainteSuggestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPlainteSuggestionComponent]
    });
    fixture = TestBed.createComponent(EditPlainteSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
