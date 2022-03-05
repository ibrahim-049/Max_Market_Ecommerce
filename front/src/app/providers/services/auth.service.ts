import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogin:boolean = false
  public user:any = null
  
  constructor(private _http:HttpClient) { }

  register(data:any):Observable<any>{
    return this._http.post('http://localhost:5000/api/user/register', data)
  }
  getAllProducts():Observable<any>{
    return this._http.get('http://localhost:5000/api/product/all')
  }
  getSingleProduct(id:any):Observable<any>{
    return this._http.get(`http://localhost:5000/api/product/${id}`)
  }
  login(data:any):Observable<any>{
    return this._http.post('http://localhost:5000/api/user/login', data)
  }
  myProfile():Observable<any>{
    return this._http.get('http://localhost:5000/api/user/show/myProfile')
  }
  logout():Observable<any>{
    return this._http.get('http://localhost:5000/api/user/logout')
  }
}
