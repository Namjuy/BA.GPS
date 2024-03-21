import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '../../helpers/helper.service';
import { GenericService } from 'src/app/services/generic-service.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-generic-pagination',
  templateUrl: './generic-pagination.component.html',
  styleUrls: ['./generic-pagination.component.scss'],
})

////Name   Date       Comments
////duypn  2/3/2024  create
export class GenericPaginationComponent implements OnInit {
  @Output() getPageIndex = new EventEmitter();
  @Output() getPageSize = new EventEmitter();
  @Input() totalPage: any;
  @Input() currentPageIndex: any;
  //Initalzie page index and total page
  
  pageSize = 10;

  constructor(private service: GenericService<User>) {}
  handleFirstPage = () => {
    this.currentPageIndex = 1;
    this.getPageIndex.emit(1);
  };

  handleLastPage = () => {
    this.currentPageIndex = this.totalPage;
    this.getPageIndex.emit(this.totalPage);
  };

  handlePrevious = () => {
    if (this.currentPageIndex !== 1) {
      this.currentPageIndex = this.currentPageIndex - 1;

      this.getPageIndex.emit(this.currentPageIndex);
    }
  };
  //done
  handleNext = () => {
    if (this.currentPageIndex !== this.totalPage) {
      this.currentPageIndex = this.currentPageIndex + 1;

      this.getPageIndex.emit(this.currentPageIndex);
    }
  };

  //done
  setItemPerPage = (itemNumber: number) => {
    this.pageSize = itemNumber;

    this.getNumberPage();
    this.getPageSize.emit(itemNumber);
  };

  changePage = (pageNumber: number) => {
    this.currentPageIndex = pageNumber;
    this.getPageIndex.emit(this.currentPageIndex);
  };

  ngOnInit() {
    this.getNumberPage();
  }

  getNumberPage = () => {
    return Array.from({ length: this.totalPage }, (_, index) => index + 1);
  };
}
