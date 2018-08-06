import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableTopicComponent } from './timetable-topic.component';

describe('TimetableTopicComponent', () => {
  let component: TimetableTopicComponent;
  let fixture: ComponentFixture<TimetableTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
