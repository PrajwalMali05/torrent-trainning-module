import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit {
  levelId;
  constructor(    
    private common: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog){
  }
  ngOnInit(): void {
    this.dialog.open(ModalComponent);
    this.route.paramMap.subscribe(params => {
      this.levelId= params.get('id');      
    })

  }
  dismissLoading(){
    this.dialog.closeAll();
  }

}
