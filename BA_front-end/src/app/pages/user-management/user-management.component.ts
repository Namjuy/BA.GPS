import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})

//1/3/2024
export class UserManagementComponent implements OnInit {
  list: User[] = [];
  userFilter: any;
  userForm: FormGroup | any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getUser();
    const formControls: Record<string, any> = {};
    this.formItem.forEach((item: any) => {
      formControls[item.value] = ['', item.validator];
    });

    this.userForm = this.formBuilder.group(formControls);
  }

  formItem = [
    {
      heading: 'Tên Tài khoản',
      value: 'userName',
      validator: [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.maxLength(50),
      ],
      type: 'text',
    },
    {
      heading: 'Họ và tên',
      value: 'fullName',
      validator: [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹ0-9 ]+$'),
      ],
      type: 'text',
    },
    {
      heading: 'Ngày sinh',
      value: 'dateOfBirth',
      validator: [this.userService.dateOfBirthValidator, Validators.required],
      type: 'date',
    },
    {
      heading: 'Email',
      value: 'email',
      validator: Validators.email,
      type: 'text',
    },
    {
      heading: 'Điện thoại',
      value: 'phoneNumber',
      validator: [Validators.required, Validators.pattern('[0-9 ]{10}')],
      type: 'text',
    },
    {
      heading: 'Địa chỉ',
      value: 'address',
      validator: [Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹ0-9 ]+$')],
      type: 'text',
    },
    {
      heading: 'Mật khẩu',
      value: 'passWord',
      validator: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
      type: 'text',
    },
    {
      heading: 'Xác nhận mật khẩu',
      value: 'confirmPassWord',
      validator: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
      type: 'text',
    },
  ];

  tableContent = [
    { heading: 'Tên Tài khoản', value: 'userName' },
    { heading: 'Họ và tên', value: 'fullName' },
    { heading: 'Ngày sinh', value: 'dateOfBirth' },
    { heading: 'Email', value: 'email' },
    { heading: 'Điện thoại', value: 'phoneNumber' },
  ];

  selectOption = [
    { content: 'Tên đăng nhập', type: 'userName' },
    { content: 'Họ và tên', type: 'fullName' },
    { content: 'Email', type: 'email' },
    { content: 'Điện thoại', type: 'phoneNumber' },
  ];

  // Fetch all users
  getUser = (): void => {
    this.userService.getAllUser().subscribe((data) => {
      this.list = data;
    });
  };

  // Handle search functionality
  handleSearch = (event: any) => {
    this.userFilter = event;
    this.userService
      .searchUser(
        this.userFilter.get('inputSearchValue'),
        this.userFilter.get('optionValue'),
        this.userFilter.get('startDate'),
        this.userFilter.get('endDate'),
        this.userFilter.get('selectedGender')
      )
      .subscribe((response) => {
        this.list = response;
      });
  };
}
