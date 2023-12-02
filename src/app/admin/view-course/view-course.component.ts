import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';
import { EditCourseComponent } from '../edit-course/edit-course.component';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(    
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private builder: FormBuilder,
    private courseService: CourseService,
    //private _dialog: MatDialog,
    ){

  }
spinner:boolean =false;
  displayedColumns: string[] = [
    'c_id',
    'c_name',
    'c_order',
    'action'
  ]
  coursesDetails:any;
  allCourses:any;
  ngOnInit(): void {
  
    this.getAllCourseFun();
  }

  getAllCourseFun(){
    this.spinner =true;
    this.courseService.getAllCourses().subscribe({
      next: (res:any) => {
        this.coursesDetails =res;
        
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner =false;
      },
      error:(error:any) =>{
        this.spinner =false;
        console.log},
    });
  }
  result:any;
  deleteCourse(c_id:number, c_name:any){
    if(confirm(`Are you sure you want to delete ${c_name} course ?`)){

  
    this.courseService.deleteCourse(c_id).subscribe(res=>{
      this.result = res
      this.toaster.success(`${c_id} deleted successfully`, `${this.result.data}`);
      window.location.reload();
    }, err=>{
      this.result = err
      this.toaster.error(`${c_id} is not deleted successfully`, `${this.result.error}`);
    })
  }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // openEditForm(data: any){
  //   const dialogRef = this._dialog.open(EditCourseComponent, {
  //     data,
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.getAllCourseFun();
  //       }
  //     },
  //   });
  // }
}
