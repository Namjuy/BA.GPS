import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-pagination',
  templateUrl: './generic-pagination.component.html',
  styleUrls: ['./generic-pagination.component.scss']
})

//2/3/2024
export class GenericPaginationComponent implements OnInit {


  //Initalzie page index and total page
  currentPageIndex = 1;
  totalPage: any;

  //Initialize current page
  itemsPerPage = 10;

  ngOnInit() {

  }


}
