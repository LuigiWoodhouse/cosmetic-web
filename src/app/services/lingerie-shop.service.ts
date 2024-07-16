import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LingerieShopService {

  constructor() { }

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([])
  public grandTotal: number = 0
  cartItemCount: number = 0
  cartItems:any
  private itemListSource = new BehaviorSubject<any[]>([])
  itemList$ = this.itemListSource.asObservable();

  //items in cart
  getProducts() {
    return this.productList.asObservable();
  }

  addItem(product: any) {
    const { 
      imageData, 
      imageName, 
      imageType, 
      description, 
      dateAdded, 
      ...productWithoutImages 
    } = product
  
    const existingItem = this.cartItemList.find((item: { itemId: any; selectedSize: any; }) => 
      item.itemId === product.itemId && item.selectedSize === product.selectedSize
    )

    if (!existingItem) {
      // Item doesn't exist in the cart, so add it
      this.cartItemList.push(productWithoutImages);
    } 
    else {
      // Item already exists in the cart, update the quantity
      existingItem.quantity = product.quantity;
    }
  
    this.updateGrandTotal(); // Recalculate the grand total
    this.productList.next(this.cartItemList)
  
    this.saveCartItems()
    // Update cart item count
    this.cartItemCount = this.cartItemList.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0)
    return this.cartItemList
  }
  
  saveCartItems() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItemList))
  }

  resetCartState(): void {
    this.cartItemList = []
    this.updateGrandTotal()
    this.productList.next(this.cartItemList)
  }
  

  updateGrandTotal() {
    let total = 0
    for (const item of this.cartItemList) {
      total += this.getSubtotal(item)
    }
    this.grandTotal = total
  }

  getSubtotal(cartItemList: any): number {
    return cartItemList.price * cartItemList.quantity
  }

  getTotalPrice(): number {
    this.updateGrandTotal()
    return this.grandTotal
  }

  removeCartItem(index: number) {
    this.cartItemList.splice(index, 1)
    this.productList.next(this.cartItemList)
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList))
  }

  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList)
    localStorage.removeItem('cartItems')
  }

  public loadCartItemsFromLocalStorage() {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      return this.cartItemList = JSON.parse(cartItems)
    }
  }
}