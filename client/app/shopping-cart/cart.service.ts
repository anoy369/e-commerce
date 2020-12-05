import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ICartItem} from '../shared/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  getCartItems(): ICartItem[] {
    return JSON.parse(localStorage.getItem('cartItems'));
  }

  addProductToCart(cartItem: ICartItem): ICartItem[] {
    let currentCart: ICartItem[] = JSON.parse(localStorage.getItem('cartItems'));
    if (!currentCart) {
      currentCart = [];
    }
    currentCart.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(currentCart));

    return currentCart;
  }

  calculateCartTotal(cartItems: ICartItem[]): number {
    let cartTotal = 0;
    cartItems.forEach(item => {
      cartTotal += (item.quantity * item.productPrice);
    });

    return cartTotal;
  }

  updateCart(updatedCartItem: ICartItem): void {
    const currentCart: ICartItem[] = JSON.parse(localStorage.getItem('cartItems'));

    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].id === updatedCartItem.id) {
        currentCart[i] = updatedCartItem;
      }
    }

    localStorage.setItem('cartItems', JSON.stringify(currentCart));
  }

  removeCartItem(cartItem: ICartItem): void {
    const currentCart: ICartItem[] = JSON.parse(localStorage.getItem('cartItems'));

    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].id === cartItem.id) {
        currentCart.splice(i, 1);
      }
    }

    localStorage.setItem('cartItems', JSON.stringify(currentCart));
  }
}