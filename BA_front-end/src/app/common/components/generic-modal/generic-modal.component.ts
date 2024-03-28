import { Component, EventEmitter, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
//1/1/2024
export class GenericModalComponent implements OnInit {
  @Input() modalTitle: string = '';


  ngOnInit() { 
  }

  ngAfterViewInit(){  
  }

  
}
