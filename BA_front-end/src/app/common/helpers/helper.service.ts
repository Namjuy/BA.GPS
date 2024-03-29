import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { GenericService } from 'src/app/services/generic-service.service';

@Injectable({
  providedIn: 'root',
})

////Name   Date       Comments
////duypn  16/3/2024  create
export class HelperService {
  constructor(private service : GenericService<User>) {}

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
  checkUserNameExist: (control: FormControl) => ValidationErrors | null = (
    control
  ) => {
    
    const userName = control.value
    var check = false;
    this.service.checkExist(userName).subscribe(response => check= response)

    return check ? { exist: true } : null;
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
