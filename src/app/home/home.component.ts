import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/** @title Responsive sidenav */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  currentUser:any
  paramId!: number;
  sideNav = [
    { name: 'My Lessons', route: '/user' },    
  ];
  fillerNav = Array.from({length: 7}, (_, i) => `${i + 1}`);
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private common: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    ) 
    {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.route.params.subscribe(param=>{
      this.paramId = param['id'];
     })
     const role = sessionStorage.getItem('role');
     console.log(role)
     if(role == 'admin'){
       this.router.navigate(['admin']);
     }else{
 
     }
  }

  ngOnInit(): void {
  if(localStorage.getItem('employeeId')){
    sessionStorage.setItem('employeeId',localStorage.getItem('employeeId'));
  }    
   const employeeId = sessionStorage.getItem('employeeId') || localStorage.getItem('employeeId');
   this.common.getUserById(employeeId).subscribe(res=>{
    this.currentUser = res;
    this.currentUser = this.currentUser.data[0];
    console.log(this.currentUser);
    
   }, err=>{
    this.toaster.warning("Error fetching employee details.")
   });
   this.route.paramMap.subscribe(params => {
    var id = params.get('id');
  })
}
logout(){
  sessionStorage.clear();
  localStorage.clear();
  this.router.navigate(['/login'])
}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
