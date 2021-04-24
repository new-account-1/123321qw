import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  public login: any = "";
  public email: any = "";
  public password: string = "";
  public registered: boolean = false;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.registered = false;
  }

  checkInputs(email: string){
    let rexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return rexp.test(email)
  }

  register(){
    if(this.login !=="" && this.email !=="" && (this.password!=="" && this.password.length >= 8) && this.checkInputs(this.email)){
      this.provider.register(this.login, this.email, this.password).then(res=>{
        localStorage.setItem('token', res.token)
        localStorage.setItem('userId',res.user_id.toString());
        localStorage.setItem('userName', res.username);
        this.registered = true;
        // window.location.reload();
        window.location.href = "http://localhost:4200/";
      })
    }
    else{
      window.alert('Incorrect format of inputs. Please enter correct data!')
    }
  }

}
