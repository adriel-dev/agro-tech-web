import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Farm } from './model/Farm';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  private readonly URL: string = `${environment.apiUrl}/farm`;

  constructor(private httpClient: HttpClient) { }

  findFarmById(farmId: string): Observable<Farm> {
    const findByIdUrl = `${this.URL}/find/${farmId}`;
    return this.httpClient.get<Farm>(findByIdUrl);
  }

}
