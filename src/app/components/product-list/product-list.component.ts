import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //properties for pagination
  pageNumber: number = 1;
  pageSize: number = 18;
  totalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const keywordInput: string = this.route.snapshot.paramMap.get('keyword')!;

    //if  we have a different keyword than the previous
    //then set pagenumber to 1
    if (this.previousKeyword != keywordInput) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keywordInput;
    console.log(`keyword=${keywordInput}, pageNumber=${this.pageNumber}`);

    //now search for the products using the keyword
    this.productService.searchProductPaginate(this.pageNumber - 1,
      this.pageSize,
      keywordInput).subscribe(this.processResult());


  }


  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      //category id unavailable .. default to category id 1
      this.currentCategoryId = 1;
    }

    //handle pagination
    //check if there is a different category than previous
    //Angular reuses a component if it is currently being viewed
    // if we have a different category id than previous
    //then reset page number to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    //get the products for the given category id
    this.productService.getProductListPaginate(this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId)
      .subscribe(
        this.processResult()
      );
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageSize = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  addToCart(product: Product){
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);

    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }

}


