import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { single } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/providers/services/auth.service';
@Component({
  selector: 'app-singel-product',
  templateUrl: './singel-product.component.html',
  styleUrls: ['./singel-product.component.css']
})
export class SingelProductComponent implements OnInit {
  id:any
  product:any
  isLoaded = false
  constructor(private _route:ActivatedRoute, private _auth:AuthService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params?.['id']


    this.singleProduct(this.id)
  }

  singleProduct(id:any):void{
    this._auth.getSingleProduct(id).subscribe((res)=>{
      this.product = res.data
      console.log(res)
    },
    (err)=>{

    },
    ()=>{
      this.isLoaded = true
    })
  }

}
