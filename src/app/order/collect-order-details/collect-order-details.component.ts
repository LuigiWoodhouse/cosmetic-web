import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LingerieShopService } from '../../services/lingerie-shop.service';
import { UtilService } from '../../services/util.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputSanitizationService } from '../../services/input-sanitization.service';
import { MatDialogModule } from '@angular/material/dialog';
import { GuestOrder } from '../../helpers/order';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-collect-order-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './collect-order-details.component.html',
  styleUrl: './collect-order-details.component.scss'
})
export class CollectOrderDetailsComponent {

  constructor(
    private lingerieShopService: LingerieShopService,
    private utilService: UtilService,
    public inputSanitization: InputSanitizationService,
    private orderService: OrderService,) { }

  customerDetailsFormGroup!: UntypedFormGroup
  customerDetailsControl = new UntypedFormControl('', [Validators.required])
  public cartItemList: any = []
  grandTotal!: number
  createOrder: GuestOrder = new GuestOrder()
  loadingAnimation = false
  displayOrderDetails: any
  orderDetails: any
  orderPlaced = false
  orderError = false

  public fetchItemList(): void {
    this.lingerieShopService.getProducts()
      .subscribe((res: any) => {
        this.cartItemList = this.lingerieShopService.cartItemList
        this.grandTotal = this.lingerieShopService.getTotalPrice()
      })
  }


  public createGuestCustomerOrder(): void {
    this.loadingAnimation = true

    // Directly use the cartItemList since it directly contains the items
    const flatItems = this.cartItemList || [] // Make sure it defaults to an empty array if undefined

    // Extract form values
    const formValues = this.customerDetailsFormGroup.value

    const newOrder: GuestOrder = {
      ...this.orderDetails,
      items: flatItems, // Use flatItems directly since each item in cartItemList is what you need
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      shippingAddress: formValues.shippingAddress,
      phoneNumber: formValues.phoneNumber,
    };

    this.orderService.makeGuestOrder(newOrder).subscribe({
      next: (data: any) => {
        this.orderPlaced = true
        this.displayOrderDetails = data
        localStorage.removeItem("cartItems")
        this.loadingAnimation = false
        this.orderError = false
      },
      error: (error) => {
        this.loadingAnimation = false
        this.orderPlaced = false
        this.orderError = true
      }
    });
  }

  ngOnInit(): void {
    this.utilService.generateQuantities()
    this.fetchItemList()
    this.lingerieShopService.loadCartItemsFromLocalStorage()
    this.customerDetailsFormGroup = new UntypedFormGroup({
      'firstName': new UntypedFormControl(null, Validators.required),
      'lastName': new UntypedFormControl(null, Validators.required),
      'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new UntypedFormControl(null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      'shippingAddress': new UntypedFormControl(null, Validators.required)
    })
  }
}
