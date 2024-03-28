import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Breed } from './model/Breed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private readonly URL: string = `${environment.apiUrl}/breed`;

  constructor(private httpClient: HttpClient) { }

  findAllBreeds(): Observable<Breed[]> {
    const findAllUrl = `${this.URL}/find/all`;
    return this.httpClient.get<Breed[]>(findAllUrl);
  }

  findBreedsBySpeciesId(speciesId: string): Observable<Breed[]> {
    const findBySpeciesIdUrl = `${this.URL}/find/species/${speciesId}`;
    return this.httpClient.get<Breed[]>(findBySpeciesIdUrl);
  }

}
