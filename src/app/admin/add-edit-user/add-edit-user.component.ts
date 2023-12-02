import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  constructor(
    private common: AuthService,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  data: any;
  paramId: any;
  isEdit: boolean = false;
  ngOnInit(): void {
    console.log(this.router.url.includes('edit-user'));
    if (this.router.url.includes('edit-user')) {
      this.route.params.subscribe((param) => {
        this.paramId = param['id'];
        this.isEdit = true;
        this.common.getUserByEmployeeId(this.paramId).subscribe({
          next: (value: any) => {
            this.data = value.data[0];
            this.updateUserForm.patchValue(this.data);
          },
          error: (err: any) => {},
        });
      });
    }
  }
  updateUserForm = this.builder.group({
    player_name: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    psc: this.builder.control(''),
    employeeId: this.builder.control(''),
    department: this.builder.control(''),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });
  addUserForm = this.builder.group({
    playerName: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    psc: this.builder.control(''),
    dept: this.builder.control(''),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });
  updateUser() {
    console.log(this.updateUserForm.value);
    if (this.updateUserForm.valid) {
      this.common.updateEmployee(this.updateUserForm.value).subscribe({
        next: (value: any) => {
          console.log(value);
          this.toastr.success('User added successfully');
          this.router.navigate(['']);
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(err.error.error);
          console.log(err.error.error);
        },
      });
    } else {
      this.toastr.warning('Enter valid inputs.');
    }
  }
  addUser() {
    if (this.addUserForm.valid) {
      this.common.postUser(this.addUserForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success('User added successfully');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.error);
          console.log(err.error.error);
        },
      });
    } else {
      const invalid = [];
      const controls = this.addUserForm.controls;
      for (let name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
          console.log(controls);
        }
      }
      this.toastr.warning('Enter valid inputs.');
    }
  }
}
