import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit{
  constructor(
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    //private _dialogRef: MatDialogRef<EditLessonComponent>,
    private builder: FormBuilder,
    private courseService: CourseService,
    //@Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  step1:any =false;
  resultCourse:any;
  course:any;
  data: any;
  paramId:any;
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(c=>{
      this.resultCourse = c
      this.course = this.resultCourse?.data;
    });
   this.getData();
  }
  updateLessonForm= this.builder.group({
    p_id: this.builder.control('', Validators.required),
    l_id: this.builder.control('', Validators.required),
    l_name: this.builder.control('', Validators.required),
    l_order: this.builder.control('', Validators.required),
   // lessons: this.builder.array([])
  })
  getData(){
    this.route.params.subscribe((param) => {
      this.paramId = param['id'];
      this.courseService.getLesson(this.paramId).subscribe({
        next:(value:any)=>{
          console.log(value)
        this.data = value.data[0]

          this.updateLessonForm.patchValue(this.data);
        },
        error:(err:any)=>{

        }
      })
    })

  }

  updateLesson(){
    console.log(this.updateLessonForm.value, "update");
    console.log(this.data, "data")
    if (this.updateLessonForm.valid) {      
        this.courseService
          .updateLesson(this.updateLessonForm.value.l_id, this.updateLessonForm.value)
          .subscribe({
            next: (val: any) => {
              //this._dialogRef.close(true);
              this.router.navigate(['/admin/view-lesson']);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }

  }
  loadSubMenu(event:any){
    this.step1=true;
  }
}
