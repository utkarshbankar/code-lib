import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTempComponent } from './doc-temp.component';

describe('DocTempComponent', () => {
  let component: DocTempComponent;
  let fixture: ComponentFixture<DocTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
