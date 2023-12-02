import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AllEmployeeComponent } from './all-employee/all-employee.component';
import { MaterialModule } from 'src/material.module';
import { AdminComponent } from './admin/admin.component';
import { AssignCourseComponent } from './assign-course/assign-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { SeeProgressComponent } from './see-progress/see-progress.component';
import { CourseAnalyticsComponent } from './course-analytics/course-analytics.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';



@NgModule({
  declarations: [
    AllEmployeeComponent,
    AdminComponent,
    AssignCourseComponent,
    AddCourseComponent,
    AddLessonComponent,
    ViewCourseComponent,
    ViewLessonComponent,
    EditCourseComponent,
    EditLessonComponent,
    SeeProgressComponent,
    CourseAnalyticsComponent,
    AddEditUserComponent,
  ],
  providers: [DatePipe],

  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
