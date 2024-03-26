import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Monitoring } from './model/Monitoring';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  private readonly URL: string = `${environment.apiUrl}/monitoring`;

  constructor(private httpClient: HttpClient) { }

  findMonitoringsByAnimalId(animalId: string): Observable<Monitoring[]> {
    let findMonirotringsUrl = `${this.URL}/find/animal/${animalId}`;
    return this.httpClient.get<Monitoring[]>(findMonirotringsUrl);
  }

}