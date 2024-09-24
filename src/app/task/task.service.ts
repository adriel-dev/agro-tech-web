import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Task } from './model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly URL: string = `${environment.apiUrl}/task`;

  private date = new Date();

  constructor(private httpClient: HttpClient) { }

  public findTasksByEmployeeIdAndStartEndDate(employeeId: string, startDate: string = this.getFirstDayOfMonth(), endDate: string = this.getLastDayOfMonth()): Observable<Task[]> {
    const findByEmployeeIdUrl = `${this.URL}/all`;
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);

    return this.httpClient.get<Task[]>(findByEmployeeIdUrl, { params });
  }

  // public createTask(): Observable<any> {
  //   return;
  // }

  // public updateTask(): Observable<any> {
  //   return;
  // }

  // public deleteTaskById(): Observable<any> {
  //   return;
  // }

  // public markTaskAsDoing(): Observable<any> {
  //   return;
  // }

  // public markTaskAsDone(): Observable<any> {
  //   return;
  // }

  private getFirstDayOfMonth(): string {
    let currentMonth = this.date.getMonth();
    let currentYear = this.date.getFullYear();
    return new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
  }
  
  private getLastDayOfMonth(): string {
    let currentMonth = this.date.getMonth();
    let currentYear = this.date.getFullYear();
    return new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];
  }


}
