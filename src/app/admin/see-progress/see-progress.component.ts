import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-see-progress',
  templateUrl: './see-progress.component.html',
  styleUrls: ['./see-progress.component.css']
})
export class SeeProgressComponent implements OnInit {
  course:any;
  resultCourse:any;
  paramId:any= false;
  allLessons:any;
  mark_received:any;
  constructor(
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private courseService: CourseService,
  ){
  }
  ngOnInit(): void {
this.getUserLesson();
  }

  getUserLesson(){
    this.route.params.subscribe((param) => {
      this.paramId = param['id'];
      console.log(this.paramId,'param id'); 
      this.courseService.getSingleLessonEmpId(this.paramId).subscribe({
        next:(value:any)=>{
          this.allLessons = value?.data;
          this.mark_received =this.allLessons.reduce((acc, obj )=>{
              return acc + obj.mark_received;
          },0)
          console.log(this.allLessons)
        },
        error:(err:any)=>{
          this.toaster.warning('Could not load lesson.')
        }
      })     
    });
  }

}
