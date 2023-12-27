import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnimalModule } from './animal/animal.module';
import { BreedModule } from './breed/breed.module';
import { MonitoringModule } from './monitoring/monitoring.module';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

import { provideEnvironmentNgxCurrency, NgxCurrencyInputMode } from 'ngx-currency'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AnimalModule,
    BreedModule,
    MonitoringModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
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
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
