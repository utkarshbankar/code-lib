import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LozyCustElmComponent } from './lozy-cust-elm.component';

describe('LozyCustElmComponent', () => {
  let component: LozyCustElmComponent;
  let fixture: ComponentFixture<LozyCustElmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LozyCustElmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LozyCustElmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
