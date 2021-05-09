/*
Unit Test for Display Currency
Author(s):
    Handy Hasan
Date Created:
    May 9, 2021

*/

import { CommonModule, CurrencyPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { DisplayCurrencyPipe } from './display-currency.pipe';

describe('DisplayCurrencyPipe', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [CommonModule],
    providers: [CurrencyPipe]
  }));

  it('create an instance', () => {
    const pipe = new DisplayCurrencyPipe(TestBed.inject(CurrencyPipe));
    expect(pipe).toBeTruthy();
  });

  it('correctly converts a number into Currency-formatted number', () => {
    const pipe = new DisplayCurrencyPipe(TestBed.inject(CurrencyPipe));
    const expected = "$23.30";
    const actual = pipe.transform(23.30);
    expect(actual).toBe(expected);
  });

  it('returns default value on falsy input', () => {
    const pipe = new DisplayCurrencyPipe(TestBed.inject(CurrencyPipe));
    const expected = "unavailable";
    const actual = pipe.transform(null);
    expect(actual).toBe(expected);
  })
});
