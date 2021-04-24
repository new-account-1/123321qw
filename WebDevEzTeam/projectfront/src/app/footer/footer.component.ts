import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?){
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrHeight, this.scrWidth);
  }

  constructor() {
    this.getScreenSize();
   }

  ngOnInit() {
  }

}
