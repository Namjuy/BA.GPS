import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { GenericService } from 'src/app/services/generic-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})

//15-03-2024
export class UserFormComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() labelItems: any;
  @Input() form: FormGroup | any;
  @Input() createStatus: boolean | any;
  @Output() submitForm = new EventEmitter();
  @Output() close = new EventEmitter();

  isShowConfirmPassword = false;
  isShowPassword = false;
  check = false;
  
  constructor(
    private translate: TranslateService,
    private service: GenericService<User>
  ) {}

 

  ngOnInit() {}

  onSubmit = () => this.submitForm.emit(this.form);

  //check UserName Exist
  checkUserNameExist(username: FormControl) {
    if (this.createStatus) {
      this.service
        .checkExist(username.value)
        .subscribe((response) => (this.check = response));
    } else this.check = false;
  }

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
