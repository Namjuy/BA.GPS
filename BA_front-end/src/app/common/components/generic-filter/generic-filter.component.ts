import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HelperService } from '../../helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastDirective } from 'src/app/directives/toast.directive';

@Component({
  selector: 'app-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.scss'],
})

////Name   Date       Comments
////duypn  1/3/2024  create
export class GenericFilterComponent implements OnInit {
  @Input() selectOption: [{ content: string; type: string }] | any;
  @Output() handleSearch = new EventEmitter<Map<string, any>>();

  @Input() selectGender: [{ content: string; type: string }] | any;

  inputSearchValue: string = '';

  optionLabel: string = '';
  optionValue: string = '';

  genderLabel: string = '';
  genderValue: string = '';

  startDate: string = '';
  endDate: string = '';

  bsRangeValue: Date[];

  filterMap = new Map<string, any>();

  constructor(
    private helper: HelperService,
    private translate: TranslateService,
    private toast: ToastDirective
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
    this.bsRangeValue = [];
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
    
    if (this.bsRangeValue.length > 0) {
      this.filterMap.set('inputSearchValue', this.inputSearchValue);
      this.filterMap.set('optionValue', this.optionValue);
      this.filterMap.set(
        'startDate',
        this.helper.formatValidDate(this.bsRangeValue[0])
      );
      this.filterMap.set(
        'endDate',
        this.helper.formatValidDate(this.bsRangeValue[1])
      );
      this.filterMap.set('selectedGender', this.genderValue);

      // Emit the filter map to the parent component
      this.handleSearch.emit(this.filterMap);
    } else {
      if (this.endDate && this.startDate && this.endDate < this.startDate) {
        this.toast.showToast('toast-search-failed');
      } else {
        this.filterMap.set('inputSearchValue', this.inputSearchValue);
        this.filterMap.set('optionValue', this.optionValue);
        this.filterMap.set(
          'startDate',
          this.helper.formatValidDate(this.startDate)
        );
        this.filterMap.set(
          'endDate',
          this.helper.formatValidDate(this.endDate)
        );
        this.filterMap.set('selectedGender', this.genderValue);

        // Emit the filter map to the parent component
        this.handleSearch.emit(this.filterMap);
      }
    }
  }

  handleSelectOption(option: any): void {
    this.optionLabel = option.content;
    this.optionValue = option.type;
  }

  handleSelectGender = (gender: any): void => {
    this.genderLabel = gender.content;
    this.genderValue = gender.type;
  };
}
