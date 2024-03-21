import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { GenericService } from 'src/app/services/generic-service.service';



@Component({
  selector: 'app-delete-item-infor',
  templateUrl: './delete-item-infor.component.html',
  styleUrls: ['./delete-item-infor.component.css'],
})
export class DeleteItemInforComponent implements OnInit {
  @Input() labelItems: any;
  @Input() deletedItem: any;
  @Output() handleDelete = new EventEmitter();
  constructor(
    private translate: TranslateService,
    private service: GenericService<any>
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {}

  onSubmit() {
    this.handleDelete.emit(this.deletedItem);
    
  }
}
