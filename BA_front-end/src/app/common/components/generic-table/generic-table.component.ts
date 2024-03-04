import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

  @Input() headingList: any;
  @Input() list: any;
    
  currentPage : number = 1;
  itemsPerPage :number =5;

  constructor() { }

  ngOnInit() {
  }
  
}
