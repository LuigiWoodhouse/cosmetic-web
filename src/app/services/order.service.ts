import { Injectable } from '@angular/core';
import { GuestOrder } from '../helpers/order';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient) { }

  BASE_URL = environment.apiUrl
  userId!:any

  private orderDetailsSource = new BehaviorSubject<any>(null)
  orderDetails$ = this.orderDetailsSource.asObservable()

  private orderPlaced = new BehaviorSubject<any>(null)
  orderPlaced$ = this.orderPlaced.asObservable()

  makeGuestOrder(order: GuestOrder):Observable<Object>{
    return this.http.post(`${this.BASE_URL}/order/lingerie/make/new/guest`, order)
  }

  setOrderDetails(orderDetails: any) {
    this.orderDetailsSource.next(orderDetails)
  }

  setOrderPlaced(orderPlaced: any) {
    this.orderPlaced.next(orderPlaced)
  }
}