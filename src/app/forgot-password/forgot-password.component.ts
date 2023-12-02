import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
  constructor(
    private common: AuthService,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private router: Router,    
    public dialog: MatDialog
  ){}
forgotPasswordForm= this.builder.group({
  id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
  password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
  confirmPassword: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)]))
})

changePassword(){
  if(this.forgotPasswordForm.valid){
    if(this.forgotPasswordForm.value.password == this.forgotPasswordForm.value.confirmPassword){
    this.dialog.open(ModalComponent);
    this.common.changePassword(this.forgotPasswordForm.value).subscribe(res=>{
      this.toastr.success('Password changed successfully');
      this.dialog.closeAll();
      this.router.navigate(['/login'])
    }, err=>{
      this.toastr.error(err.error.error);
      console.log(err.error.error)
      this.dialog.closeAll();
    })
  }else{
    this.toastr.warning('Password do not match');
    this.dialog.closeAll();    
  }
  }else{
    this.toastr.warning('Enter valid inputs.');
    this.dialog.closeAll();
  }
}

}
