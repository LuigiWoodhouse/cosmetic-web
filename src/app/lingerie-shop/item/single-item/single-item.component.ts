import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { PageRouteService } from '../../../services/page-route.service';
import { UtilService } from '../../../services/util.service';
import { LingerieShopService } from '../../../services/lingerie-shop.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-single-item',
  standalone: true,
  imports: [MatIconModule, CommonModule, FooterComponent, MatButtonModule, MatButtonToggleModule, FormsModule],
  templateUrl: './single-item.component.html',
  styleUrl: './single-item.component.scss'
})
export class SingleItemComponent {

  constructor(
    private route: ActivatedRoute,
    private lingerShopService: LingerieShopService,
    public pageRoute: PageRouteService,
    public utilService: UtilService,
    private snackBar: MatSnackBar,
    private itemService: ItemService
  ) { }

  itemId!: any
  item: any
  BASE_URL = environment.apiUrl
  imageUrl = this.BASE_URL + '/lingerie/display/'
  cartItemCount: any
  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  descriptionList!: string[]
  selectedSize: string = 'S'
  currentImageIndex: number = 0
  totalImages!: number

  nextImage() {
    if (this.currentImageIndex < this.totalImages - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  fetchTotalImages(itemId: string): void {
    this.itemService.getTotalImages(itemId).subscribe(
      (total: number) => {
        this.totalImages = total;
      },
      (error) => {
        console.error('Error fetching total images:', error);
      }
    );
  }

  openSnackBar() {
    this.snackBar.open('Copied successfully', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  updateCartIconItemCount() {
    this.lingerShopService.getProducts().subscribe(data => {
      this.cartItemCount = this.lingerShopService.cartItemList.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
    })
  }

  public goToCart() {
    this.lingerShopService.cartItemList
    this.pageRoute.goToGuestPlaceOrderPage()
  }
  addItemToCart(row: any) {
    this.lingerShopService.addItem(row)
    this.updateCartIconItemCount()
    //this.notificationService.itemAddedToCart()
  }

  increaseQuantity() {
    this.item.quantity++;
  }

  decreaseQuantity() {
    this.item.quantity = Math.max(this.item.quantity - 1, 1)
  }

  fetchItemById(itemId: string) {
    const selectedItem = this.item.find((item: any) => item.itemId === itemId);
    if (selectedItem) {
      this.item = selectedItem; // Assign the selected item to item
      // Ensure images is always an array
      this.item.images = this.item.images ? (Array.isArray(this.item.images) ? this.item.images : [this.item.images]) : [];
      // Handle the description
      this.descriptionList = this.item.description ? this.item.description.split('\n').map((desc: string) => desc.trim()) : [];
    }
    else {
      // Handle the case where the item with the provided ID is not found
      // this.notificationService.itemNotFound()
      this.pageRoute.goBackToShop();
    }
  }


  ngOnInit(): void {
    this.lingerShopService.loadCartItemsFromLocalStorage();
    this.updateCartIconItemCount();
    const storedCartItems = localStorage.getItem('shop');
    if (storedCartItems) {
      this.item = JSON.parse(storedCartItems);
      this.route.paramMap.subscribe(params => {
        this.itemId = params.get('itemId');
        if (this.itemId) {
          this.fetchItemById(this.itemId);
          this.fetchTotalImages(this.itemId);
        } else {
          console.error('Item ID is not provided in route parameters.');
        }
      });
    }
  }
}