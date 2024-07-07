import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageRouteService {

  constructor(private router: Router) { }

  goToGuestPlaceOrderPage() : void {
    this.router.navigate(['/cart/guest-place-order'])
  }

  goBackToShop() : void {
    this.router.navigate(['/home'])
  }
}