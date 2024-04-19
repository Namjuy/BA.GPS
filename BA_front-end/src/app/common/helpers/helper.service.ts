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
import { Router } from '@angular/router';

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
    private datePipe: DatePipe,
    private router: Router
  ) {}

  formatDate(date: any): string {
    if (!date) return ''; // Return an empty string if date is not provided or invalid

    // If date is already a string in the desired format, return it directly
    if (typeof date === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(date)) {
      return date;
    }

    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return '';

    // Use DatePipe to format the date
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(newDate, 'MM/dd/yyyy') || '';
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

  // Check username duplicate
  checkUserNameExistAsync: AsyncValidatorFn = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const userName = control.value;

    if (!userName) {
      return of(null);
    }

    return this.service.checkExist(userName).pipe(
      map((response) => {
        return response ? null : { exist: true };
      }),
      catchError(() => {
        // Handle errors if needed
        return of(null);
      })
    );
  };

  //Check phone exist
  checkPhoneNumberExistAsync: AsyncValidatorFn = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const phone = control.value;
    
    if (!phone) {
      return of(null);
    }

    return this.service.checkPhone(phone).pipe(
      map((response) => {
        return response ? null : { duplicate: true };
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

  checkAuth = () => {
    var username = localStorage.getItem('userName');
    var role = localStorage.getItem('role');
    if (username == null) {
      this.router.navigate(['/login']);
    }
    else{
      if(role == '0'){
        this.router.navigate(['/user-management']);
      }
      if(role =='1'){
        this.router.navigate(['/home']);
      }
    }
  };
}
