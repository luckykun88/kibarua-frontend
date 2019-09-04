import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService) { 
    document.body.id = "bg-gradient-primary";
  }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });


  login(frm){
    console.log(frm.value);
    this.auth.login(frm.value.email, frm.value.password);
    this.auth.getUserRole();
  }

  ngOnDestroy(){
    document.body.id = "";
  }

}
