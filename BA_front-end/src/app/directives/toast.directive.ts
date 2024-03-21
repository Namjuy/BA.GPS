import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToast]',
})
export class ToastDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') showToast(toastType:string) {
    const toastElement = document.getElementById('toast');

    if (toastElement) {
      this.renderer.addClass(toastElement, 'show');
      this.renderer.addClass(toastElement, toastType);
      setTimeout(() => {

        this.renderer.removeClass(toastElement, 'show');
      }, 2000);
    }
  }
}
