import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-start-lesson',
  templateUrl: './start-lesson.component.html',
  styleUrls: ['./start-lesson.component.css']
})
export class StartLessonComponent implements OnInit {
  levelId;
  constructor(    
    private common: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog){
  }
  ngOnInit(): void {
   // this.dialog.open(ModalComponent);
    this.route.paramMap.subscribe(params => {
      this.levelId= params.get('id');      
    })

  }
  dismissLoading(){
    this.dialog.closeAll();
  }

}

