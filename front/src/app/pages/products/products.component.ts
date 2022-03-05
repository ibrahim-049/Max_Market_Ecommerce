import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[] =[]
  isLoaded:boolean=false
  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    


    this.allProducts()
  }

  allProducts():void {
    this._auth.getAllProducts().subscribe(
      (res)=>{
        this.products = res.data
      },
      (err)=>{
        
      },
      ()=>{
        this.isLoaded = true
      }
    )
  }
}
