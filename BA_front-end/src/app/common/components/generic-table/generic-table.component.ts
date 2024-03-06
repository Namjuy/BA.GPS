import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})

// 4/3/2024
export class GenericTableComponent implements OnInit {
  @Input() list: User[] | any;
  @Input() listContent: any;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor() {}

  ngOnInit() {}
}
