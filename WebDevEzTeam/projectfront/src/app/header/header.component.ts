import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { HostListener } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?){
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrHeight, this.scrWidth);
  }

  public logged = false;
  private userName = "";
  private isadmin = false;
  private issuperuser = "";
  constructor(private provider: ProviderService) { 
    this.getScreenSize();
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isadmin = false;
    this.userName = "";
    if(token){
      this.logged = true;
      this.userName = localStorage.getItem('userName');
      this.issuperuser = localStorage.getItem('superUser');
    }
    if(this.issuperuser =="true"){
      this.isadmin = true;
    }
  }

  logout(){
    this.provider.logout();
    localStorage.clear();
  }
}