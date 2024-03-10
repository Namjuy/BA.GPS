
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GenericNavbarComponent } from './common/components/generic-navbar/generic-navbar.component';
import { GenericFooterComponent } from './common/components/generic-footer/generic-footer.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { GenericTableComponent } from './common/components/generic-table/generic-table.component';
import { GenericPaginationComponent } from './common/components/generic-pagination/generic-pagination.component';
import { GenericModalComponent } from './common/components/generic-modal/generic-modal.component';
import { GenericFilterComponent } from './common/components/generic-filter/generic-filter.component';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent },
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GenericNavbarComponent,
    GenericFooterComponent,
    LoginFormComponent,
    UserManagementComponent,
    GenericTableComponent,
    GenericPaginationComponent,
    GenericModalComponent,
    GenericFilterComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
