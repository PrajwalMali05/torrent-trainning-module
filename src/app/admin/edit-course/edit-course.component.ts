import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit{
  constructor(
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
   // private _dialogRef: MatDialogRef<EditCourseComponent>,
    private builder: FormBuilder,
    private courseService: CourseService,
   // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  paramId:any;
  data:any
  ngOnInit(): void {
    //this.updateCourseForm.patchValue(this.data);
    this.getData();
  }
  getData(){
    this.route.params.subscribe((param) => {
      this.paramId = param['id'];
      this.courseService.getCourse(this.paramId).subscribe({
        next:(value:any)=>{
          console.log(value)
          this.data = value.data[0];
          this.updateCourseForm.patchValue(this.data);
        },
        error:(err:any)=>{

        }
      })
    })

  }
  c_order_array =[1,2,3,4,5,6,7,8,9,10];
  updateCourseForm= this.builder.group({
    c_id: this.builder.control('', Validators.required),
    c_name: this.builder.control('', Validators.required),
    c_order: this.builder.control('', Validators.required)
  })
  onFormSubmit(){
    console.log(this.updateCourseForm.value, "update");
    console.log(this.data, "data")
    if (this.updateCourseForm.valid) {      
        this.courseService
          .updateCourse(this.updateCourseForm.value.c_id, this.updateCourseForm.value)
          .subscribe({
            next: (val: any) => {
             // this._dialogRef.close(true);
             this.router.navigate(['/admin/view-course']);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
  }
  goBack(){

  }
}
