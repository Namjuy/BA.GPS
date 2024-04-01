import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/common/helpers/helper.service';
import { ToastDirective } from 'src/app/directives/toast.directive';
import { DataListInfor } from 'src/app/models/dataListInfor';
import { User } from 'src/app/models/user.model';
import { GenericService } from 'src/app/services/generic-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})

////Name   Date       Comments
////duypn  1/3/2024  create
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
  pageSize = 10;

  tableItemMap = new Map();

  setTableContent = () => {
    this.tableItemMap.set('data', this.userListInfor.dataList);
    this.tableItemMap.set('label', this.tableContent);
    this.tableItemMap.set('index', this.currentIndex);
    this.tableItemMap.set('size', this.pageSize);
  };

  //constructor
  constructor(
    private generic: GenericService<User>,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private helper: HelperService,
    private toastDirective: ToastDirective
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  //handle methods when initialize
  ngOnInit() {
    this.getUser();
    this.setTableContent();
    this.initializeForm();
  }

  //initialize form
  initializeForm = () => {
    const formControls: Record<string, any> = {};
    const formItems = this.isDelete
      ? this.formDeleteItem
      : this.selectedUser
      ? this.formItem
      : this.formCreateItem;

    formItems.forEach((item: any) => {
      formControls[item.value] = ['', item.validator];
    });

    // Add checkUserNameExistAsync validator to the 'userName' control
    if (!this.isDelete && !this.selectedUser) {
      formControls['userName'].push(this.helper.checkUserNameExistAsync);
    }

    this.userForm = this.formBuilder.group(formControls, {
      validators: [this.helper.passwordMatchValidator],
    });
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
      validator: [Validators.required],
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
      type: 'password',
      errorMessage:
        'Mật khẩu chưa ít nhất 1 ký tự viết hoa , 1 ký tự đặc biệt và 1 chữ số',
    },
    {
      heading: 'CONFIRM_PASSWORD',
      value: 'confirmPassWord',
      validator: [Validators.required],
      type: 'password',
      errorMessage: 'Mật khẩu xác thực không đúng',
    },
  ];

  //delete user information
  formDeleteItem = [
    { heading: 'USERNAME', value: 'userName', validator: '', type: 'text' },
    { heading: 'FULLNAME', value: 'fullName', validator: '', type: 'text' },
    { heading: 'PHONE', value: 'phoneNumber', validator: '', type: 'text' },
    {
      heading: 'DATE_OF_BIRTH',
      value: 'dateOfBirth',
      validator: '',
      type: 'date',
    },
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

  //home MenuItem
  homeMenuItems = [
    {
      title: 'HOME',
      link: 'https://bagps.vn/',
    },
    {
      title: 'PRODUCTS',
      link: 'http://localhost:4200/vehicle',
    },
  ];

  // Fetch all users
  getUser = (): void => {
    this.generic.getAll(this.currentIndex, this.pageSize).subscribe((data) => {
      this.userListInfor = data;
      this.setTableContent();
    });
  };

  // Handle search functionality
  searchUser = (event: any) => {
    if (this.userFilter != event) this.currentIndex = 1;
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
        this.pageSize
      )
      .subscribe((response) => {
        this.userListInfor = response;
        this.setTableContent();
      });
  };

  // handle when click edit user
  setEdit = (event: any) => {
    this.focusInput('fullName');
    this.isDelete = false;
    this.selectedUser = event;
    this.selectedUser.dateOfBirth = this.helper.formatDate(
      this.selectedUser.dateOfBirth
    );
    this.initializeForm();
    this.userForm.patchValue(this.selectedUser);
  };

  //handle when click create user
  setCreate = () => {
    this.focusInput('userName');
    this.isDelete = false;
    this.selectedUser=undefined;
    this.initializeForm();
  };

  //handle click delete user
  setDelete = (event: any) => {
    this.isDelete = true;
    this.selectedUser = event;
    this.selectedUser.dateOfBirth = this.helper.formatDate(
      this.selectedUser.dateOfBirth
    );
    this.initializeForm();
    this.userForm.patchValue(event);
  };

  //handle form submit
  submitForm = (item: any) => {
    this.isDelete
      ? this.deleteUser(this.selectedUser.userId)
      : this.selectedUser
      ? this.updateUser(item)
      : this.createUser(item);
  };

  //get page index
  getPageIndex = (event: any) => {
    this.currentIndex = event;
    this.userFilter ? this.searchUser(this.userFilter) : this.getUser();
  };

  //get page size
  getPageSize = (event: any) => {
    this.pageSize = event;
    this.currentIndex = 1;
    this.userFilter ? this.searchUser(this.userFilter) : this.getUser();
  };

  //create user
  createUser = (event: any) => {
    const createUserData = {
      ...event.value,
      email: event.get('email')?.value || '',
      address: event.get('address')?.value || '',
      passWordHash: event.get('passWord')?.value,
      userType: 1,
      companyId: 123,
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
    this.generic.delete(event).subscribe(
      () => {
        this.toastContent = 'Xoá thành công';
        this.toastDirective.showToast('toast-success');
        this.getUser();
      },
      (error) => {
        this.toastContent = 'Xoá thất bại ';
        this.toastDirective.showToast('toast-failed');
      }
    );
  };

  //set focus input when create modal
  focusInput = (inputName: string) => {
    const myModal = document.getElementById('genericModal');
    const myInput = document.getElementById(inputName);

    myModal?.addEventListener('shown.bs.modal', () => {
      myInput?.focus();
      if (this.selectedUser) {
        const userNameInput = document.getElementById(
          'userName'
        ) as HTMLInputElement;
        if (userNameInput) {
          userNameInput.disabled = true;
        }
      }
    });
  };

  //click reset form
  resetForm = () => {
    this.initializeForm();
  };
}
