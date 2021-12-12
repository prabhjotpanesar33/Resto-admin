import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { DotpeService } from 'src/app/dotpe.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private auth: DotpeService,
    private router: Router) {}
  user: firebase.User;
  authError: any;
  loginUser = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',Validators.required)
  })

  get email() { return this.loginUser.get('email')}

  get password() { return this.loginUser.get('password') }




  ngOnInit() {

   // this.auth.currentUserObservable().subscribe( user =>{
     // this.user = user;
    //})
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data

    });

  }
  ngOnDestroy() {
  }
  onSubmit(){
    console.log(this.loginUser.value);

  }
  login(frm){
    this.auth.login(this.loginUser.value.email,this.loginUser.value.password  )
  }


}
