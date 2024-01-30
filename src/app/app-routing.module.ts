import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { AnimalListComponent } from './animal/animal-list/animal-list.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', canActivate: [AuthGuard], component: LayoutComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardViewComponent},
    {path: 'animals', component: AnimalListComponent},
    {path: 'employees', redirectTo: 'animals'},
    {path: 'stock', redirectTo: 'animals'},
    {path: 'warehouses', redirectTo: 'animals'}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
