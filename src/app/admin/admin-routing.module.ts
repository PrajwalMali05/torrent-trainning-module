import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeeComponent } from './all-employee/all-employee.component';
import { AdminComponent } from './admin/admin.component';
import { AssignCourseComponent } from './assign-course/assign-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';
import { SeeProgressComponent } from './see-progress/see-progress.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { CourseAnalyticsComponent } from './course-analytics/course-analytics.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path:'', component:AdminComponent, 
    children:[
      {path:'', component:AllEmployeeComponent},
      {path:'add-user', component:AddEditUserComponent},
      {path:'edit-user/:id', component:AddEditUserComponent},
      {path:'emp/:id', component:AssignCourseComponent},
      {path:'add-course', component:AddCourseComponent},
      {path: 'add-lesson', component:AddLessonComponent},
      {path: 'edit-course/:id', component:EditCourseComponent},
      {path: 'edit-lesson/:id', component:EditLessonComponent},
      {path: 'view-course', component: ViewCourseComponent},
      {path: 'view-lesson', component:ViewLessonComponent},
      {path: 'see-progress/:id', component:SeeProgressComponent},
      {path: 'course-analytics', component:CourseAnalyticsComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
