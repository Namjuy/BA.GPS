import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/common/helpers/helper.service';
import { ToastDirective } from 'src/app/directives/toast.directive';
import { DataListInfor } from 'src/app/models/dataListInfor';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { GenericService } from 'src/app/services/generic-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})

//1/3/2024
export class UserManagementComponent implements OnInit {

  //Initalize 
  userListInfor: DataListInfor<User> = new DataListInfor();
  userFilter: any;
  userForm: FormGroup | any;
  selectedUser: User | any;
  isDelete: any;
  toastType = '';
  toastContent = '';
  currentIndex = 1;
  itemsPerPage = 10;

  //constructor
  constructor(
    private generic: GenericService<User>,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private helper: HelperService,
    private authService: AuthService,
    private toastDirective: ToastDirective
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  //handle methods when initialize
  ngOnInit() {
    this.getUser();
    this.initializeForm();
  }

  //initialize form
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

    this.userForm = this.formBuilder.group(
      formControls,
      this.authService.passwordMatchValidator
    );
  };

  //update data form
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
      validator: [this.helper.dateOfBirthValidator, Validators.required],
      type: 'date',
      errorMessage: 'Tuổi không hợp lệ , yêu cầu trên 18 tuổi',
    },
    {
      heading: 'GENDER',
      value: 'isMale',
      validator: [],
      type: 'gender',
      errorMessage: 'Giới tính không hợp lệ',
    },
    {
      heading: 'Email',
      value: 'email',
      validator: Validators.email,
      type: 'email',
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

  //create data form
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
      validator: [Validators.required],
      errorMessage: 'Xác nhận mật khẩu không khớp',
    },
  ];

  //delete user information
  deleteUserInfor = [
    { heading: 'USERNAME', content: 'userName' },
    { heading: 'FULLNAME', content: 'fullName' },
    { heading: 'PHONE', content: 'phoneNumber' },
  ];

  //contents of the table
  tableContent = [
    { heading: 'USERNAME', value: 'userName', type: 'text' },
    { heading: 'FULLNAME', value: 'fullName', type: 'text' },
    { heading: 'DATE_OF_BIRTH', value: 'dateOfBirth', type: 'date' },
    { heading: 'GENDER', value: 'isMale', type: 'text' },
    { heading: 'Email', value: 'email', type: 'text' },
    { heading: 'PHONE', value: 'phoneNumber', type: 'text' },
    { heading: 'MODIFED_DATE', value: 'lastModifyDate', type: 'date' },
  ];

  //dropdown filter
  selectOption = [
    { content: 'USERNAME', type: 'userName' },
    { content: 'FULLNAME', type: 'fullName' },
    { content: 'PHONE', type: 'phoneNumber' },
    { content: 'Email', type: 'email' },
  ];

  //gender filter
  selectGender = [
    { content: 'MALE', type: '1' },
    { content: 'FEMALE', type: '0' },
    { content: 'ALL', type: '' },
  ];

  // Fetch all users
  getUser = (): void => {
    this.generic
      .getAll(this.currentIndex, this.itemsPerPage)
      .subscribe((data) => {
        this.userListInfor = data;
        console.log(this.userListInfor);
      });
  };

  // Handle search functionality
  handleSearch = (event: any) => {
    if(this.userFilter != event ) this.currentIndex=1;
    this.userFilter = event;
     
    this.generic
      .search(
        this.userFilter.get('inputSearchValue'),
        this.userFilter.get('optionValue'),
        this.userFilter.get('startDate') == ''
          ? null
          : this.userFilter.get('startDate'),
        this.userFilter.get('endDate') == ''
          ? null
          : this.userFilter.get('endDate'),
        this.userFilter?.get('selectedGender') == ''
          ? null
          : this.userFilter.get('selectedGender'),
        this.currentIndex,
        this.itemsPerPage
      )
      .subscribe((response) => {

        this.userListInfor = response;
      });
  };

  // handle when click edit user
  handleSelectedUser = (event: any) => {
    this.isDelete = false;
    this.selectedUser = event;
    this.selectedUser.dateOfBirth = this.helper.formatDate(
      this.selectedUser.dateOfBirth
    );
    this.initializeForm();
    this.userForm.patchValue(this.selectedUser);
  };

  //handle when click create user
  handleCreate = () => {
    this.isDelete = false;
    this.selectedUser = undefined;
    this.initializeForm();
  };

  //handle click delete user
  handleDelete = (event: any) => {
    this.isDelete = true;
    this.selectedUser = event;
  };

  //get page index
  getPageIndex = (event: any) => {
    this.currentIndex = event;
    this.userFilter ? this.handleSearch(this.userFilter) : this.getUser();
  };

  //get page size
  getPageSize = (event: any) => {
    this.itemsPerPage = event;
    this.currentIndex=1;
    this.userFilter ? this.handleSearch(this.userFilter) : this.getUser();
  };

  //create user
  createUser = (event: any) => {
    const now = new Date();
    const createUserData = {
      ...event.value,
      email: event.get('email')?.value || '',
      address: event.get('address')?.value || '',
      passWordHash: event.get('passWord')?.value,
      userType: 1,
      companyId: 123,
      createDate: now.toISOString(),
      lastModifyDate: now.toISOString(),
    };
    delete createUserData.confirmPassword;
    delete createUserData.newPassword;
    this.generic.create(createUserData).subscribe(
      () => {
        this.toastType = 'toast-success';
        this.toastContent = 'Tạo thành công';
        this.toastDirective.showToast(this.toastType);
        this.getUser();
      },
      (error) => {
        this.toastType = 'toast-failed';
        this.toastContent = 'Tạo thất bại';
        this.toastDirective.showToast(this.toastType);
        this.getUser();
      }
    );
  };

  //update user
  updateUser = (event: any) => {
    const userId = this.selectedUser.userId;
    const updatedUserData = {
      ...event.value,
      passWordHash: this.selectedUser.passWordHash,
    };
    this.generic.update(userId, updatedUserData).subscribe(
      () => {
        this.toastType = 'toast-success';
        this.toastContent = 'Cập nhật thành công';
        this.toastDirective.showToast(this.toastType);
        this.getUser();
      },
      (error) => {
        this.toastType = 'toast-failed';
        this.toastContent = 'Cập nhật thất bại';
        this.toastDirective.showToast(this.toastType);
        this.getUser();
      }
    );
  };

  //delete user
  deleteUser = (event: any) => {
    this.generic.delete(event.userId).subscribe(
      () => {
        this.toastContent = 'Xoá thành công';
        this.toastDirective.showToast('toast-success');
        this.getUser();
      },
      (error) => {
        this.toastContent = 'Xoá thất bại công';
        this.toastDirective.showToast('toast-failed');
      }
    );
  };
}
