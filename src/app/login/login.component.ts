import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private common: AuthService,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (sessionStorage.getItem('employeeId')) {
      router.navigate(['']);
    }
  }
  spinner = false;
  submitted = false;
  loginForm = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    remember: this.builder.control(false),
  });
  user1: any;
  user: any;
  loginUser() {
    this.spinner = true;
    this.submitted = true;
    this.dialog.open(ModalComponent);
    if (this.loginForm.valid) {
      this.common.loggin(this.loginForm.value).subscribe(
        (res) => {
          this.user1 = res;
          this.user = this.user1.data[0];
          if (this.user.id) {
            console.log('remember');
            console.log(this.loginForm.value.remember);
            if (this.loginForm.value.remember == true) {
              console.log('inside remember');
              localStorage.setItem('employeeId', this.user.employeeId);
              localStorage.setItem('role', this.user.role);
            }
            sessionStorage.setItem('employeeId', this.user.employeeId);
            this.spinner = false;
            this.dialog.closeAll();
            if(this.user.role=='admin'){
              sessionStorage.setItem('role', this.user.role);
              this.router.navigate(['admin']);
            }else{
              sessionStorage.setItem('role', this.user.role);
              this.router.navigate(['']);
            }
            this.toastr.success('Login successfully');
          } else {
            this.toastr.error('Invalid Credentials');
            this.spinner = false;
            this.dialog.closeAll();
          }
        },
        (err) => {
          err.status === 404
            ? this.toastr.error(
                `User does not found with Employee ID ${this.loginForm.value.id}`
              )
            : '';
          err.status === 401 ? this.toastr.error(`Invalid Credentials.`) : '';
          this.dialog.closeAll();
        }
      );
    } else {
      const invalid = [];
      const controls =this.loginForm.controls;
      console.log(this.loginForm)
      for(let name in controls){
        if(controls[name].invalid){
          invalid.push(name);
        }
      }
      this.toastr.error(`Employee ID and Passowrd both are required`);
      this.spinner = false;
      this.dialog.closeAll();
    }
  }
  rememberMe() {}
  openDialog(): void {
    this.dialog.open(ModalComponent);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  get registerFormControl(){
    return this.loginForm.controls;
  }
}
