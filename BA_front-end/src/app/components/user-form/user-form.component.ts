
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { GenericService } from 'src/app/services/generic-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})

//15-03-2024
export class UserFormComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() labelItems: any;
  @Input() form: FormGroup | any;
  @Input() selectedItem: any;
  @Output() updateUser = new EventEmitter();
  @Output() createUser = new EventEmitter();
  constructor(
    private translate: TranslateService,
    private service: GenericService<User>
  ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi');
  }
  check = false;

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.selectedItem ? this.updateUser.emit(this.form) : this.createUser.emit(this.form);
    }
  }

  checkUserNameExist(username:FormControl) {
    
    this.service.checkExist(username.value).subscribe(response =>{ this.check = response; console.log(this.check);
    });
   
  }

}
