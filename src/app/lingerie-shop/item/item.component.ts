import { Component } from '@angular/core';
import { PageRouteService } from '../../services/page-route.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LingerieShopService } from '../../services/lingerie-shop.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { UtilService } from '../../services/util.service';
import { environment } from '../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule,
    MatButtonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  constructor(
    private lingerieShopService: LingerieShopService,
    private itemService: ItemService,
    private pageRoute: PageRouteService,
    public utilService: UtilService,
    private snackBar: MatSnackBar
  ) {
    this.loadingShopAnimation = true
    this.productList = []
    this.filterProductList = []
  }

  filterSelectedItem: string = ''
  productList: any;
  filterProductList: any
  itemId: any;
  cartItemCount: any
  quantity: any = 1;
  loadingShopAnimation = true;
  BASE_URL = environment.apiUrl
  imageUrl = this.BASE_URL + '/lingerie/display/'
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loadingImage = true

  updateCartIconItemCount() {
    // User is not logged in, set cartItemCount to 0
    this.lingerieShopService.getProducts().subscribe(data => {
      // Update cart item count in the cart icon after loading cart items
      this.cartItemCount = this.lingerieShopService.cartItemList.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
    })
  }

  public goToCart() {
      this.lingerieShopService.cartItemList
      this.pageRoute.goToGuestPlaceOrderPage()
  }

  fetchPetAccessoryList() {
    const cachedProductList = localStorage.getItem('shop');

    if (cachedProductList) {
      // Use cached data from localStorage
      this.productList = JSON.parse(cachedProductList);
      this.filterProductList = this.productList;
      this.loadingShopAnimation = false;
    } else {
      // Simulate a delay using setTimeout
      setTimeout(() => {
        this.itemService.getALLItems()
          .subscribe(data => {
            this.productList = data;
            this.productList = this.productList.data;
            this.filterProductList = this.productList;
            this.productList.forEach((a: any) => {
              Object.assign(a, { quantity: 1, total: a.price });
            });
            this.loadingShopAnimation = false; // Set loading to false after the data is loaded

            // Store data in localStorage for persistence
            localStorage.setItem('shop', JSON.stringify(this.productList));
          })
      }, 1000) // Simulate a 1-second delay using setTimeout
    }
  }

  filterPetAccessoryCategory(category: string) {
    this.filterSelectedItem = category;

    if (category === '') {
      this.filterProductList = this.productList;
    } else {
      this.filterProductList = this.productList.filter(
        (a: any) => a.category === category
      );
    }
  }
  addtocart(row: any) {
    this.lingerieShopService.addItem(row);
  }

  removeFromCart(row: any) {
    this.lingerieShopService.removeCartItem(row);
  }

  public openSnackBar() {
    this.snackBar.open('Copied successfully', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public getImageUrl(itemId: string): string {
    this.loadingImage = false
    return this.imageUrl + itemId;
  }

  ngOnInit(): void {
    this.getImageUrl(this.itemId)
    this.lingerieShopService.loadCartItemsFromLocalStorage()
    this.updateCartIconItemCount()
    this.fetchPetAccessoryList()
  }
}