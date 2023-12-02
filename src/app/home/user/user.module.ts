import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { MaterialModule } from 'src/material.module';
import { StartLessonComponent } from './start-lesson/start-lesson.component';


@NgModule({
  declarations: [
    AllLessonsComponent,
    StartLessonComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
