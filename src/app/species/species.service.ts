import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Species } from './model/Species';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private readonly URL: string = `${environment.apiUrl}/species`;

  constructor(private httpClient: HttpClient) { }

  findAllSpecies(): Observable<Species[]> {
    const findAllUrl = `${this.URL}/find/all`;
    return this.httpClient.get<Species[]>(findAllUrl);
  }

}
