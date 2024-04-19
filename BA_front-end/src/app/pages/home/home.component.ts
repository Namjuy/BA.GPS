import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/common/helpers/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private helper:HelperService) { }

  ngOnInit() {
    this.helper.checkAuth();
  }

  homeMenuItems = [
    {
      title: 'HOME',
      link: 'https://bagps.vn/',
    },
    {
      title: 'PRODUCTS',
      link: 'http://localhost:4200/home',
    },
  ];
}
