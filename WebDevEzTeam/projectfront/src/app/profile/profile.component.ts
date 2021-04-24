import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { HostListener } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private provider: ProviderService) { 
    this.getScreenSize();
  }

  private user_id = 0;
  public firstName = "";
  public secondName="";
  public taskCount=0;
  public overallBodyTest=0;
  public allergies="";
  public bloodPressure="";

  public updateUserProfile = false;

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?){
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrHeight, this.scrWidth);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.user_id = Number(localStorage.getItem('userId'));
    }
    this.watchMyProfile(this.user_id)
    // console.log(this.user_id)
    // console.log(this.firstName)
  }

  showProfile(){
    this.updateUserProfile = !this.updateUserProfile;
  }

  watchMyProfile(userId){
    this.provider.accessProfile(userId).then(res=>{
      this.firstName = res.first_name;
      this.secondName = res.second_name;
      this.taskCount = res.task_count;
      this.overallBodyTest = res.overall_body_test;
      this.allergies = res.allergies;
      this.bloodPressure = res.blood_pressure;
    })
  }

  saveProfile(userId){
    this.provider.changeProfile(userId, this.firstName,
    this.secondName,this.taskCount,this.overallBodyTest,
    this.allergies,this.bloodPressure).then(res=>{
      this.firstName = res.first_name;
      this.secondName = res.second_name;
      this.taskCount = res.task_count;
      this.overallBodyTest = res.overall_body_test;
      this.allergies = res.allergies;
      this.bloodPressure = res.blood_pressure;
    })
  }
}
