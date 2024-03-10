import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
//1/1/2024
export class GenericModalComponent implements OnInit {
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
