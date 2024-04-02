import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { GenericService } from 'src/app/services/generic-service.service';

@Injectable({
  providedIn: 'root',
})

////Name   Date       Comments
////duypn  16/3/2024  create
export class HelperService {
  constructor(
    private service: GenericService<User>,
    private datePipe: DatePipe
  ) {}

  formatDate(date: any): string {
    if (!date) return ''; // Return an empty string if date is not provided or invalid
  
    // If date is already a string in the desired format, return it directly
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
  
    // Assuming date is either a Date object or a string in a different format
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return ''; // Return empty string if date is invalid
  
    // Add 7 hours (7 * 60 * 60 * 1000 milliseconds) to the date
    newDate.setTime(newDate.getTime() + (7 * 60 * 60 * 1000));
  
    // Construct the formatted date string
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    const seconds = String(newDate.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

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

  // //Get username in list
  // getUserName(userName: string, listUser: any[]) {
  //   return listUser.some((item) => item.name === userName);
  // }

  //Handel check the password and confirm password are same
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const passwordControl = control.get('passWord');
    const confirmPasswordControl = control.get('confirmPassWord');

    return passwordControl?.value !== confirmPasswordControl?.value
      ? { mismatch: true }
      : null;
  };

  // Validator function for date of birth
  checkUserNameExistAsync: AsyncValidatorFn = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const userName = control.value;

    if (!userName) {
      return of(null);
    }

    return this.service.checkExist(userName).pipe(
      map((response) => {
        return response ? { exist: true } : null;
      }),
      catchError(() => {
        // Handle errors if needed
        return of(null);
      })
    );
  };

  formatValidDate = (dateString: any) => {
    if (dateString) {
      const date = new Date(dateString);
      // Extract the date components
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
      const day = ('0' + date.getDate()).slice(-2);

      // Concatenate the components into the desired format
      return `${year}-${month}-${day}`;
    }
    return null;
  };
}
