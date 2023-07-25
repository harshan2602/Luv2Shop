import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',

  //templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryID: number = 1;
  previousCategoryId: number = 1;
  searchMode : boolean = false;

  // NEW PROPERTIES FOR PAGINATION

  thePageNumber : number = 1;
  thePageSize : number = 5;
  theTotalElements : number = 0;
  
  previousKeyword : string = "";

  constructor(private  productService: ProductService,
    private cartService: CartService,
              private route : ActivatedRoute ){ }

  ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
      this.listProducts();
      });
  }
  
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    
    else{
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const thekeyword:string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a diffrent keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != thekeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = thekeyword;

    console.log(`keyword=${thekeyword}, thePageNumber=${this.thePageNumber}`)

    //now search for the product using keyword
    this.productService.searchProductsPaginate(this.thePageNumber -1,
                                               this.thePageSize,
                                               thekeyword).subscribe(this.processResult());
      
  }
  

  handleListProducts(){

     //check if 'id' parameter is available 
     const hasCategoryID : boolean = this.route.snapshot.paramMap.has('id')

     if(hasCategoryID){
       // get the "id" param string . convert string to a number using the '+' symbol.
       this.currentCategoryID = +this.route.snapshot.paramMap.get('id')!;
     }
     else{
       // not category "id" available then.....default category "id" set to 1, you can set to any category "id".
       this.currentCategoryID = 1;
     }


     //
     // CHECK IF WE HAVE A DIFFRENT CATEGORY THAN PREVIOUS 
     // NOTE : ANGULAR WILL REUSE THE COMPONENT IF IT IS CURRENTLY BEING VIEWED
     //

     // IF WE HAVE A DIFFRENT CATEGORY THEN PREVIOUS 
     // THAN SET thePageNumber BACK TO 1
     if (this.previousCategoryId != this.currentCategoryID){
      this.thePageNumber = 1;
     }

     this.previousCategoryId = this.currentCategoryID;

     console.log(`currentCategoryId=${this.currentCategoryID}, thePageNumber=${this.thePageNumber}`);

     //now get the products for the given category id:
     this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryID)
                                                .subscribe( this.processResult());
                                                  
                                                

     }

     updatePageSize(pageSize : string){
        this.thePageSize = +pageSize;
        this.thePageNumber = 1;
        this.listProducts();
     }


     processResult(){
      return (data:any) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      };
     } 

     addToCart(theProduct: Product) {
    
      console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
  
      // TODO ... do the real work
      const theCartItem = new CartItem(theProduct);
  
      this.cartService.addToCart(theCartItem);
    }
  
  }