import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTempComponent } from './faq-temp.component';

describe('FaqTempComponent', () => {
  let component: FaqTempComponent;
  let fixture: ComponentFixture<FaqTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
