import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { AnimalListComponent } from './animal/animal-list/animal-list.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { TaskListComponent } from './task/task-list/task-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', canActivate: [AuthGuard], component: LayoutComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardViewComponent},
    {path: 'animals', component: AnimalListComponent},
    {path: 'employees', component: EmployeeListComponent},
    {path: 'tasks', component: TaskListComponent},
    {path: 'stock', redirectTo: 'animals'},
    {path: 'warehouses', redirectTo: 'animals'}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
