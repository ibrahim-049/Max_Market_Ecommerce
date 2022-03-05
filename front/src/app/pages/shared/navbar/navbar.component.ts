import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _auth:AuthService, private _router:Router) {
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

  ngOnInit(): void {
  }

  logout(){
    this._auth.logout().subscribe(
      (res)=>{

      },
      (err)=>{

      },
      ()=>{
        this._auth.isLogin = false
        this._auth.user = null
        localStorage.removeItem('userToken')
        this._router.navigateByUrl("/login")
      }
    )
  }
}
