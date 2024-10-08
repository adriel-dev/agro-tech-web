import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnimalModule } from './animal/animal.module';
import { BreedModule } from './breed/breed.module';
import { MonitoringModule } from './monitoring/monitoring.module';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

import { provideEnvironmentNgxCurrency, NgxCurrencyInputMode } from 'ngx-currency';

import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ToastContainerDirective, provideToastr } from 'ngx-toastr';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { PtMatPaginatorIntl } from "./components/paginator/PtMatPaginator";
import { EmployeeModule } from './employee/employee.module';
import { TaskModule } from './task/task.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LayoutComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AnimalModule,
    BreedModule,
    MonitoringModule,
    EmployeeModule,
    TaskModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatDividerModule,
    ToastContainerDirective,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    provideEnvironmentNgxCurrency(
      {
        align: "left",
        allowNegative: true,
        allowZero: true,
        decimal: ",",
        precision: 2,
        prefix: "R$ ",
        suffix: "",
        thousands: ".",
        nullable: true,
        min: null,
        max: null,
        inputMode: NgxCurrencyInputMode.Financial
    }
    ),
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    provideAnimations(),
    provideToastr(),
    { provide: MatPaginatorIntl, useClass: PtMatPaginatorIntl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
