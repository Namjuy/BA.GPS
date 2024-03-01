import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

////Name   Date       Comments
////duypn  1/3/2024  create
export class LoginComponent implements OnInit {

  footerItemMap = new Map();

  constructor() {}

  createFooterItemMap = (): void => {
    this.footerItemMap.set('footerCol', this.footerLocationItems);
    this.footerItemMap.set('footerApp', this.footerSocialItem);
    this.footerItemMap.set('footerSocial', this.footerAppItem);
  };
  ngOnInit() {
    this.createFooterItemMap();
  }

  loginMenuItems = [
    {
      title: 'HOME',
      link: 'https://bagps.vn/',
    },
    {
      title: 'PRODUCTS',
      link: 'https://bagps.vn/san-pham-va-giai-phap',
    },
    { title: 'NEWS', link: 'https://bagps.vn/tin-tuc-c10' },
    {
      title: 'FEES',
      link: 'https://bagps.vn/huong-dan-dong-phi-dich-vu-ba-gps-d610',
    },
    {
      title: 'GUIDES',
      link: 'https://badoc.bagroup.vn/x/SAGhBg',
    },
    { title: 'NETWORK', link: 'https://bagps.vn/mang-luoi' },
    { title: 'ABOUT', link: 'https://bagps.vn/gioi-thieu/' },
  ];

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

  // Initialize an array of location items for the footer.
  footerLocationItems = [
    {
      area: 'AREA1',
      location: 'LOCATION1',
    },
    {
      area: 'AREA2',
      location: 'LOCATION2',
    },
    {
      area: 'AREA3',
      location: 'LOCATION3',
    },
    {
      area: 'AREA4',
      location: 'LOCATION4',
    },
    {
      area: 'AREA5',
      location: 'LOCATION5',
    },
    {
      area: 'AREA6',
      location: 'LOCATION6',
    },
  ];

  // Initialize an array of app store items for the footer
  footerAppItem = [
    {
      link: 'https://play.google.com/store/apps/details?id=vn.bagps.gpsmobile&hl=en_US',
      imageURL: '../../../assets/googleplay.png',
      imageName: 'googleplay',
    },
    {
      link: 'https://apps.apple.com/vn/app/ba-gps/id1466206178?l=vi',
      imageURL: '../../../assets/appstore.png',
      imageName: 'appstore',
    },
  ];

  // Initialize an array of social media items for the footer.
  footerSocialItem = [
    {
      link: 'https://www.facebook.com/bagps.vn/',
      imageURL: '../../../assets/facebook-icon.png',
      imageName: 'facebook-icon',
    },
    {
      link: '',
      imageURL: '../../../assets/zalo-icon.png',
      imageName: 'zalo-icon',
    },
    {
      link: 'https://www.youtube.com/c/BAGPS',
      imageURL: '../../../assets/youtube-icon.png',
      imageName: 'youtube-icon',
    },
  ];
}
