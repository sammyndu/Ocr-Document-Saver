import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftDocumentComponent } from './soft-document.component';

describe('SoftDocumentComponent', () => {
  let component: SoftDocumentComponent;
  let fixture: ComponentFixture<SoftDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
