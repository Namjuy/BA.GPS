import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
////Name   Date       Comments
////duypn  1/3/2024  create
export class GenericModalComponent implements OnInit {
  @Input() modalTitle: string = '';

  ngOnInit() {}

  ngAfterViewInit() {}
}
