import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'product detail' ;
  product: IProduct;
  errorMsg = '';
  constructor(private route: ActivatedRoute, private router: Router, private service: ProductService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param){
      const id = +param;
      this.getProduct(id);
    }
}
    getProduct(id: number) {
      this.service.getProductById(id).subscribe({
        next: product => this.product = product,
        error: err => this.errorMsg = err
      });
    }
onBack() {
    this.router.navigate(['/products']);
  }
}
