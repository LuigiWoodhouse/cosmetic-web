import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputSanitizationService {

  constructor() { }

  public allowOnlyNumbersAndHyphen(event: any) {
    const input = event.target;
    const currentValue = input.value;

    // Clean up the input after the fact
    input.value = this.formatPhoneNumber(currentValue);
  }

  private formatPhoneNumber(value: string) {
    // Remove non-numeric characters and ensure proper hyphen placement
    const numericValue = value.replace(/[^\d]/g, '');

    // Enforce the desired format: XXX-XXX-XXXX
    const formattedValue = numericValue.replace(/(\d{3})(\d{0,3})(\d{0,4})/, (_, p1, p2, p3) => {
      let result = p1;
      if (p2) result += '-' + p2;
      if (p3) result += '-' + p3.slice(0, 4); // Limit to 4 digits in the last part
      return result;
    });

    // Limit the length of the input to prevent further characters
    return formattedValue.slice(0, 12); // Limit to 12 characters in total (including hyphens)
  }

  public allowLettersAndHyphenOnly(event: any) {
    const input = event.target;
    const currentValue = input.value;

    // Clean up the input after the fact and allow only letters and hyphen
    input.value = this.formatName(currentValue);
  }

  private formatName(value: string) {
    // Allow only letters and hyphen
    const cleanedValue = value.replace(/[^a-zA-Z-]/g, '');

    return cleanedValue;
  }

  public allowOnlyLettersAndNumbers(event: any) {
    const input = event.target;
    const currentValue = input.value;

    // Clean up the input after the fact and allow only alphanumeric characters
    input.value = this.formatUsername(currentValue);
  }

  private formatUsername(value: string) {
    // Allow only numbers and letters
    const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '');
    return cleanedValue;
  }
}