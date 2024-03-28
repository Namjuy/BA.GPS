import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '../../helpers/helper.service';
import { GenericService } from 'src/app/services/generic-service.service';
import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-pagination',
  templateUrl: './generic-pagination.component.html',
  styleUrls: ['./generic-pagination.component.scss'],
})

////Name   Date       Comments
////duypn  2/3/2024  create
export class GenericPaginationComponent implements OnInit {
  @Input() totalPage: any;
  @Input() currentPageIndex: any;
  @Output() getPageIndex = new EventEmitter();
  @Output() getPageSize = new EventEmitter();
  //Initalzie page index and total page

  pageSize = 10;

  constructor(private translate :TranslateService) {}

  //set first page
  setFirstPage = () => {
    this.currentPageIndex = 1;
    this.getPageIndex.emit(1);
  };

  //set last page
  setLastPage = () => {
    this.currentPageIndex = this.totalPage;
    this.getPageIndex.emit(this.totalPage);
  };

  //change to previous page
  handlePrevious = () => {
    if (this.currentPageIndex !== 1) {
      this.currentPageIndex = this.currentPageIndex - 1;

      this.getPageIndex.emit(this.currentPageIndex);
    }
  };

  //change to next page
  handleNext = () => {
    if (this.currentPageIndex !== this.totalPage) {
      this.currentPageIndex = this.currentPageIndex + 1;

      this.getPageIndex.emit(this.currentPageIndex);
    }
  };

  //set page size
  setPageSize = (itemNumber: number) => {
    this.pageSize = itemNumber;

    this.getNumberPage();
    this.getPageSize.emit(itemNumber);
  };

  //click to change page
  changePage = (pageNumber: number) => {
    this.currentPageIndex = pageNumber;
    this.getPageIndex.emit(this.currentPageIndex);
  };

  ngOnInit() {
    this.getNumberPage();
  }

  //get total page number
  getNumberPage = () => {
    return Array.from({ length: this.totalPage }, (_, index) => index + 1);
  };
}
