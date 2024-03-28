import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'

import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';

import { NgxCurrencyDirective } from 'ngx-currency';

import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalCardComponent,
    AnimalFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatRadioModule,
    NgxCurrencyDirective,
  ]
})
export class AnimalModule { }
