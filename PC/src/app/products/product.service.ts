import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
private productURL = 'api/products/products.json';

constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
       return this.http.get<IProduct[]>(this.productURL).pipe(catchError(this.handleError));
    }

    getProductById(id: number): Observable<IProduct | undefined> {
      return this.getProducts()
        .pipe(
          map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }
  private handleError(err: HttpErrorResponse) {
    let errorMsg = '';
    if (err.error instanceof ErrorEvent){
      errorMsg = `An error occured: ${err.error.message}`;
    }else {
      errorMsg = `Server returned code: ${err.status}, error message: ${err.message}`;
    }
    return throwError(errorMsg);
  }
}
