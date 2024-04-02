import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToast]',
})

////Name   Date       Comments
////duypn  18/3/2024  create
export class ToastDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  //handle show toast when click button
  @HostListener('click') showToast(toastType: string) {
    const toastElement = document.getElementById(toastType);

    if (toastElement) {
      this.renderer.addClass(toastElement, 'show');
      setTimeout(() => {
        this.renderer.removeClass(toastElement, 'show');
      }, 2000);
    }
  }
}
