import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }
  durationMs = 3000 // 3 seconds
  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'

  public itemRemovedFromCart(): void {
    this._snackBar.open('Item removed from cart', 'X', {
      duration: this.durationMs,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  public emptyCart(): void {
    this._snackBar.open('Cart has been emptied', 'X', {
      duration: this.durationMs,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  public itemNotFound(): void {
    this._snackBar.open('Item not found', 'X', {
      duration: this.durationMs,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  public itemAddedToCart(): void {
    this._snackBar.open('Item added to cart', 'X', {
      duration: this.durationMs,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  public copy(): void {
    this._snackBar.open('Copied successfully', 'X', {
      duration: this.durationMs,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  public imageListError(): void {
    this._snackBar.open('Failed to display images', 'X', {
      duration: this.durationMs,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }
}