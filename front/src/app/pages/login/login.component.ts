import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  loginForm:FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private _auth:AuthService, private _router:Router ) { }

  ngOnInit(): void {
  }

  login(){
    this._auth.login(this.loginForm.value).subscribe(
      (res)=>{
        const token = res.data.token
        if(token) localStorage.setItem('userToken', token)
      },
      (err)=>{
      },
      ()=>{
        this._auth.myProfile().subscribe(
          (data)=>{
            this._auth.isLogin = true
            this._auth.user = data.data
          },
          (err)=>{
            this._auth.isLogin = false
            this._auth.user = null
            console.log(err)
          },
          ()=>{
            this._router.navigateByUrl('/')
          }
        )
      }
    )
  }

}
