import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { HelperService } from '../../helpers/helper.service';
import { DatePipe } from '@angular/common';
import { DataListInfor } from 'src/app/models/dataListInfor';
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})

// 4/3/2024
export class GenericTableComponent implements OnInit {
  @Input() listItem :any;
  @Input() listContent: any;
  @Input() currentPage: any;
  @Input() itemsPerPage: any;
  @Output() selectedItem = new EventEmitter();
  @Output() isDelete = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private helper: HelperService,
    private datePipe: DatePipe
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {
   
    
  }

  getSelectedItem = (item: any) => this.selectedItem.emit(item);

  convertDateFormat = (inputDateString: Date) =>
    this.datePipe.transform(inputDateString, 'dd/MM/yyyy');
  checkDelete =(item:any) => this.isDelete.emit(item);

}
