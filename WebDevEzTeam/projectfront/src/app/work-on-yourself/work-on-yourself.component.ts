import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-on-yourself',
  templateUrl: './work-on-yourself.component.html',
  styleUrls: ['./work-on-yourself.component.css']
})
export class WorkOnYourselfComponent implements OnInit {

  constructor() { }
  
  public username = '';
  public logged = false;

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.logged = true;
      this.username = localStorage.getItem('userName');
    }
  }

}
