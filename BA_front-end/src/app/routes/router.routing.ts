import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { UserManagementComponent } from '../pages/user-management/user-management.component';
import { VehicleMonitorComponent } from '../pages/vehicle-monitor/vehicle-monitor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'vehicle', component: VehicleMonitorComponent },
];

export const RouterRoutes = RouterModule.forChild(routes);
