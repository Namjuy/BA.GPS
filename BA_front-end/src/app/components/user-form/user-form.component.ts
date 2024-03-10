import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() labelItems: any;
  @Input() form: FormGroup | any;
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log(1);
    }
  }

  setGender(){

  }
}
