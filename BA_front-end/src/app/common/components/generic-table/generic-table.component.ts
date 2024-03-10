import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { HelperService } from '../../helpers/helper.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})

// 4/3/2024
export class GenericTableComponent implements OnInit {
  @Input() list: User[] | any;
  @Input() listContent: any;

  @Output() selectedUser = new EventEmitter();
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private translate: TranslateService,
    private helper: HelperService,
    private datePipe: DatePipe
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {}

  getSelectedUser = (selectedItem: any) => this.selectedUser.emit(selectedItem);

  convertDateFormat = (inputDateString: Date) =>
    this.datePipe.transform(inputDateString, 'dd/MM/yyyy');
}
