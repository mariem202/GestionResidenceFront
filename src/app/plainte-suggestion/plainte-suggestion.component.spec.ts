import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainteSuggestionComponent } from './plainte-suggestion.component';

describe('PlainteSuggestionComponent', () => {
  let component: PlainteSuggestionComponent;
  let fixture: ComponentFixture<PlainteSuggestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlainteSuggestionComponent]
    });
    fixture = TestBed.createComponent(PlainteSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
