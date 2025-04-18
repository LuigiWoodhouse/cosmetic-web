import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../helpers/item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  BASE_URL = environment.apiUrl
  userId!: any


  getALLItems(): Observable<Item[]>  {
    return this.http.get<Item[]>(`${this.BASE_URL}/shop/retrieve/all`)
  }

  getTotalImages(itemId: string): Observable<number> {
    const url = `${this.BASE_URL}/shop/display/total/${itemId}`
    return this.http.get<number>(url)
  }

  fetchItemById(itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.BASE_URL}/shop/item-details/${itemId}`)
  }
}