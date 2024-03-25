import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})

////Name   Date       Comments
////duypn  16/3/2024  create
export class HelperService {
  constructor() {}

  // Helper method to format date strings
  formatDate: (dateString: string) => string = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 7);
    return date.toISOString().split('T')[0];
  };

  // Validator function for date of birth
  dateOfBirthValidator: (control: FormControl) => ValidationErrors | null = (
    control
  ) => {
    const currentDate = new Date();
    const enteredDate = new Date(control.value);
    const age = currentDate.getFullYear() - enteredDate.getFullYear();

    return age < 18 ? { underage: true } : null;
  };

  // Custom validator function for validating phone numbers
  phoneNumberValidator: () => ValidatorFn = () => (control) => {
    const phoneNumberRegex = /^\d{10}$/;
    const value = control.value;

    if (!value) return null;

    if (!phoneNumberRegex.test(value)) return { invalidPhoneNumber: true };

    return null;
  };

  //Get username in list
  getUserName(userName: string, listUser: any[]) {
    return listUser.some((item) => item.name === userName);
  }


}
