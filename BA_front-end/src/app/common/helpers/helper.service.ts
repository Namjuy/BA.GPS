import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private datePipe: DatePipe) {}

  convertDateFormat = (inputDateString: Date) =>
    this.datePipe.transform(inputDateString, 'dd/MM/yyyy');
}
