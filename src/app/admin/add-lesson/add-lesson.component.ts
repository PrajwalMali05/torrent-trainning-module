import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {
  course:any;
  resultCourse:any;
  step1:any= false;
  constructor(
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private builder: FormBuilder,
    private courseService: CourseService
  ){
  }
   resu:any;
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(c=>{
      this.resultCourse = c
      this.course = this.resultCourse?.data;
    });
  }
  abc=this.builder.group({
    l_name:this.builder.control('',Validators.required),
    l_order:this.builder.control('',Validators.required)

  })
  addLessonForm= this.builder.group({
    p_id: this.builder.control('', Validators.required),
    l_name: this.builder.control('', Validators.required),
    l_order: this.builder.control('', Validators.required),
   // lessons: this.builder.array([])
  })

  loadSubMenu(id:any){
    this.step1=true;
    console.log(this.addLessonForm.value)
  }
//   addNewLesson(num:any){
//  const control = new FormGroup({
//   l_name: new FormControl(null, Validators.required),
//   l_order: new FormControl(null, Validators.required),
//  });
//  //(<FormArray>this.addLessonForm.get('lessons')).push(control);
// }

get lessonControl(){
  return this.addLessonForm.controls["lessons"] as FormArray;
}
  addLesson(){
    
    console.log(this.addLessonForm.value)
    this.courseService.addLesson(this.addLessonForm.value).subscribe(res=>{
      this.resu =res;
      this.toaster.success('Lessons added successfully');

       this.router.navigate(['/admin/view-lesson']);
    }, err=>{
      console.log(err)
      this.toaster.warning('Lesson did not added successfully');
    })
  }
  deleteLesson(index: number){
this.lessonControl.removeAt(index);
  }
}
