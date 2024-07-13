import { Injectable } from '@angular/core';
import { GuestOrder } from '../helpers/order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient) { }

  BASE_URL = environment.apiUrl
  userId!:any


  makeGuestOrder(order: GuestOrder):Observable<Object>{
    return this.http.post(`${this.BASE_URL}/order/make/new/guest`, order)
  }
}