import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IProduct} from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  cartSubject = new Subject();

  constructor() {
  }

  addProduct(product: IProduct): void {
    this.cartSubject.next(product);
  }

  getAddProductNotification(): Observable<any> {
    return this.cartSubject.asObservable();
  }
}
