import { Component } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent {

  productCategories : ProductCategory[] = [];

  constructor(private productService : ProductService){ }

  ngOnInit(){
    this.listProductCategories();
  }
  listProductCategories() {
      this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categoriees = ' + JSON.stringify(data) );
        this.productCategories = data;
      }
    );  
  }
}