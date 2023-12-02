import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-course-analytics',
  templateUrl: './course-analytics.component.html',
  styleUrls: ['./course-analytics.component.css']
})
export class CourseAnalyticsComponent implements OnInit {

  constructor(
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private courseService: CourseService,
  ){
    this.step1= false;
  }
  step1:boolean = false;
  resultCourse:any
  course:any;
  results:any;
  spinner:boolean =false;
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(c=>{
      this.resultCourse = c
      this.course = this.resultCourse?.data;
    });
  }
  loadSubMenu(event:any){
    this.spinner = true;
    this.step1 =true;
    console.log(event);

    this.courseService.getCourseAnalytics(event).subscribe({
      next:(value:any)=>{
        this.results = value?.data
        console.log(this.results)
        this.spinner =false;
      },
      error:(err:any)=>{
        this.results =false;
        this.spinner=false;
      }
    })
  }
}
