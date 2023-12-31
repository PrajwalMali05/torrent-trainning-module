import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLessonComponent } from './start-lesson.component';

describe('StartLessonComponent', () => {
  let component: StartLessonComponent;
  let fixture: ComponentFixture<StartLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
