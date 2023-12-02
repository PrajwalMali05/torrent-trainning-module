import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  currentUser: any;
  paramId!: number;
  fillerNav = Array.from({ length: 7 }, (_, i) => `${i + 1}`);
  private _mobileQueryListener: () => void;
  allEmployees: any;
  result: any;
  sideNav = [
    { name: 'Manage Courses', route: '/view-course' },
    { name: 'Manage Lessons', route: '/view-lesson' },    
    { name: 'Manage User', route: '' },
    { name: 'Course Analytics', route: '/course-analytics' },
  ];
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.route.params.subscribe((param) => {
      this.paramId = param['id'];
    });
    const role = sessionStorage.getItem('role');
    console.log(role)
    if(role == 'employee'){
      this.router.navigate(['']);
    }else{

    }
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
      },
      (err) => {
        this.toaster.warning('Error fetching employee details.');
      }
    );
    this.route.paramMap.subscribe((params) => {
      var id = params.get('id');
    });
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
