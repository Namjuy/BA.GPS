import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-pagination',
  templateUrl: './generic-pagination.component.html',
  styleUrls: ['./generic-pagination.component.scss']
})

//2/3/2024
export class GenericPaginationComponent implements OnInit {
  @Output() currentPage = new EventEmitter<number>();
  @Output() itemsPerPageNumber = new EventEmitter<number>();
  @Input() inputPaginationData: any;

  //Initalzie page index and total page
  currentPageIndex = 1;
  totalPage: any;

  //Initialize current page
  itemsPerPage = 10;

  ngOnInit() {
    this.getInputPaginationData();
  }

  // Get the pagination data
  getInputPaginationData = (): void => {
    this.currentPageIndex = this.inputPaginationData.get('currentPage');
    this.totalPage = this.inputPaginationData.get('totalPage');
  };

  // Set items per page and emit the value
  setItemPerPage = (numberPerPage: number) => {
    this.itemsPerPage = numberPerPage;

    this.itemsPerPageNumber.emit(numberPerPage);
  };

  // Handle previous page
  handlePreviousPage = () => {
    if (this.currentPageIndex !== 1) {
      this.currentPageIndex = this.currentPageIndex - 1;

      this.currentPage.emit(this.currentPageIndex);
    }
  };

  // Handle next page
  handleNextPage = () => {
    if (this.currentPageIndex !== this.totalPage) {
      this.currentPageIndex = this.currentPageIndex + 1;

      this.currentPage.emit(this.currentPageIndex);
    }
  };

  // Handle first page
  handleFirstPage = () => {
    this.currentPageIndex = 1;
    this.getInputPaginationData();
    this.currentPage.emit(1);
  };

  // Handle last page
  handleLastPage = () => {
    this.currentPageIndex = this.totalPage;
    this.getInputPaginationData();
    this.currentPage.emit(this.totalPage);
  };

  // Change page
  changePage = (pageNumber: number) => {
    this.currentPageIndex = pageNumber;
    this.getInputPaginationData();
    this.currentPage.emit(pageNumber);
  };

  // Get an array of page numbers
  getPages = () => {
    this.getInputPaginationData();
    return Array.from({ length: this.totalPage }, (_, index) => index + 1);
  };
}
