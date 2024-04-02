import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastDirective } from 'src/app/directives/toast.directive';
import { AuthService } from 'src/app/services/auth-service.service';
import { JwtService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
////Name   Date       Comments
////duypn  13/3/2024  create
export class LoginFormComponent {
  // Initalize variable
  decodeToken: any;
  username: string = '';
  password: string = '';

  toastContent: string = '';
  toastType = '';
  // Constructor for a class that takes TranslateService as a private params
  //TODO: use TranslateService like a library to change language
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService,
    private toast: ToastDirective
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  // Initialize a boolean variable isShowPassword and set it to false
  isShowPassword: boolean = false;

  // The array is created using Array.from() and a mapping function that returns the index
  ellipsify = (str: string) => {
    if (str.length > 50) {
      return str.substring(0, 50) + '...';
    } else {
      return str;
    }
  };
  // Initialize an array of carousel items
  carouselItems = [
    {
      title: 'CAPTION1',
      detail: 'DETAIL1',
      image: '../../assets/banner_web-04.png',
    },
    {
      title: 'CAPTION2',
      detail: 'DETAIL2',
      image: '../../assets/banner_web-03.jpg',
    },
    {
      title: 'CAPTION3',
      detail: 'DETAIL3',
      image: '../../assets/banner_web-02.jpg',
    },
  ];

  // OnInit lifecycle hook
  ngOnInit() {
    // Assuming you have the token available after successful login
  }

  // Create a method to toggle the visibility of the password
  tooglePasswordVisible = () => {
    this.isShowPassword = !this.isShowPassword;
  };

  //Method to handle login
  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response != null) {
          this.decodeToken = this.jwtService.decodeToken(response);
          localStorage.setItem('jwtToken', response);
          if (
            Number(
              this.decodeToken[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
              ]
            ) == 1
          ) {
            this.toast.showToast('toast-success');
            this.toastContent = 'Đăng nhập thành công';
            localStorage.setItem('authToken', JSON.stringify(this.decodeToken));

            localStorage.setItem(
              'userName',
              JSON.stringify(
                this.decodeToken[
                  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
                ]
              )
            );

            this.router.navigate(['/user-management']);
          } else {
            this.toast.showToast('toast-success');
            this.toastContent = 'Đăng nhập thành công';
            this.router.navigate(['/user']);
          }
        }
      },
      (errorMess) => {
        this.toastContent = 'Đăng nhập thất bại';
        this.toast.showToast('toast-failed');
      }
    );
  }
}
