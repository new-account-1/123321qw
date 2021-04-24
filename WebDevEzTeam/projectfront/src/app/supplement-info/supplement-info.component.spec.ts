import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementInfoComponent } from './supplement-info.component';

describe('SupplementInfoComponent', () => {
  let component: SupplementInfoComponent;
  let fixture: ComponentFixture<SupplementInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplementInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
