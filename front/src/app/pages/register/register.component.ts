import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
  }
  handleRegister(registerForm:NgForm):void{
    if(registerForm.valid){
      this._auth.register(registerForm.value).subscribe(
      (data) =>{
        console.log(data)
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
        registerForm.resetForm()
        
      }
      )
    }
  }
}
