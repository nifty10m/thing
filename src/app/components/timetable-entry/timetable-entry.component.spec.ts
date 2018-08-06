import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableEntryComponent } from './timetable-entry.component';

describe('TimetableEntryComponent', () => {
  let component: TimetableEntryComponent;
  let fixture: ComponentFixture<TimetableEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
