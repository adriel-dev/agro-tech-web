import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Employee, PagedEmployees, SaveEmployeeRequest } from './model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly URL: string = `${environment.apiUrl}/employee`;

  constructor(private httpClient: HttpClient) { }

  public findAllEmployees(farmId: string, page: number = 0, size: number = 10): Observable<PagedEmployees> {
    const findAllUrl = `${this.URL}/find/all/${farmId}`;
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    return this.httpClient.get<PagedEmployees>(findAllUrl, { params });
  }

  public saveEmployee(employee: SaveEmployeeRequest) {
    const saveUrl = `${this.URL}/save`;
    return this.httpClient.post(saveUrl, employee);
  }
  
  public updateEmployee(employeeId: string, employee: Employee) {
    const updateUrl = `${this.URL}/update/${employeeId}`;
    return this.httpClient.put(updateUrl, employee);
  }
  
  public deleteEmployeeById(employeeId: string) {
    const deleteUrl = `${this.URL}/delete/${employeeId}`;
    return this.httpClient.delete(deleteUrl);
  }

}
