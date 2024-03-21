import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth-service.service';

interface MenuItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-generic-navbar',
  templateUrl: './generic-navbar.component.html',
  styleUrls: ['./generic-navbar.component.scss'],
})
////Name   Date       Comments
////duypn  1/3/2024  create
export class GenericNavbarComponent {
  //get userId from local storage
  @Input() menuItems: MenuItem[] | any;

  userName = localStorage.getItem('userName');

  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  // Initialize method to handle switch language when choose dropdown
  switchLanguage = (language: string) => {
    this.translate.use(language);
    this.selectedLanguage = language;
  };

  selectedLanguage = 'vi';

  //handle click logout
  logout = (): void => {
    this.authService.logout();
  };
}
