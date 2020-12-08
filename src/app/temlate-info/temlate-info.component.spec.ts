import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemlateInfoComponent } from './temlate-info.component';

describe('TemlateInfoComponent', () => {
  let component: TemlateInfoComponent;
  let fixture: ComponentFixture<TemlateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemlateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemlateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
