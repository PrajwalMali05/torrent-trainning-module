import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-all-lessons',
  templateUrl: './all-lessons.component.html',
  styleUrls: ['./all-lessons.component.css']
})
export class AllLessonsComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  currentUser: any;
  paramId!: number;
  fillerNav = Array.from({ length: 7 }, (_, i) => `${i + 1}`);
  
  private _mobileQueryListener: () => void;
    userLesson: any;
  result:any;
  allEmployees:any;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private courseService: CourseService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this.route.params.subscribe((param) => {
    //   this.paramId = param['id'];
    // });
  }


  ngOnInit(): void {

    if (localStorage.getItem('employeeId')) {
      sessionStorage.setItem('employeeId', localStorage.getItem('employeeId'));
    }
    const employeeId =
      sessionStorage.getItem('employeeId') ||
      localStorage.getItem('employeeId');
    this.common.getUserById(employeeId).subscribe(
      (res) => {
        this.currentUser = res;
        this.currentUser = this.currentUser.data[0];
        console.log(this.currentUser)
      },
      (err) => {
        this.toaster.warning('Error fetching employee details.');
      }
    );
    // this.route.paramMap.subscribe((params) => {
    //   var id = params.get('id');
    // });
    this.getUserLesson(employeeId);
  }

  getUserLesson(employeeId){
    this.courseService.getUserLesson(employeeId).subscribe({
      next: (val: any) => {
        this.userLesson =val.data;
        console.log(this.userLesson,'user lesson')
      },
      error: (err: any) => {
        console.error(err);
      },
    })
  }
  goToView(lesson:any){
    console.log(lesson.cm_id)
    this.courseService.setStatusInProgress(lesson.cm_id, lesson.l_c_id).subscribe({
      next:(valu: any)=>{
        console.log(lesson);
        this.toaster.success(valu.message);
    this.router.navigate(['/home/user/'+lesson.l_c_id])
      },
      error:(err:any)=>{
        this.toaster.error(err.error.message)
      }
    })
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
