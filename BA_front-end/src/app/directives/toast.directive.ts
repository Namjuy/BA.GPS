import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToast]'
})
export class ToastDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick() {
    // Find the toast element by ID
    const toastElement = document.getElementById('toast-updateSuccess');

    // If the toast element exists, add the 'show' class to display it
    if (toastElement) {
      this.renderer.addClass(toastElement, 'show');
      
      // Remove the 'show' class after a delay (e.g., 3 seconds)
      setTimeout(() => {
        this.renderer.removeClass(toastElement, 'show');
      }, 2000);
    }
  }
}
