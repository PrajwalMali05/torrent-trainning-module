import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }
     apiUrl="http://localhost:5005/api";
   // apiUrl="http://172.16.0.45:5005/api";
    
    getAllUser(){
      return this.http.get(this.apiUrl);
    }
    getUserById(id:any){
      return this.http.get(this.apiUrl+'/users/'+id);
    }
    getUserByEmployeeId(id:any){
      return this.http.get(this.apiUrl+'/byemp/'+id);
    }
    postUser(user:any){
      user.role="employee"
      return this.http.post(this.apiUrl+'/users',user);
    }
    updateUser(id:any, user:any){
      return this.http.put(this.apiUrl+'/'+id,user);
    }
    isLoggedIn(){
      return (sessionStorage.getItem('employeeId')!=null || localStorage.getItem('employeeId')!=null );
    }
    loggin(user:any){
      return this.http.post(this.apiUrl+'/sign_in', user);
    }
    changePassword(cred: any){
      return this.http.post(this.apiUrl+'/forgot-password', cred);
    }
    getAllEmployees(){
      return this.http.get(this.apiUrl+'/get-employees');
    }
    updateEmployee(user:any){
      return this.http.put(this.apiUrl+'/users/'+user.id, user);
    }
}
