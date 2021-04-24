import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { isNumber } from 'util';
import { IProfile } from '../shared/models/models';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public allergies = "No allergies";
  public bloodPressure = "No blood pressure issues";
  public testTaken = false;
  public heightString = 0;
  public heightInt = 0;
  public weightString = 0;
  public weightInt = 0; 
  public overAllBodyTest =0;
  private user_id=0;
  private profile: IProfile;

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.user_id = Number(localStorage.getItem('userId'));
      this.getProfile();
    }
  }

  getProfile(){
    this.provider.accessProfile(this.user_id).then(res=>{
      this.profile = res;
    })
  }

  checkInputs(height: string, weight: string){
    if(typeof(isNumber(height)) =='number' && typeof(isNumber(weight+0))=='number'){
      return true;
    }
    else{
      return false;
    }
  }

  setAllergies(htmlId: string){
    this.allergies = document.getElementById(htmlId).className;
    // console.log(this.allergies)
  }

  takeTest(){
    // if(this.checkInputs(this.heightString,this.weightString)){
    //   this.weightInt = Number(this.weightString);
    //   this.heightInt = Number(this.heightString)/100;
    //   this.overAllBodyTest = (this.weightInt/this.heightInt)/this.heightInt;
    // }
    if(this.heightString <=0 || this.weightString <=0 || this.allergies =='' || this.bloodPressure ==''){
      window.alert('Incorrect parameters')
    }
    else{
      this.heightString = this.heightString/100;
      this.overAllBodyTest = (this.weightString/this.heightString/this.heightString)
      this.testTaken = true;
      this.provider.takeaTest(this.user_id, this.overAllBodyTest, this.allergies, this.bloodPressure, this.profile).then(res=>{})
    }
    
    // console.log(this.weightInt)
    // console.log(Number('asdfsdf'))
    // console.log(this.weightString)
    // console.log(this.heightString)
    // console.log(this.overAllBodyTest)
    // console.log(this.bloodPressure)
    // console.log(this.allergies)
    // console.log(this.checkInputs(this.heightString,this.weightString))
    // console.log(typeof(Number(this.weightString)))
  }

  takeTestAgain(){
    this.testTaken = false;
    this.weightString = 0;
    this.heightString = 0;
    this.bloodPressure = "";
    this.allergies = "";
  }

}
