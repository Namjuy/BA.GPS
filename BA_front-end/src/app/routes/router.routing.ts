import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { UserManagementComponent } from '../pages/user-management/user-management.component';
import { VehicleMonitorComponent } from '../pages/vehicle-monitor/vehicle-monitor.component';
import { HomeComponent } from '../pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'vehicle', component: VehicleMonitorComponent },
  { path: 'home', component: HomeComponent },
];

export const RouterRoutes = RouterModule.forChild(routes);
