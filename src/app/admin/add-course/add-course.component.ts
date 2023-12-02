import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit{
  constructor(
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private builder: FormBuilder,
    private courseService: CourseService
  ) {}
  resultCourse:any;
  c_order:any;
  spinner:any;
  c_order_array =[1,2,3,4,5,6,7,8,9,10];
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(c=>{
      this.resultCourse = c
      this.c_order = this.resultCourse?.data.map(e => e.c_order);
      this.spinner=false;
    });
  }

  addCourseForm= this.builder.group({
    c_name: this.builder.control('', Validators.required),
    c_order: this.builder.control('', Validators.required)
  })

  addCourse(){
    this.courseService.addCourse(this.addCourseForm.value).subscribe(res=>{
      this.toaster.success('Course added successfully');
      this.router.navigate(['/admin/view-course']);
    }, err=>{
      this.toaster.error(`${err.error.message}`)
    })
  }
  goBack(){
    this.router.navigate(['/admin/view-course']);
   }
}
