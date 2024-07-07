import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  
  public scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  public copyText(text: string): void {

    // Create a temporary textarea element
    const tempInput = document.createElement('textarea')
    tempInput.value = text

    // Append the textarea element to the document
    document.body.appendChild(tempInput)

    // Select the text in the textarea
    tempInput.select();
    tempInput.setSelectionRange(0, 99999) // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy')

    // Remove the temporary textarea element
    document.body.removeChild(tempInput)
  }
}