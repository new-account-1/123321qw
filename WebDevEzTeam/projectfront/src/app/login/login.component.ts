import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public is_admin = false;
  public logged = false;
  public login: any ="";
  public password: any ="";
  public userId = 0;
  public userName = "";
  public errorMessage = '';

  message: boolean = this.logged;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.logged = true;
      this.userName = localStorage.getItem('userName');
    }
  }

 
  auth(){
    if((this.login !=='') && this.password !==''){
      this.provider.login(this.login, this.password).then(res=>{
        this.logged = true;
        localStorage.setItem('token', res.token);
        //localStorage.setItem('userId',res.user_id.toString());
        localStorage.setItem('userName', this.login);
        //localStorage.setItem('superUser', res.is_superuser);
        window.location.reload();
      }).catch(function(response){
        console.log(response.data)
      });
    }
    else{
      window.alert('Please write all required data in correct format!')
    }
  }

  // logout(){
  //   this.provider.logout().then(res=>{
  //     localStorage.clear();
  //     this.logged = false;
  //   })
  // }
}