import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  

  constructor(
    private http: HttpClient
  ) { }
  // apiUrl="http://172.16.0.45:5005/api";
  apiUrl="http://localhost:5005/api";
  getAllCourses(){
    return this.http.get(this.apiUrl+'/get-all-course');
  }
  postCourse(course: any){
    return this.http.post(this.apiUrl+'/assign-course', course);
  }
  getAllLessons(){
    return this.http.get(this.apiUrl+'/get-all-lessons');
  }
  addCourse(course: any){
    return this.http.post(this.apiUrl+'/add-course', course);
  }
  updateCourse(id: any, value:any) {
    return this.http.put(this.apiUrl+`/update-course/${id}`, value);
  }  
  updateLesson(id: any, value:any) {
    return this.http.put(this.apiUrl+`/update-lesson/${id}`, value);
  }
  addLesson(lesson:any){
    return this.http.post(this.apiUrl+'/add-lesson', lesson);    
  }
  deleteCourse(id:number){
   return this.http.delete(this.apiUrl+`/delete-course/${id}`);
  }
  deleteLesson(id:number){
    return this.http.delete(this.apiUrl+`/delete-lesson/${id}`);
   }
   getUserLesson(id:number){
    return this.http.get(this.apiUrl+`/get-user-lesson/${id}`);
   }

   setStatusInProgress(id:any,l_c_id:any){
    return this.http.put(this.apiUrl+`/set-status-inprogress/${id}`,{'id':id,'l_c_id':l_c_id})
   }

   getCourse(id:any){
    return this.http.get(this.apiUrl+'/get-course/'+id);
   }
   getLesson(id:any){
    return this.http.get(this.apiUrl+'/get-lesson/'+id);
   }

   getSingleLessonEmpId(empId:any){
    return this.http.get(this.apiUrl+`/get-lesson-list/${empId}`);
   }
   getCourseAnalytics(c_id:any){
    return this.http.get(this.apiUrl+`/course-analytics/${c_id}`);
   }
}
