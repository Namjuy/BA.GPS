import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HelperService } from '../../helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.scss'],
})

//1/3/2024
export class GenericFilterComponent implements OnInit {
  @Input() selectOption: [{ content: string; type: string }] | any;
  @Output() handleSearch = new EventEmitter<Map<string, any>>();
  @Output() handelCreate = new EventEmitter();
  @Input() selectGender: [{ content: string; type: string }] | any;

  inputSearchValue: string = '';

  optionLabel: string = '';
  optionValue: string = '';

  genderLabel: string = '';
  genderValue: string = '';

  startDate: string = '';
  endDate: string = '';

  filterMap = new Map<string, any>();

  constructor(
    private helper: HelperService,
    private translate: TranslateService
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {
    if (this.selectOption && this.selectOption.length > 0) {
      this.optionLabel = this.selectOption[0].content;
      this.optionValue = this.selectOption[0].type;
    }
    if (this.selectGender && this.selectGender.length > 0) {
      this.genderLabel = this.selectGender[0].content;
      this.genderValue = this.selectGender[0].type;
    }
  }

  onSearch(): void {
    this.filterMap.set('inputSearchValue', this.inputSearchValue);
    this.filterMap.set('optionValue', this.optionValue);
    this.filterMap.set('startDate', this.startDate);
    this.filterMap.set('endDate', this.endDate);
    this.filterMap.set('selectedGender', this.genderValue);
   
    // Emit the filter map to the parent component
    this.handleSearch.emit(this.filterMap);
    
    
  }

  handleSelectOption(option: any): void {
    this.optionLabel = option.content;
    this.optionValue = option.type;
  }

  handleSelectGender = (gender: any): void => {
    this.genderLabel = gender.content;
    this.genderValue = gender.type;
  };

  onCreate = () => this.handelCreate.emit();
}
