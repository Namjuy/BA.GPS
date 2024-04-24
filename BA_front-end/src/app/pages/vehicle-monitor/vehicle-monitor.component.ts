import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/common/helpers/helper.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-vehicle-monitor',
  templateUrl: './vehicle-monitor.component.html',
  styleUrls: ['./vehicle-monitor.component.css']
})
//??
export class VehicleMonitorComponent implements OnInit {

  constructor(private helper:HelperService, private auth:AuthService) { }

  ngOnInit() {
   
    this.auth.checkAuth();
  }

}
