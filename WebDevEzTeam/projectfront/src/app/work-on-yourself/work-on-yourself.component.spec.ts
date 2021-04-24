import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOnYourselfComponent } from './work-on-yourself.component';

describe('WorkOnYourselfComponent', () => {
  let component: WorkOnYourselfComponent;
  let fixture: ComponentFixture<WorkOnYourselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOnYourselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOnYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
