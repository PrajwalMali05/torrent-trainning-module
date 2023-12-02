import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { StartLessonComponent } from './start-lesson/start-lesson.component';

const routes: Routes = [
  {path:'', component: AllLessonsComponent},
  {path:':id', component:StartLessonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
