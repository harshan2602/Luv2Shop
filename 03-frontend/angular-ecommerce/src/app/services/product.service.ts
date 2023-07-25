import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  


  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product-category";
  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number) : Observable<Product> {
    
    // NEED TO BUILD A URL BASED ON PRODUCT ID
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,  
                         theCategoryID: number): Observable<GetResponseProducts> {

    // NEED TO BUILD A URL BASED ON CATEGORY ID, PAGE AND SIZE
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryID}`
                       +`&page=${thePage}&size=${thePageSize}` ;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryID: number): Observable<Product[]> {

    // NEED TO BUILD A URL BASED ON CATEGORY ID
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryID}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(thekeyword: string): Observable<Product[]> {

    // NEED TO BUILD A URL BASED ON KEYWORD
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`;

    return this.getProducts(searchUrl);
  }



  searchProductsPaginate(thePage: number,
                         thePageSize: number,  
                         thekeyword: string): Observable<GetResponseProducts> {

    // NEED TO BUILD A URL BASED ON KEYWORD, PAGE AND SIZE
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`
                       + `&page=${thePage}&size=${thePageSize}` ;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }




  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size : number,
    totalElements : number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
