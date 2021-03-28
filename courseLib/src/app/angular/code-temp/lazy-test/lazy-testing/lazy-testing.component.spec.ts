import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyTestingComponent } from './lazy-testing.component';

describe('LazyTestingComponent', () => {
  let component: LazyTestingComponent;
  let fixture: ComponentFixture<LazyTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
