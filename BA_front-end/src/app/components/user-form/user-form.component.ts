import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { GenericService } from 'src/app/services/generic-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})

////Name   Date       Comments
////duypn  15/3/2024  create
export class UserFormComponent implements OnInit {

  @Input() modalTitle: string = '';
  @Input() labelItems: any;
  @Input() form: FormGroup | any;
  @Input() createStatus: boolean | any;
  @Output() submitForm = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() deleteStatus: boolean | any;

  isShowConfirmPassword = false;
  isShowPassword = false;
  check = false;

  constructor(
    private translate: TranslateService,
    private service: GenericService<User>,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {}

  onSubmit = () => this.submitForm.emit(this.form);

  // Create a method to toggle the visibility of the password
  togglePasswordVisible = () => (this.isShowPassword = !this.isShowPassword);

  // Create a method to toggle the visibility of the confirm password password
  toggleConfirmPassword = () =>
    (this.isShowConfirmPassword = !this.isShowConfirmPassword);

  //close modal
  closeForm = () => {
    this.check = false;
    this.close.emit();
  };
 
 
  
}
