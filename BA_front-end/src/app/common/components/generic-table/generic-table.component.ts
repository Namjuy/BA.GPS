import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from '../../helpers/helper.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})

////Name   Date       Comments
////duypn  4/3/2024  create
export class GenericTableComponent implements OnInit {
  @Input() tableContent: any;
  @Output() setEdit = new EventEmitter();
  @Output() setDelete = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private helper: HelperService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {}

  clickEdit = (item: any) => this.setEdit.emit(item);
  clickDelete = (item: any) => this.setDelete.emit(item);

  convertDateFormat = (inputDateString: Date) =>
    this.datePipe.transform(inputDateString, 'dd/MM/yyyy');
}
