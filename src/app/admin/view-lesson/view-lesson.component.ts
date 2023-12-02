import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {
  constructor(    
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private builder: FormBuilder,
    private courseService: CourseService,
    private _dialog: MatDialog,
    ){

  }
  spinner:boolean =false;
  lessonsDetails:any;
  allLessons:any;
  ngOnInit(): void {
    this.spinner =true;
    this.courseService.getAllLessons().subscribe(res=>{
      this.lessonsDetails =res;
      this.allLessons = this.lessonsDetails?.data;
      this.spinner=false;
    });
  }
 
  result:any;
  deleteLesson(l_id:number,l_name:any){
    if(confirm(`Are you sure you want to delete ${l_name} lesson ?`)){

    
    this.courseService.deleteLesson(l_id).subscribe(res=>{
      this.result = res
      window.location.reload();
      this.toaster.success(`${l_id} deleted successfully`, `${this.result.data}`);
    }, err=>{
      this.result = err
      this.toaster.error(`${l_id} is not deleted successfully`, `${this.result.error}`);
    })
  }
  }
  editLesson(data:any){
    const dialogRef = this._dialog.open(EditLessonComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.courseService.getAllLessons().subscribe(res=>{
            this.lessonsDetails =res;
            this.allLessons = this.lessonsDetails?.data;
          });
        }
      },
    });
  }
}

