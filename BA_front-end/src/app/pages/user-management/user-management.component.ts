import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
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
  selectedUser: User | any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {
    this.getUser();
  }

  initializeForm = () => {
    const formControls: Record<string, any> = {};
    if (this.selectedUser) {
      this.formItem.forEach((item: any) => {
        formControls[item.value] = ['', item.validator];
      });
    } else {
      this.formCreateItem.forEach((item: any) => {
        formControls[item.value] = ['', item.validator];
      });
    }

    this.userForm = this.formBuilder.group(formControls);
  };

  formItem = [
    {
      heading: 'USERNAME',
      value: 'userName',
      validator: [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.maxLength(50),
      ],
      type: 'text',
      errorMessage: 'Tên tài khoản không hợp lệ',
    },
    {
      heading: 'FULLNAME',
      value: 'fullName',
      validator: [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹ0-9 ]+$'),
      ],
      type: 'text',
      errorMessage: 'Họ và tên không hợp lệ',
    },
    {
      heading: 'DATE_OF_BIRTH',
      value: 'dateOfBirth',
      validator: [this.userService.dateOfBirthValidator, Validators.required],
      type: 'date',
      errorMessage: 'Tuổi không hợp lệ , yêu cầu trên 18 tuổi',
    },
    {
      heading: 'Email',
      value: 'email',
      validator: Validators.email,
      type: 'text',
      errorMessage: 'Email không hợp lệ',
    },
    {
      heading: 'PHONE',
      value: 'phoneNumber',
      validator: [Validators.required, Validators.pattern('[0-9 ]{10}')],
      type: 'text',
      errorMessage: 'Số điện thoại không hợp lệ',
    },
    {
      heading: 'ADDRESS',
      value: 'address',
      validator: [Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹ0-9 ]+$')],
      type: 'text',
      errorMessage: 'Địa chỉ không hợp lệ',
    },
  ];

  formCreateItem = [
    ...this.formItem,
    {
      heading: 'PASSWORD',
      value: 'passWord',
      validator: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{8,}$'),
      ],
      type: 'text',
      errorMessage:
        'Mật khẩu chưa ít nhất 1 ký tự viết hoa , 1 ký tự đặc biệt và 1 chữ số',
    },
    {
      heading: 'CONFIRM_PASSWORD',
      value: 'confirmPassWord',
      validator: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ],
      errorMessage: 'Xác nhận mật khẩu không khớp',
    },
  ];
  tableContent = [
    { heading: 'USERNAME', value: 'userName' },
    { heading: 'FULLNAME', value: 'fullName' },
    { heading: 'DATE_OF_BIRTH', value: 'dateOfBirth' },
    { heading: 'Email', value: 'email' },
    { heading: 'PHONE', value: 'phoneNumber' },
  ];

  selectOption = [
    { content: 'USERNAME', type: 'userName' },
    { content: 'FULLNAME', type: 'fullName' },
    { content: 'Email', type: 'email' },
    { content: 'PHONE', type: 'phoneNumber' },
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

  handleSelectedUser = (event: any) => {
    this.selectedUser = event;
    this.initializeForm();
    this.userForm.patchValue(this.selectedUser);
  };

  handleCreate = () => {
    this.selectedUser = undefined;
    this.initializeForm();
  };
}
