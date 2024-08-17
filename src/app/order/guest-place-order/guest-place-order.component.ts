import { Component, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InputSanitizationService } from '../../services/input-sanitization.service';
import { UtilService } from '../../services/util.service';
import { LingerieShopService } from '../../services/lingerie-shop.service';
import { environment } from '../../../environments/environment';
import { PageRouteService } from '../../services/page-route.service';
import { NotificationService } from '../../services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from '../../footer/footer.component';
import { CollectOrderDetailsComponent } from '../collect-order-details/collect-order-details.component';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-guest-place-order',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    FooterComponent,
    MatButtonModule],
  templateUrl: './guest-place-order.component.html',
  styleUrl: './guest-place-order.component.scss'
})
export class GuestPlaceOrderComponent {

  constructor(
    public pageRouteService: PageRouteService,
    public dialog: MatDialog,
    private lingerieShopService: LingerieShopService,
    private notificationService: NotificationService,
    public inputSanitization: InputSanitizationService,
    public utilService: UtilService,
    private orderService:OrderService) { }

  @ViewChild('errorContent') errorContent!: TemplateRef<any>
  placeOrderFormGroup!: FormGroup
  BASE_URL = environment.apiUrl
  imageUrl = this.BASE_URL + '/shop/display/'
  public cartItemList: any = []
  grandTotal!: number
  orderPlaced: boolean = false
  errorMessage: string | null = null
  displayOrderDetails: any
  loadingAnimation = false
  orderError = false
  customerDetailsFormGroup!: UntypedFormGroup
  customerDetailsControl = new UntypedFormControl('', [Validators.required])
  orderDetails: any

  validateQuantity(item: { quantity: number; stock: number; price: number; errorMessage: string | null }): void {
    if (item.stock <= 5 && item.quantity > item.stock) {
      item.errorMessage = 'Cannot increase quantity anymore as available stock is exceeded. Grand Total not changed'
    } else {
      item.errorMessage = null;
      this.updateGrandTotal();
    }
  }

  public updateGrandTotal(): void {
    let total = 0
    this.cartItemList.forEach((item: { price: number; quantity: number; stock: number; }) => {
      if (item.stock > 5 || item.quantity <= item.stock) {
        total += item.price * item.quantity
      }
    });
    this.grandTotal = total
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList))
  }


  public removeItem(petAccessoryId: any): void {
    this.lingerieShopService.removeCartItem(petAccessoryId)
    this.notificationService.itemRemovedFromCart()
  }

  public emptycart() {
    this.lingerieShopService.removeAllCart();
    this.notificationService.emptyCart()
  }


  public fetchItemList(): void {
    this.lingerieShopService.getProducts()
      .subscribe((res: any) => {
        this.cartItemList = this.lingerieShopService.cartItemList
        this.grandTotal = this.lingerieShopService.getTotalPrice()
      })
  }

  public openCollecOrderDetailsDialog(): void {
    const dialogRef = this.dialog.open(CollectOrderDetailsComponent, {
      disableClose: true // Disable closing by clicking outside the dialog
    });
  }

  ngOnInit(): void {
    this.utilService.generateQuantities()
    this.lingerieShopService.loadCartItemsFromLocalStorage()
    this.fetchItemList()
    this.orderService.orderDetails$.subscribe(orderDetails => {
      this.displayOrderDetails = orderDetails
    })
    this.orderService.orderPlaced$.subscribe(orderPlaced => {
      this.orderPlaced = orderPlaced
    })
    this.customerDetailsFormGroup = new UntypedFormGroup({
      'firstName': new UntypedFormControl(null, Validators.required),
      'lastName': new UntypedFormControl(null, Validators.required),
      'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new UntypedFormControl(null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      'shippingAddress': new UntypedFormControl(null, Validators.required)
    })
  }
}
