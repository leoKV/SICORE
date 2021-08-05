import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicesComponent } from './polices.component';

describe('PolicesComponent', () => {
  let component: PolicesComponent;
  let fixture: ComponentFixture<PolicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
