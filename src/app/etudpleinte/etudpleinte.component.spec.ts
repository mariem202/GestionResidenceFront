import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudpleinteComponent } from './etudpleinte.component';

describe('EtudpleinteComponent', () => {
  let component: EtudpleinteComponent;
  let fixture: ComponentFixture<EtudpleinteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtudpleinteComponent]
    });
    fixture = TestBed.createComponent(EtudpleinteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
