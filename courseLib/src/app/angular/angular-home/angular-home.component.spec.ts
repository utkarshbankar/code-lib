import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularHomeComponent } from './angular-home.component';

describe('AngularHomeComponent', () => {
  let component: AngularHomeComponent;
  let fixture: ComponentFixture<AngularHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
