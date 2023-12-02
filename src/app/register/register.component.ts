import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private common: AuthService,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private router: Router,    
    public dialog: MatDialog
  ){}
  submitted =false;

  registerForm=this.builder.group({
    playerName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    psc: this.builder.control(''),
    dept: this.builder.control(''),
    password: this.builder.control('', Validators.compose([Validators.required])),
  })

  addUser(){
    this.submitted=true;
    if(this.registerForm.valid){
      this.dialog.open(ModalComponent);
      this.common.postUser(this.registerForm.value).subscribe(res=>{
        
        this.toastr.success('User added successfully');
        this.dialog.closeAll(); 
        this.router.navigate(['/login'])
      }, err=>{
        this.toastr.error(err.error.error);
        console.log(err.error.error)
        this.dialog.closeAll();
      })
    } else{
      const invalid = [];
      const controls =this.registerForm.controls;
      for(let name in controls){
        if(controls[name].invalid){
          invalid.push(name);
          console.log(controls);
        }
      }
      this.toastr.warning('Enter valid inputs.');
      this.dialog.closeAll();
    }
  }

  get registerFormControl(){
    return this.registerForm.controls;
  }
}
