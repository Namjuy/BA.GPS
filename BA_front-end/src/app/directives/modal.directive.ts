import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appModal]',
})
export class ModalDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}


}
