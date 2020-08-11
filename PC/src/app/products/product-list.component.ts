import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    _filtervalue: string;
    errorMsg: string;
  get filtervalue(): string{
    return this._filtervalue;
}
set filtervalue(value: string){
   this._filtervalue = value;
   this.filteredData = this.filtervalue ? this.performFilter(this.filtervalue) : this.products;
}
    filteredData: IProduct[];
    products: IProduct[];
      toggleImage(): void{
        this.showImage = !this.showImage;
      }
ngOnInit(): void{
 this.productService.getProducts().subscribe({
   next: products => {
     this.products = products;
     this.filteredData = this.products;
   },
   error:  err => this.errorMsg = err
 });
}

constructor(private productService: ProductService) {
}
performFilter(filterBy: string): IProduct[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
onRatingClicked(message: string) {
  this.pageTitle = 'Product list :' + message;
}
}
