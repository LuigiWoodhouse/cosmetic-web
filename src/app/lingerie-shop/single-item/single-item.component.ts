import { Component } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { FooterComponent } from '../../footer/footer.component';
import { ItemService } from '../../services/item.service';
import { LingerieShopService } from '../../services/lingerie-shop.service';
import { PageRouteService } from '../../services/page-route.service';
import { UtilService } from '../../services/util.service';
import { NotificationService } from '../../services/notification.service';


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
    private itemService: ItemService,
    public notificationService: NotificationService
  ) { }

  itemId!: any
  item: any
  BASE_URL = environment.apiUrl
  imageUrl = this.BASE_URL + '/lingerie/display/'
  cartItemCount: any
  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  descriptionList!: string[]
  selectedSize!: string
  currentImageIndex: number = 0
  totalImages!: number

  public nextImage(): void {
    if (this.currentImageIndex < this.totalImages - 1) {
      this.currentImageIndex++;
    }
  }

  public previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--
    }
  }

  public fetchTotalImages(itemId: string): void {
    this.itemService.getTotalImages(itemId).subscribe(
      (total: number) => {
        this.totalImages = total
      },
      (error) => {
        this.notificationService.imageListError()
      }
    );
  }

  public updateCartIconItemCount(): void {
    this.lingerShopService.getProducts().subscribe(data => {
      this.cartItemCount = this.lingerShopService.cartItemList.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
    })
  }

  public goToCart(): void {
    this.lingerShopService.cartItemList
    this.pageRoute.goToGuestPlaceOrderPage()
  }
  public addItemToCart(row: any): void {
    this.lingerShopService.addItem(row)
    this.updateCartIconItemCount()
    this.notificationService.itemAddedToCart()
  }

  public increaseQuantity(): void {
    this.item.quantity++
  }

  public decreaseQuantity(): void {
    this.item.quantity = Math.max(this.item.quantity - 1, 1)
  }

  public fetchItemById(itemId: string): void {
    this.itemService.fetchItemById(this.itemId).subscribe(item => {
      if (item) {
        this.item = item
        this.item = this.item.data
        this.descriptionList = this.item.description.split('\n').map((desc: string) => desc.trim())
      }
      else {
        this.notificationService.itemNotFound()
        this.pageRoute.goBackToShop()
      }
    })
  }

  ngOnInit(): void {
    this.lingerShopService.loadCartItemsFromLocalStorage()
    this.updateCartIconItemCount();
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('itemId')
      if (this.itemId) {
        this.fetchItemById(this.itemId)
        this.fetchTotalImages(this.itemId)
      }
      else {
        this.notificationService.itemNotFound()
      }
    })
  }
}