import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css'],
})
export class AssignCourseComponent implements OnInit {
  employeeId: any;
  result:any;
  employeeDetails: any =null;
  course:any;
  resultCourse:any;
  isValid:any;
  spinner:any;
  constructor(
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private builder: FormBuilder,
    private courseService: CourseService,
    private datepick: DatePipe
  ) {
    

  }
  ngOnInit(): void {
    this.spinner=true;
    this.isValid =false;
    this.route.params.subscribe((param) => {
      this.employeeId = param['id'];
      console.log(this.employeeId);
      this.common.getUserByEmployeeId(this.employeeId).subscribe((emp) => {
        this.result = emp;
        this.employeeDetails = this.result?.data[0];
      });
    });
    this.courseService.getAllCourses().subscribe(c=>{
      this.resultCourse = c
      this.course = this.resultCourse?.data;
      this.spinner=false;
    });
  }
   currentDateTime =this.datepick.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  assignCourseForm= this.builder.group({
    c_id: this.builder.control(''),
    a_date: this.builder.control(this.currentDateTime),
    emp_id:this.builder.control('')
  })
   response:any;
   goBack(){
    this.router.navigate(['/admin']);
   }
   loadSubMenu(event: any){
    
   }
  addCourse(){
    this.courseService.postCourse(this.assignCourseForm.value).subscribe(res=>{
      this.response =  res
      this.toaster.success(`${this.response?.message}`)
      this.router.navigate(['/admin']);
  
    }, err=>{
      this.toaster.warning(`${err.error.message}`)
    })
  }

 }
