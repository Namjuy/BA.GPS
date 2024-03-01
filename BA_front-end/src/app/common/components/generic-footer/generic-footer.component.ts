import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-footer',
  templateUrl: './generic-footer.component.html',
  styleUrls: ['./generic-footer.component.scss'],
})
////Name   Date       Comments
////duypn  1/3/2024  create
export class GenericFooterComponent {
  @Input() footerItems: any;

  // Constructor for a class that takes TranslateService as a private params
  constructor(private translate: TranslateService) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  // Initialize to handle the mouse wheel event when horizontally scroll footer location
  onMouseWheel(event: WheelEvent): void {
    if (event.deltaY !== 0) {
      const scrollContainer = event.currentTarget as HTMLElement;

      // Adjust the horizontal scroll of the container based on the deltaY value.
      scrollContainer.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }
}
