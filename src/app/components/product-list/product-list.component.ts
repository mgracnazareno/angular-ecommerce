import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean= false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    });
  }

    


    listProducts() {
      this.searchMode = this.route.snapshot.paramMap.has('keyword');
      if(this.searchMode){
        this.handleSearchProducts();
      }else {
        this.handleListProducts();
      }
     
    }
    
    handleSearchProducts() {
      const keywordInput: string = this.route.snapshot.paramMap.get('keyword')!;

      //now search for the products using the keyword
      this.productService.searchProducts(keywordInput).subscribe(
        data=> {
          this.products = data;
        })
    }

  
    handleListProducts(){
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
      if (hasCategoryId) {
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      }else {
        //category id unavailable .. default to category id 1
        this.currentCategoryId = 1;
      }
      //get the products for the given category id
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
    )
  }
}
    
