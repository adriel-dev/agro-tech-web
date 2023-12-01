import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { AnimalListComponent } from './animal/animal-list/animal-list.component';
import { MonitoringListComponent } from './monitoring/monitoring-list/monitoring-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardViewComponent},
  {path: 'animals', component: AnimalListComponent},
  {path: 'monitorings', component: MonitoringListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
