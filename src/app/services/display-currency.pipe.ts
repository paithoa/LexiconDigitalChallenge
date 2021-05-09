/*
Currency Formating Display
Author(s):
    Handy Hasan
Date Created:
    May 9, 2021

*/
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayCurrency'
})
export class DisplayCurrencyPipe implements PipeTransform {

  constructor(private currency: CurrencyPipe){}

  transform(value: number, ...args: unknown[]): string {
    return value ? this.currency.transform(value) : "unavailable";
  }

}
